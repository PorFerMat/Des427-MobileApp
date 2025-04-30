import { useState } from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';
import { signUp } from '@/services/auth/auth';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !handle) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, handle);
      // Signup successful - navigation handled elsewhere
    } catch (error) {
      let message = 'Signup failed. Please try again.';
      if (error.message === 'email-used') {
        message = 'This email is already registered';
      } else if (error.message === 'handle-taken') {
        message = 'This username is already taken';
      } else if (error.message === 'weak-password') {
        message = 'Password must be at least 6 characters';
      }
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Username"
        value={handle}
        onChangeText={setHandle}
        autoCapitalize="none"
      />
      <Button 
        title={loading ? "Creating Account..." : "Create Account"} 
        onPress={handleSignup} 
        disabled={loading}
      />
    </View>
  );
}