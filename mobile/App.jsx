import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  useColorScheme,
  View,
} from 'react-native';
import Home from './components/Home';



function App() {
  return (
    <SafeAreaView>
      <Home/>
    </SafeAreaView>
  );
}

export default App;
