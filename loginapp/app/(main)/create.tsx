// app/(main)/create.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface CreateOption {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradient: string[];
  comingSoon?: boolean;
}

const createOptions: CreateOption[] = [
  {
    id: '1',
    title: 'Photo',
    subtitle: 'Share a moment',
    icon: 'camera',
    gradient: ['#FF6B6B', '#FF8E53'] as const,
  },
  {
    id: '2',
    title: 'Video',
    subtitle: 'Create a reel',
    icon: 'videocam',
    gradient: ['#4ECDC4', '#44A08D'] as const,
  },
  {
    id: '3',
    title: 'Story',
    subtitle: '24h story',
    icon: 'add-circle',
    gradient: ['#A8E6CF', '#7FCDCD'] as const,
  },
  {
    id: '4',
    title: 'Live',
    subtitle: 'Go live now',
    icon: 'radio',
    gradient: ['#FFB6C1', '#FFA0AC'] as const,
    comingSoon: true,
  },
];

export default function Create() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionPress = (option: CreateOption) => {
    if (option.comingSoon) {
      return;
    }
    setSelectedOption(option.id);
    // Aquí puedes agregar la lógica de navegación cuando implementes la funcionalidad
  };

  const renderCreateOption = (option: CreateOption, index: number) => (
    <TouchableOpacity
      key={option.id}
      style={[
        styles.optionContainer,
        { marginTop: index < 2 ? 0 : 20 }
      ]}
      onPress={() => handleOptionPress(option)}
      disabled={option.comingSoon}
    >
      <LinearGradient
        colors={option.gradient}
        style={[
          styles.optionGradient,
          option.comingSoon && styles.disabledOption
        ]}
      >
        <View style={styles.optionContent}>
          <View style={styles.iconContainer}>
            <Ionicons 
              name={option.icon} 
              size={32} 
              color="white" 
            />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>{option.title}</Text>
            <Text style={styles.optionSubtitle}>
              {option.comingSoon ? 'Coming Soon' : option.subtitle}
            </Text>
          </View>

          <View style={styles.arrowContainer}>
            <Ionicons 
              name={option.comingSoon ? "time-outline" : "chevron-forward"} 
              size={20} 
              color="white" 
            />
          </View>
        </View>

        {option.comingSoon && (
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>Soon</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Create</Text>
        <Text style={styles.headerSubtitle}>Share your creativity with the world</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.optionsGrid}>
          {createOptions.map((option, index) => renderCreateOption(option, index))}
        </View>

        

        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Drafts</Text>
          
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No drafts yet</Text>
            <Text style={styles.emptySubtext}>
              Your saved drafts will appear here
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  optionsGrid: {
    marginTop: 20,
  },
  optionContainer: {
    marginBottom: 15,
  },
  optionGradient: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabledOption: {
    opacity: 0.7,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  arrowContainer: {
    width: 30,
    alignItems: 'center',
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  comingSoonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tipContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  recentActivity: {
    marginTop: 30,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
    textAlign: 'center',
  },
});