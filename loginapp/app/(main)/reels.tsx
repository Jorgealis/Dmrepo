// app/(main)/reels.tsx
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface Reel {
  id: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  music: string;
  isLiked: boolean;
  gradient: string[];
}

const mockReels: Reel[] = [
  {
    id: '1',
    username: '@anna_travels',
    description: 'Beautiful sunset at the beach 🌅✨ #sunset #beach #vibes',
    likes: 1245,
    comments: 89,
    shares: 23,
    music: 'Chill Vibes - Lofi Hip Hop',
    isLiked: false,
    gradient: ['#FF6B6B', '#FFE66D'],
  },
  {
    id: '2',
    username: '@food_lover_23',
    description: 'Making the perfect pasta 🍝👨‍🍳 Recipe in bio!',
    likes: 892,
    comments: 156,
    shares: 45,
    music: 'Cooking Time - Upbeat',
    isLiked: true,
    gradient: ['#4ECDC4', '#44A08D'],
  },
  {
    id: '3',
    username: '@fitness_guru',
    description: '30-day transformation challenge! 💪🔥 #fitness #transformation',
    likes: 2341,
    comments: 234,
    shares: 78,
    music: 'Workout Beats - High Energy',
    isLiked: false,
    gradient: ['#A8E6CF', '#7FCDCD'],
  },
  {
    id: '4',
    username: '@art_creation',
    description: 'Time-lapse of my latest painting 🎨✨ What do you think?',
    likes: 567,
    comments: 67,
    shares: 12,
    music: 'Creative Flow - Ambient',
    isLiked: true,
    gradient: ['#FFB6C1', '#FFA0AC'],
  },
  {
    id: '5',
    username: '@dance_moves',
    description: 'New choreo! Can you learn it? 💃🕺 #dance #trending',
    likes: 3456,
    comments: 445,
    shares: 167,
    music: 'Dance Floor Hits - Pop',
    isLiked: false,
    gradient: ['#C44569', '#F8B500'],
  },
];

export default function Reels() {
  const [reels, setReels] = useState(mockReels);
  const [currentIndex, setCurrentIndex] = useState(0);
  const likeAnimation = useRef(new Animated.Value(1)).current;

  const handleLike = (id: string) => {
    setReels(prevReels =>
      prevReels.map(reel =>
        reel.id === id
          ? {
              ...reel,
              isLiked: !reel.isLiked,
              likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1
            }
          : reel
      )
    );

    // Animación del like
    Animated.sequence([
      Animated.timing(likeAnimation, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(likeAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const renderReel = ({ item }: { item: Reel }) => (
    <View style={styles.reelContainer}>
      <LinearGradient
        colors={item.gradient}
        style={styles.reelGradient}
      >
        {/* Video placeholder */}
        <View style={styles.videoPlaceholder}>
          <Ionicons name="play-circle" size={80} color="rgba(255, 255, 255, 0.8)" />
        </View>

        {/* Overlay Content */}
        <View style={styles.overlay}>
          {/* Right Side Actions */}
          <View style={styles.rightActions}>
            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.profileAvatar}>
                <Text style={styles.profileText}>{item.username.charAt(1).toUpperCase()}</Text>
              </View>
            </TouchableOpacity>

            <Animated.View style={[styles.actionButton, { transform: [{ scale: likeAnimation }] }]}>
              <TouchableOpacity onPress={() => handleLike(item.id)}>
                <Ionicons 
                  name={item.isLiked ? "heart" : "heart-outline"} 
                  size={32} 
                  color={item.isLiked ? "#FF6B6B" : "white"} 
                />
              </TouchableOpacity>
              <Text style={styles.actionText}>{formatNumber(item.likes)}</Text>
            </Animated.View>

            <View style={styles.actionButton}>
              <TouchableOpacity>
                <Ionicons name="chatbubble-outline" size={28} color="white" />
              </TouchableOpacity>
              <Text style={styles.actionText}>{formatNumber(item.comments)}</Text>
            </View>

            <View style={styles.actionButton}>
              <TouchableOpacity>
                <Ionicons name="paper-plane-outline" size={28} color="white" />
              </TouchableOpacity>
              <Text style={styles.actionText}>{formatNumber(item.shares)}</Text>
            </View>

            <View style={styles.actionButton}>
              <TouchableOpacity>
                <Ionicons name="bookmark-outline" size={28} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.actionButton}>
              <TouchableOpacity>
                <Ionicons name="ellipsis-vertical" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Content */}
          <View style={styles.bottomContent}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.description}>{item.description}</Text>
            
            <View style={styles.musicContainer}>
              <Ionicons name="musical-notes" size={16} color="white" />
              <Text style={styles.musicText}>{item.music}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reels</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={reels}
        renderItem={renderReel}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height - 100}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 80
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  reelContainer: {
    width: width,
    height: height - 100,
  },
  reelGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'space-between',
  },
  rightActions: {
    position: 'absolute',
    right: 15,
    bottom: 100,
    alignItems: 'center',
  },
  profileButton: {
    marginBottom: 20,
  },
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 25,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 100,
    left: 15,
    right: 80,
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
    fontStyle: 'italic',
  },
});