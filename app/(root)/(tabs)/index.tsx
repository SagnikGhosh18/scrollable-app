import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ListRenderItem,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faHeart, faComment, faShareSquare } from "@fortawesome/free-regular-svg-icons";
import { ImageData } from "@/lib/types";
import { ITEM_HEIGHT, SCREEN_WIDTH } from "@/lib/constants";
import { fetchImages } from "@/lib/services";

const App: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFetchImages = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await fetchImages(page, 20);
      setImages((prevImages) => [...prevImages, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchImages();
  }, []);

  const renderItem: ListRenderItem<ImageData> = ({ item }) => (
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
        onEndReached={handleFetchImages}
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
    backgroundColor: "#000",
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
    right: 0,
    textAlign: "center",
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
