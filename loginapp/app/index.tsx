// app/index.tsx
import { Redirect } from 'expo-router';
import { useAuth } from '@/context/Authcontext';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  const { session, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.loadingContainer}
      >
        <Text style={styles.loadingText}>Cargando...</Text>
      </LinearGradient>
    );
  }

  // Si hay sesión activa, ir al main
  if (session) {
    return <Redirect href="/(main)" />;
  }

  // Si no hay sesión, ir al welcome
  return <Redirect href="/welcome" />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});