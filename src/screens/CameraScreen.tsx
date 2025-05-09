import { Camera } from 'expo-camera';
import type { Camera as CameraType } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { uploadImage } from '../services/auth/auth';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<any>(null); //ใช้ any ไปก่อนหากต้องการให้ code ทำงาน แล้วค่อย refine type ทีหลัง



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
    <View style={StyleSheet.absoluteFill}>
      <Camera style={StyleSheet.absoluteFill} ref={cameraRef} />
      <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
    </View>
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