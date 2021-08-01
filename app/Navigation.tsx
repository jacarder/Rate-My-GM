import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './screens/Home';
import Profile from './screens/Profile';
import GameMaster from './screens/GameMaster';

// TODO add typing
//	Used to allow navigation outside of the stack
//	Used to navigate from the list inside SearchBarGM
export const navigationRef = React.createRef() as any;
export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}
//	Create the stacks
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
		<HomeNav.Screen
			name="GameMaster"
			component={GameMaster}
			options={{ headerShown: false }}
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
