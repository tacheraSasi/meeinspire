import { QuoteReel, QUOTES_REELS } from "@/lib/quotes";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

interface QuoteReelProps {
  reel: QuoteReel;
  isActive: boolean;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
  onMore: (reel: QuoteReel) => void;
}

const QuoteReelComponent: React.FC<QuoteReelProps> = ({
  reel,
  onLike,
  onMore,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(reel.id);
  };

  return (
    <View style={styles.reelContainer}>
      <LinearGradient
        colors={reel.gradient as any}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Main Content */}
        <View style={styles.content}>
          {/* Top Info Bar */}
          <View style={styles.topBar}></View>

          <View>
            <Text style={styles.qoute}>
              {reel.content}
            </Text>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomSection}>
            <Pressable style={styles.actionButton} onPress={handleLike}>
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={30}
                color={"#433a3aff"}
              />
            </Pressable>

            {/* Right Action Buttons */}
            <View style={styles.actionButtons}>
              <Pressable
                style={styles.actionButton}
                onPress={() => onMore(reel)}
              >
                <Ionicons
                  name="paper-plane-outline"
                  size={30}
                  color="#433a3aff"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default function IndexScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const [commentsSheetOpen, setCommentsSheetOpen] = useState(false);
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState<QuoteReel | null>(null);
  const router = useRouter();
  const commentsSheetRef = useRef<BottomSheet>(null);
  const moreSheetRef = useRef<BottomSheet>(null);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const handleLike = (reelId: string) => {
    setLikedReels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });
  };

  const handleComment = (reelId: string) => {
    const reel = QUOTES_REELS.find((r) => r.id === reelId);
    setSelectedReel(reel || null);
    setCommentsSheetOpen(true);
    commentsSheetRef.current?.expand();
  };

  const handleShare = (reelId: string) => {
    console.log("Share reel:", reelId);
  };

  const handleMore = (reel: QuoteReel) => {
    setSelectedReel(reel);
    setMoreSheetOpen(true);
    moreSheetRef.current?.expand();
  };

  const renderReel = ({ item, index }: { item: QuoteReel; index: number }) => (
    <QuoteReelComponent
      reel={item}
      isActive={index === currentIndex}
      onLike={handleLike}
      onComment={handleComment}
      onShare={handleShare}
      onMore={handleMore}
    />
  );



  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meeinspire</Text>
        <View style={styles.headerActions}>
          <Pressable
            style={styles.headerButton}
            onPress={() => {
              router.push("/settings");
            }}
          >
            <Ionicons name="flower" size={30} color="#433a3aff" />
          </Pressable>
        </View>
      </View>

      {/* Reels List */}
      <FlatList
        data={QUOTES_REELS}
        renderItem={renderReel}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        bounces={false}
      />

      {/* More Options Bottom Sheet */}
      <BottomSheet
        ref={moreSheetRef}
        index={-1}
        snapPoints={["40%"]}
        enablePanDownToClose
        backdropComponent={BottomSheetBackdrop}
        onChange={(index) => setMoreSheetOpen(index >= 0)}
      >
        <BottomSheetView style={styles.sheetContent}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Options</Text>
            {/* <Pressable onPress={() => moreSheetRef.current?.close()}>
              <Ionicons name="close" size={24} color="#666" />
            </Pressable> */}
          </View>

          <View style={styles.moreOptions}>
            <Pressable style={styles.optionItem}>
              <Ionicons name="download-outline" size={24} color="#333" />
              <Text style={styles.optionText}>Download Audio</Text>
            </Pressable>

            <Pressable style={styles.optionItem}>
              <Ionicons name="share-outline" size={24} color="#333" />
              <Text style={styles.optionText}>Share</Text>
            </Pressable>

            <Pressable style={styles.optionItem}>
              <Ionicons name="flag-outline" size={24} color="#333" />
              <Text style={styles.optionText}>Report</Text>
            </Pressable>

            <Pressable style={styles.optionItem}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
              <Text style={styles.optionText}>Turn on Notifications</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  headerActions: {
    flexDirection: "row",
    gap: 20,
  },
  headerButton: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 100,
    padding: 4,
  },
  reelContainer: {
    width,
    height,
  },
  backgroundGradient: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 100,
    paddingBottom: 30,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  qoute:{
    textAlign:"center",
    fontSize:24,
    color:"#fff"
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  artistInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  typeBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  artistName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  songTitle: {
    color: "white",
    fontSize: 14,
    opacity: 0.9,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  centerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  waveformContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    gap: 4,
  },
  waveBar: {
    width: 4,
    borderRadius: 2,
    minHeight: 10,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  songInfo: {
    flex: 1,
  },
  duration: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  nowPlaying: {
    color: "white",
    fontSize: 12,
    opacity: 0.8,
    fontWeight: "500",
  },
  actionButtons: {
    alignItems: "center",
    gap: 24,
  },
  actionButton: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 100,
    alignItems: "center",
    padding:4,
    gap: 6,
  },
  actionCount: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  progressBarContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  progressBar: {
    height: "100%",
    borderRadius: 1.5,
  },
  // Bottom Sheet Styles
  sheetContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  currentTrack: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 12,
  },
  trackAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  trackArtist: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  commentsList: {
    flex: 1,
    marginTop: 16,
  },
  commentItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  commentTime: {
    fontSize: 12,
    color: "#999",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 8,
  },
  commentFooter: {
    flexDirection: "row",
  },
  commentLike: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  commentLikeCount: {
    fontSize: 12,
    color: "#666",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  moreOptions: {
    paddingVertical: 16,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    gap: 16,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
