import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
// Relative paths (temporary for verification)
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

function RootNavigator() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return currentUser ? <AppNavigator /> : <AuthNavigator />;
;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}