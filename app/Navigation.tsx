import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import Profile from './screens/Profile';
import Home from './screens/Home';
import { useTheme } from '@react-navigation/native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 

export const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeNav = createStackNavigator();
export const HomeStack = () => {
	const { colors } = useTheme();
	return (
	  <HomeNav.Navigator>
		<HomeNav.Screen
		  name="Home"
		  options={{ headerShown: false }}
		  component={Home}
		/>
		<HomeNav.Screen
		  name="Profile"
		  component={Profile}
		/>
	  </HomeNav.Navigator>
	);
  };

export const TabsStack = () => (
	<Tab.Navigator>
		<Tab.Screen 
			name="Home" 
			component={HomeStack}
			options={{
				tabBarLabel: 'Home',
				tabBarIcon: ({ color, size }) => (
					<FontAwesome5 name="dice-d20" color={color} size={size} />
				)
			}}			
		/>
	  	<Tab.Screen 
		  name="Profile" 
		  component={Profile} 
		  options={{
			tabBarLabel: 'Profile',
			tabBarIcon: ({ color, size }) => (
			  <FontAwesome name="user-circle" color={color} size={size} />
			),
		  }}
		/>
	</Tab.Navigator>
  );
