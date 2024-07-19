// Drawer.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, StyleSheet } from 'react-native';
import { GestureEvent, PanGestureHandler, PanGestureHandlerEventPayload, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const Drawer = ({ children, drawerContent }: {
  children?: JSX.Element;
  drawerContent: ({closeDrawer}: {closeDrawer: () => void}) => JSX.Element
}) => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const translateX = new Animated.Value(-width);

  const handleGesture = ({ nativeEvent }: GestureEvent<PanGestureHandlerEventPayload>) => {
    if (nativeEvent.translationX > 0) {
      translateX.setValue(nativeEvent.translationX - width);
    }
  };

  const handleStateChange = ({ nativeEvent }: GestureEvent<PanGestureHandlerEventPayload>) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX > width / 2) {
        openDrawer();
      } else {
        closeDrawer();
      }
    }
  };

  const openDrawer = () => {
    setDrawerOpened(true);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(translateX, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setDrawerOpened(false));
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onHandlerStateChange={handleStateChange}
      >
        <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
          {drawerContent({ closeDrawer })}
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        style={[
          styles.mainContent,
          drawerOpened && styles.mainContentOverlay,
        ]}
      >
        <TouchableOpacity onPress={openDrawer} style={styles.openButton}>
          <Text style={styles.buttonText}>Open Drawer</Text>
        </TouchableOpacity>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    position: 'absolute',
    width: width * 0.8,
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContentOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  openButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Drawer;