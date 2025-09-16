// app/(main)/profile.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/welcome');
  };

  return (
    <LinearGradient
      colors={['#ff9a9e', '#fecfef', '#fecfef']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={50} color="#999" />
            </View>
          </View>
          
          <Text style={styles.name}>Jorge Alarcon</Text>
          <Text style={styles.email}>jorge.alarcon@gmail.com</Text>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="information-circle-outline" size={24} color="#666" />
            <Text style={styles.menuText}>About</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="white" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  menuSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    marginBottom: 30,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});