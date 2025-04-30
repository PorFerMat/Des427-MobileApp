import { Camera } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import { uploadImage } from '../services/auth/auth';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      await uploadImage(photo.uri);
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No camera access</Text>;

  return (
    <Camera style={StyleSheet.absoluteFill} ref={cameraRef}>
      <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
    </Camera>
  );
}

const styles = StyleSheet.create({
  captureButton: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});