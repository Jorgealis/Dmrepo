// app/(main)/messages.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  Image,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    name: 'Anna Wilson',
    lastMessage: 'Hey! How are you doing?',
    time: '2m',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Carlos Rodriguez',
    lastMessage: 'Thanks for sharing that video!',
    time: '15m',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    lastMessage: 'See you tomorrow ✨',
    time: '1h',
    unread: 1,
    online: false,
  },
  {
    id: '4',
    name: 'Mike Chen',
    lastMessage: 'That was amazing! 🔥',
    time: '2h',
    unread: 0,
    online: false,
  },
  {
    id: '5',
    name: 'Emma Davis',
    lastMessage: 'Can you send me the details?',
    time: '5h',
    unread: 3,
    online: true,
  },
];

export default function Messages() {
  const [searchText, setSearchText] = useState('');
  const [messages] = useState(mockMessages);

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity style={styles.messageItem}>
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: getRandomColor(item.id) }]}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        {item.online && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const getRandomColor = (id: string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'];
    const index = parseInt(id) % colors.length;
    return colors[index];
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Messages</Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <FlatList
          data={filteredMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={styles.messagesList}
        />
      </View>

      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#FF6B6B', '#FF8E53']}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 20,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 4,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});