import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import LoginScreen from '@/screens/Login/LoginScreen';
// import SignupScreen from '@/screens/SignupScreen';
import FeedScreen from '@/screens/FeedScreen';
import PostScreen from '@/screens/PostScreen';
import ProfileScreen from '@/screens/ProfileScreen';

// export type AuthStackParamList = {
//   Login: undefined;
//   Signup: undefined;
// };

const Tab = createBottomTabNavigator();

export default function AuthNavigator() {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Feed" component={FeedScreen} />
    <Tab.Screen name="Post" component={PostScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
    
  );
}