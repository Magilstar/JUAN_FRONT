import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { Link, useLocation } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { SidebarContext } from "../contexts/SidebarContext";

const NavigationBar = ({ menuOptions, children }) => {
  const { isSidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const location = useLocation();
  const currentOption = menuOptions.find((option) => {
    const containsParam = option.path.includes(":");

    if (!containsParam) {
      return option.path === location.pathname;
    } else {
      const [baseOptionPath] = option.path.split("/:");
      const baseLocationPath = location.pathname.split("/");

      const parsedLocationPath = `/${baseLocationPath[1]}`;

      return baseOptionPath === parsedLocationPath;
    }
  });

  const sidebarWidth = new Animated.Value(0);
  const sidebarPosition = new Animated.Value(-200);

  useEffect(() => {
    setSidebarVisible(false);
  }, [location]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(sidebarWidth, {
        toValue: isSidebarVisible ? 200 : 0,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(sidebarPosition, {
        toValue: isSidebarVisible ? 0 : -200,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isSidebarVisible]);

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon
            name={isSidebarVisible ? "times" : "bars"}
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>
          {currentOption ? currentOption.label : "No page selected"}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.content}
        activeOpacity={1}
        onPress={isSidebarVisible ? toggleSidebar : null}
      >
        {children}
      </TouchableOpacity>

      {isSidebarVisible && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleSidebar}
        />
      )}

      <Animated.View
        style={[styles.sidebar, { width: sidebarWidth, left: sidebarPosition }]}
      >
        {menuOptions
          .filter((option) => option.action)
          .map((option, index) => (
            <Link
              key={index}
              to={option.path}
              underlayColor="#f0f4f7"
              style={styles.link}
            >
              <TouchableOpacity onPress={option.action}>
                <Text
                  style={{ color: "#fff", fontWeight: "500", fontSize: 18 }}
                >
                  {option.label}
                </Text>
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
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    gap: 15,
    backgroundColor: "#000",
    alignItems: "center",
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  sidebar: {
    position: "absolute",
    top: 50,
    height: Dimensions.get("window").height,
    backgroundColor: "#000",
    padding: 10,
    zIndex: 2,
  },
  content: {
    flex: 1,
  },
  link: {
    margin: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
});

export default NavigationBar;
