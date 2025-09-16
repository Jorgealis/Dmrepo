// app/(auth)/login.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  Dimensions,
  Alert,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/Authcontext';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        Alert.alert('Error de inicio de sesión', error);
      } else {
        // La navegación se manejará automáticamente por el contexto de autenticación
        router.replace('/(main)');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#FFD93D', '#FF6B6B', '#C44569']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Forma curva superior */}
        <View style={styles.topShape} />
        
        <View style={styles.content}>
          <Text style={styles.title}>Hello</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
          
          <View style={styles.formContainer}>
            {/* Campo Email */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                />
              </View>
            </View>

            {/* Campo Password */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color="#999" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity 
              style={[styles.signInButton, loading && styles.disabledButton]} 
              onPress={handleLogin}
              disabled={loading}
            >
              <LinearGradient
                colors={['#C44569', '#FF6B6B']}
                style={styles.signInGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.signInText}>Sign in</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Register Link */}
            <TouchableOpacity 
              style={styles.registerLink}
              onPress={() => router.push('/register')}
            >
              <Text style={styles.registerText}>
                Don't have an account? <Text style={styles.registerTextBold}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Forma curva inferior */}
        <View style={styles.bottomShape} />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  topShape: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
  },
  bottomShape: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    right: -50,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderTopLeftRadius: width,
    borderTopRightRadius: width,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    zIndex: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 60,
    textAlign: 'center',
  },
  formContainer: {
    gap: 20,
  },
  inputContainer: {
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
  },
  signInButton: {
    marginTop: 30,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    opacity: 0.7,
  },
  signInGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  registerLink: {
    alignItems: 'center',
    marginTop: 30,
  },
  registerText: {
    color: '#666',
    fontSize: 14,
  },
  registerTextBold: {
    fontWeight: '600',
    color: '#C44569',
  },
});