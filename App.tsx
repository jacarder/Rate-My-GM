import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SearchBarGM from './app/components/SearchBarGM';
import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import { User, Game } from './app/models/data.model';
import APIUtils from './app/api/APIUtils';
import Home from './app/screens/Home';
import Profile from './app/screens/Profile';
import { RootStack, HomeStack, TabsStack } from './app/Navigation';
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAYDZwcoVRoLDZAp3fAGrTSlKKUe1EJnvQ",
  authDomain: "ratemygm.firebaseapp.com",
  databaseURL: "https://ratemygm-default-rtdb.firebaseio.com",
  projectId: "ratemygm",
  storageBucket: "ratemygm.appspot.com",
  messagingSenderId: "820651143953",
  appId: "1:820651143953:web:f62b14918f858a5dcc52b0",
  measurementId: "G-Y8JM1QE4WQ"
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  /*
  return (
    <SafeAreaView style={styles.container}>
      <SearchBarGM/>
    </SafeAreaView>
  );
  */
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: firebase.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function signUp() {
    firebase.auth()
      .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  function addUser() {
    let db = firebase.database().ref();
    let authUser = user as firebase.User;
    let userName = "George";
    let gameList: Game[] = [new Game("Coriolis"), new Game("D&D")];
    let newUser = new User(authUser.uid, userName.toLowerCase(), userName, true, 10, gameList)
    APIUtils.setUser(newUser)
  }

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
        <Text onPress={signUp}>
          Sign Up
        </Text>
      </View>
    );
  }
  return (
    <NavigationContainer>    
        <SearchBarGM></SearchBarGM>
        <Text>Welcome {user.email}</Text>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen
            name="Main"
            component={TabsStack}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>    
    </NavigationContainer>
  );  
}

const styles = StyleSheet.create({
  container: {
    /*
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    */
  },
});
