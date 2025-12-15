import { QuoteReel } from "@/lib/quotes";
import { getFavoriteQuotes, toggleFavoriteQuote } from "@/lib/favoritesStorage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

interface QuoteReelProps {
  reel: QuoteReel;
  onUnfavorite: (id: string) => void;
}

const QuoteReelComponent: React.FC<QuoteReelProps> = ({
  reel,
  onUnfavorite,
}) => {
  const handleUnfavorite = async () => {
    try {
      await toggleFavoriteQuote(reel);
      onUnfavorite(reel.id);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <View style={styles.reelContainer}>
      <LinearGradient
        colors={reel.gradient as any}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.topBar}></View>

          <View>
            <Text style={styles.quote}>{reel.content}</Text>
          </View>

          <View style={styles.bottomSection}>
            <Pressable style={styles.actionButton} onPress={handleUnfavorite}>
              <Ionicons name="heart" size={30} color={"#ff3b30"} />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<QuoteReel[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await getFavoriteQuotes();
      setFavorites(favs);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadFavorites();
  }, []);

  const handleUnfavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const renderReel = ({ item }: { item: QuoteReel }) => (
    <QuoteReelComponent reel={item} onUnfavorite={handleUnfavorite} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={80} color="#ffffff" opacity={0.3} />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptyText}>
        Start adding quotes to your favorites by tapping the heart icon
      </Text>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Browse Quotes</Text>
      </Pressable>
    </View>
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
        <Pressable
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={26} color="#ffffff" />
        </Pressable>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Favorites List */}
      <FlatList
        data={favorites}
        renderItem={renderReel}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        bounces={false}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffffff"
            colors={["#ffffff"]}
          />
        }
      />
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
  headerButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 8,
  },
  headerSpacer: {
    width: 42,
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
  quote: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
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
    padding: 4,
    gap: 6,
  },
  emptyContainer: {
    flex: 1,
    height: height - 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 24,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
});
