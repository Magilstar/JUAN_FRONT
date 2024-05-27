import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { Link, useLocation } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavigationBar = ({ menuOptions, children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();
  const currentOption = menuOptions.find(option => option.path === location.pathname);
  const sidebarWidth = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(sidebarWidth, {
      toValue: isSidebarVisible ? 200 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [isSidebarVisible]);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name={isSidebarVisible ? "times" : "bars"} size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>{currentOption ? currentOption.label : "No page selected"}</Text>
      </View>
      <View style={styles.content}>
        {children}
      </View>
      <Animated.View style={[styles.sidebar, { width: sidebarWidth, left: isSidebarVisible ? 0 : -200 }]}>
        <View style={styles.overlay} />
        {menuOptions.map((option, index) => (
          <Link key={index} to={option.path} underlayColor="#f0f4f7" style={styles.link}>
            <TouchableOpacity onPress={option.action}>
              <Text style={{color: "#fff"}}>{option.label}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    gap: 15,
    backgroundColor: '#000',
    alignItems: 'center', // This will center the text vertically
  },
  pageTitle: {
    fontWeight: 'bold', // This will make the text bold
    fontSize: 20, // This will increase the text size
    color: '#fff', // This will set the text color to white
  },
  sidebar: {
    position: 'absolute',
    top: 50, // Adjust this value as needed
    height: Dimensions.get('window').height,
    backgroundColor: '#000',
    padding: 10,
    zIndex: 2,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  link: {
    margin: 10,
  },
  overlay: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
    backgroundColor: '#000',
  },
});

export default NavigationBar;