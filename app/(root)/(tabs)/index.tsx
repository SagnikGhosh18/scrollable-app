import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  ListRenderItem,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faHeart, faComment, faShareSquare } from "@fortawesome/free-regular-svg-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const NAVIGATION_BAR_HEIGHT = 70; // Height of the bottom navigation bar
const ITEM_HEIGHT = SCREEN_HEIGHT - NAVIGATION_BAR_HEIGHT; // Exact height of each FlatList item

// Define the type for each image item from the API
interface ImageItem {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const App: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]); // State for storing fetched images
  const [page, setPage] = useState<number>(1); // Pagination state
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  // Fetch images from Picsum API
  const fetchImages = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`);
      const data: ImageItem[] = await response.json();
      setImages((prevImages) => [...prevImages, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Render each image item
  const renderItem: ListRenderItem<ImageItem> = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.download_url }} style={styles.image} />
      <Text style={styles.caption}>For you</Text>
      <View style={styles.overlay}>
        <View style={styles.icons}>
          <FontAwesomeIcon icon={faUser} size={20} color="#fff" style={styles.icon} />
          <FontAwesomeIcon icon={faHeart} size={20} color="#fff" style={styles.icon} />
          <FontAwesomeIcon icon={faComment} size={20} color="#fff" style={styles.icon} />
          <FontAwesomeIcon icon={faShareSquare} size={20} color="#fff" style={styles.icon} />
        </View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          #hashtag #example @username
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        windowSize={2}
        pagingEnabled
        disableIntervalMomentum={true}
        showsVerticalScrollIndicator={false}
        initialNumToRender={1}
        decelerationRate="normal"
        onEndReached={fetchImages}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#fff" /> : null}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // Background color to match the app theme
  },
  imageContainer: {
    height: ITEM_HEIGHT,
    width: SCREEN_WIDTH,
    position: "relative",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  caption: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0, // Ensure it spans the entire width
    textAlign: "center", // Center the text horizontally
    color: "#fff",
    fontSize: 18,
    fontWeight: "100",
  },
  overlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  icons: {
    position: "absolute",
    right: 10,
    bottom: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginVertical: 10,
  },
  description: {
    color: "#fff",
    fontSize: 14,
    marginTop: 10,
  },
});

export default App;
