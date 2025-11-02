import FormHeader from "@/components/FormHeader";
import ScreenLayout from "@/components/ScreenLayout";
import { useCurrentTheme } from "@/context/CentralTheme";
import { useToast } from "@/context/ToastProvider";
import Api from "@/lib/api";
import { CreatePostDto } from "@/lib/api/types";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { router, Stack } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type Visibility = "public" | "private";

interface AudioFile {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
}

export default function CreatePost() {
  const theme = useCurrentTheme();
  const toast = useToast();

  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("public");
  const [audioFile, setAudioFile] = useState<AudioFile | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  const textInputRef = useRef<TextInput>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } catch (err) {
      console.error("Failed to start recording", err);
      toast.error("Failed to start recording");
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    setIsRecording(false);
    pulseAnim.stopAnimation();
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording.getURI();
    if (uri) {
      const status = await recording.getStatusAsync();
      if (status.isDoneRecording && status.durationMillis) {
        setAudioDuration(status.durationMillis / 1000);
      }

      setAudioFile({
        uri,
        name: `recording_${Date.now()}.m4a`,
        size: 0,
        mimeType: "audio/m4a",
      });
    }
    setRecording(null);
  };

  const playRecording = async () => {
    if (!audioFile) return;

    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync({
          uri: audioFile.uri,
        });
        setSound(newSound);

        newSound.setOnPlaybackStatusUpdate((status: any) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
          }
        });

        await newSound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing sound:", error);
      toast.error("Failed to play recording");
    }
  };

  const deleteRecording = () => {
    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }
    setAudioFile(null);
    setAudioDuration(0);
    setIsPlaying(false);
  };

  const pickAudioFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        setAudioFile({
          uri: file.uri,
          name: file.name,
          size: file.size || 0,
          mimeType: file.mimeType || "audio/*",
        });

        try {
          const { sound } = await Audio.Sound.createAsync({ uri: file.uri });
          const status = await sound.getStatusAsync();
          if (status.isLoaded && status.durationMillis) {
            setAudioDuration(status.durationMillis / 1000);
          }
          await sound.unloadAsync();
        } catch (error) {
          console.log("Could not get audio duration:", error);
        }
      }
    } catch (error) {
      console.error("Error picking audio file:", error);
      toast.error("Failed to pick audio file");
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const validateForm = () => {
    if (!text.trim() && !audioFile) {
      toast.error("Please add some text or audio to your post");
      return false;
    }
    return true;
  };

  const uploadAudioFile = async (file: AudioFile): Promise<string> => {
    console.log("Uploading audio file:", file.name);
    setIsUploading(true);

    try {
      const uploadResponse = await Api.uploadFile(
        file.uri,
        file.name,
        file.mimeType
      );

      if (uploadResponse.status === "success" && uploadResponse.url) {
        console.log("Upload successful:", uploadResponse.url);
        toast.success("Audio uploaded successfully!");
        return uploadResponse.url;
      } else {
        throw new Error(uploadResponse.message || "Failed to upload file");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upload audio"
      );
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let audioUrl = "";
      let duration = 0;
      let postType = "text";

      // Upload audio file first if present
      if (audioFile) {
        try {
          audioUrl = await uploadAudioFile(audioFile);
          duration = audioDuration;
          postType = "audio";
        } catch (uploadError) {
          // If upload fails, stop the submission process
          console.error("Audio upload failed:", uploadError);
          return; // Exit early, uploadAudioFile already shows error toast
        }
      }

      const currentUserId = 1;

      const postData: CreatePostDto = {
        user_id: currentUserId,
        type: postType,
        text: text.trim() || undefined,
        audio_url: audioUrl || undefined,
        duration: duration || undefined,
        visibility,
      };

      const newPost = await Api.createPost(postData);
      toast.success("Post created successfully!");
      router.back();
    } catch (error) {
      console.error("Failed to create post:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isRecording) {
      Alert.alert("Recording in Progress", "Stop recording before leaving?", [
        { text: "Continue Recording", style: "cancel" },
        {
          text: "Stop & Leave",
          onPress: () => {
            if (recording) {
              recording.stopAndUnloadAsync();
            }
            router.back();
          },
        },
      ]);
    } else {
      router.back();
    }
  };

  return (
    <ScreenLayout>
      <Stack.Screen options={{presentation:"modal"}}/>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          style={[styles.scrollView]}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FormHeader
            title="Create Post"
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            submitText={isUploading ? "Uploading..." : "Publish"}
            isSubmitting={isSubmitting || isUploading}
          />

          <View style={styles.mainContent}>
            {/* Text Input Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Share your thoughts
                </Text>
                <Text
                  style={[styles.sectionSubtitle, { color: theme.subtleText }]}
                >
                  Write something, add audio, or both
                </Text>
              </View>

              <View
                style={[
                  styles.textInputContainer,
                  { backgroundColor: theme.cardBackground },
                ]}
              >
                <TextInput
                  ref={textInputRef}
                  style={[styles.textInput, { color: theme.text }]}
                  placeholder="What's on your mind? Share your thoughts, ideas, or stories..."
                  placeholderTextColor={theme.mutedText}
                  value={text}
                  onChangeText={setText}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
                <View style={styles.textInputFooter}>
                  <Text style={[styles.charCount, { color: theme.mutedText }]}>
                    {text.length}/1000
                  </Text>
                </View>
              </View>
            </View>

            {/* Audio Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Add Audio (Optional)
                </Text>
                <Text
                  style={[styles.sectionSubtitle, { color: theme.subtleText }]}
                >
                  Record your voice or upload an audio file
                </Text>
              </View>

              {!audioFile ? (
                <View style={styles.audioActions}>
                  <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <Pressable
                      onPress={isRecording ? stopRecording : startRecording}
                      disabled={isSubmitting || isUploading}
                      style={({ pressed }) => [
                        styles.recordButton,
                        {
                          backgroundColor: isRecording
                            ? "#FF4757"
                            : theme.primary,
                          opacity:
                            pressed || isSubmitting || isUploading ? 0.6 : 1,
                        },
                      ]}
                    >
                      <View style={styles.recordButtonInner}>
                        <View style={styles.recordIconContainer}>
                          <Ionicons
                            name={isRecording ? "stop" : "mic"}
                            size={24}
                            color="white"
                          />
                        </View>
                        <View style={styles.recordTextContainer}>
                          <Text style={styles.recordButtonText}>
                            {isRecording ? "Stop Recording" : "Record Voice"}
                          </Text>
                          <Text style={styles.recordButtonSubtext}>
                            {isRecording
                              ? "Tap to stop"
                              : "Record your thoughts"}
                          </Text>
                        </View>
                      </View>
                      {isRecording && (
                        <View style={styles.recordingIndicator}>
                          <View
                            style={[
                              styles.recordingDot,
                              { backgroundColor: "#FF4757" },
                            ]}
                          />
                          <Text style={styles.recordingText}>Recording...</Text>
                        </View>
                      )}
                    </Pressable>
                  </Animated.View>

                  <View style={styles.divider}>
                    <View
                      style={[
                        styles.dividerLine,
                        { backgroundColor: theme.divider },
                      ]}
                    />
                    <Text
                      style={[styles.dividerText, { color: theme.mutedText }]}
                    >
                      or
                    </Text>
                    <View
                      style={[
                        styles.dividerLine,
                        { backgroundColor: theme.divider },
                      ]}
                    />
                  </View>

                  <Pressable
                    onPress={pickAudioFile}
                    disabled={isSubmitting || isUploading}
                    style={({ pressed }) => [
                      styles.uploadButton,
                      {
                        backgroundColor: theme.cardBackground,
                        borderColor: theme.divider,
                        opacity:
                          pressed || isSubmitting || isUploading ? 0.6 : 1,
                      },
                    ]}
                  >
                    <View style={styles.uploadIconContainer}>
                      <Ionicons
                        name="cloud-upload"
                        size={24}
                        color={theme.primary}
                      />
                    </View>
                    <View style={styles.uploadTextContainer}>
                      <Text
                        style={[styles.uploadButtonText, { color: theme.text }]}
                      >
                        Upload Audio File
                      </Text>
                      <Text
                        style={[
                          styles.uploadButtonSubtext,
                          { color: theme.subtleText },
                        ]}
                      >
                        MP3, M4A, WAV files
                      </Text>
                    </View>
                  </Pressable>
                </View>
              ) : (
                <View
                  style={[
                    styles.audioPreview,
                    { backgroundColor: theme.cardBackground },
                  ]}
                >
                  <View style={styles.audioInfo}>
                    <View
                      style={[
                        styles.audioIcon,
                        { backgroundColor: `${theme.primary}15` },
                      ]}
                    >
                      <Ionicons
                        name="musical-notes"
                        size={24}
                        color={theme.primary}
                      />
                    </View>
                    <View style={styles.audioDetails}>
                      <Text
                        style={[styles.audioName, { color: theme.text }]}
                        numberOfLines={1}
                      >
                        {audioFile.name}
                      </Text>
                      {audioDuration > 0 && (
                        <Text
                          style={[
                            styles.audioDuration,
                            { color: theme.mutedText },
                          ]}
                        >
                          {formatDuration(audioDuration)}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.audioControls}>
                    <Pressable
                      onPress={playRecording}
                      style={({ pressed }) => [
                        styles.audioControlButton,
                        {
                          backgroundColor: `${theme.primary}15`,
                          opacity: pressed ? 0.6 : 1,
                        },
                      ]}
                    >
                      <Ionicons
                        name={isPlaying ? "pause" : "play"}
                        size={20}
                        color={theme.primary}
                      />
                    </Pressable>
                    <Pressable
                      onPress={deleteRecording}
                      style={({ pressed }) => [
                        styles.audioControlButton,
                        {
                          backgroundColor: "#FF475715",
                          opacity: pressed ? 0.6 : 1,
                        },
                      ]}
                    >
                      <Ionicons name="trash" size={20} color="#FF4757" />
                    </Pressable>
                  </View>
                </View>
              )}
            </View>

            {/* Visibility Selector */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Visibility
                </Text>
                <Text
                  style={[styles.sectionSubtitle, { color: theme.subtleText }]}
                >
                  Choose who can see this post
                </Text>
              </View>

              <View style={styles.visibilitySelector}>
                <Pressable
                  onPress={() => setVisibility("public")}
                  style={({ pressed }) => [
                    styles.visibilityCard,
                    {
                      backgroundColor:
                        visibility === "public"
                          ? theme.primary
                          : theme.cardBackground,
                      borderColor:
                        visibility === "public" ? theme.primary : theme.divider,
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    },
                  ]}
                >
                  <View style={styles.visibilityIconContainer}>
                    <Ionicons
                      name="globe"
                      size={24}
                      color={visibility === "public" ? "white" : theme.primary}
                    />
                  </View>
                  <View style={styles.visibilityContent}>
                    <Text
                      style={[
                        styles.visibilityTitle,
                        {
                          color: visibility === "public" ? "white" : theme.text,
                        },
                      ]}
                    >
                      Public
                    </Text>
                    <Text
                      style={[
                        styles.visibilityDescription,
                        {
                          color:
                            visibility === "public"
                              ? "rgba(255,255,255,0.8)"
                              : theme.mutedText,
                        },
                      ]}
                    >
                      Anyone can see this post
                    </Text>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => setVisibility("private")}
                  style={({ pressed }) => [
                    styles.visibilityCard,
                    {
                      backgroundColor:
                        visibility === "private"
                          ? theme.primary
                          : theme.cardBackground,
                      borderColor:
                        visibility === "private"
                          ? theme.primary
                          : theme.divider,
                      transform: [{ scale: pressed ? 0.98 : 1 }],
                    },
                  ]}
                >
                  <View style={styles.visibilityIconContainer}>
                    <Ionicons
                      name="lock-closed"
                      size={24}
                      color={visibility === "private" ? "white" : theme.primary}
                    />
                  </View>
                  <View style={styles.visibilityContent}>
                    <Text
                      style={[
                        styles.visibilityTitle,
                        {
                          color:
                            visibility === "private" ? "white" : theme.text,
                        },
                      ]}
                    >
                      Private
                    </Text>
                    <Text
                      style={[
                        styles.visibilityDescription,
                        {
                          color:
                            visibility === "private"
                              ? "rgba(255,255,255,0.8)"
                              : theme.mutedText,
                        },
                      ]}
                    >
                      Only you can see this post
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>

            {/* Form Status */}
            <View style={styles.statusSection}>
              <View
                style={[
                  styles.statusCard,
                  { backgroundColor: theme.cardBackground },
                ]}
              >
                <Ionicons
                  name="information-circle"
                  size={20}
                  color={theme.primary}
                />
                <Text style={[styles.statusText, { color: theme.text }]}>
                  {isUploading
                    ? "Uploading audio file..."
                    : isSubmitting
                    ? "Creating your post..."
                    : !text && !audioFile
                    ? "Add some text or audio to create your post"
                    : text && audioFile
                    ? "Post will include both text and audio"
                    : text
                    ? "Post will be text only"
                    : "Post will be audio only"}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  textInputContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  textInput: {
    padding: 20,
    fontSize: 16,
    minHeight: 160,
    textAlignVertical: "top",
  },
  textInputFooter: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    alignItems: "flex-end",
  },
  charCount: {
    fontSize: 12,
    fontWeight: "500",
  },
  audioActions: {
    gap: 16,
  },
  recordButton: {
    borderRadius: 16,
    padding: 4,
  },
  recordButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 16,
  },
  recordIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  recordTextContainer: {
    flex: 1,
  },
  recordButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  recordButtonSubtext: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  recordingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    marginHorizontal: 12,
    marginBottom: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  recordingText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 2,
    gap: 16,
  },
  uploadIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadTextContainer: {
    flex: 1,
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
  },
  uploadButtonSubtext: {
    fontSize: 14,
  },
  audioPreview: {
    padding: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  audioInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 16,
  },
  audioIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  audioDetails: {
    flex: 1,
  },
  audioName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  audioDuration: {
    fontSize: 14,
  },
  audioControls: {
    flexDirection: "row",
    gap: 12,
  },
  audioControlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  visibilitySelector: {
    gap: 12,
  },
  visibilityCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    gap: 16,
  },
  visibilityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  visibilityContent: {
    flex: 1,
  },
  visibilityTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  visibilityDescription: {
    fontSize: 14,
  },
  statusSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  statusText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
});
