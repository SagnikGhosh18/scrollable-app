import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from "react-native";
import Section from "@/components/section";
import { ImageData } from "@/lib/types";
import { fetchSingleImage } from "@/lib/services";

const Search: React.FC = () => {
    const [image, setImage] = useState<ImageData>();
    const [loading, setLoading] = useState<boolean>(false);

    const fetchTopImage = async (): Promise<void> => {
        if (loading) return;
        setLoading(true);
        try {
            const data: ImageData | Record<string, unknown> = await fetchSingleImage();

            if ((data as ImageData).download_url) {
                setImage(data as ImageData);
            } else {
                console.error("Unexpected data format:", data);
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopImage();
    }, []);

    const renderHashtagItem = ({ item }: { item: ImageData }) => (
        <TouchableOpacity style={styles.hashtagItem}>
            <Image source={{ uri: item.download_url }} style={styles.hashtagImage} />
            <Text style={styles.hashtagText}>#{item.author}</Text>
        </TouchableOpacity>
    );

    const renderCommunityItem = ({ item }: { item: ImageData }) => (
        <TouchableOpacity style={styles.communityItem}>
            <Image source={{ uri: item.download_url }} style={styles.communityImage} />
            <Text style={styles.communityText}>Places of {item.author}</Text>
        </TouchableOpacity>
    );

    const renderNomadItem = ({ item }: { item: ImageData }) => (
        <View style={styles.nomadItem}>
            <Image source={{ uri: item.download_url }} style={styles.nomadImage} />
            <Text style={styles.nomadName}>{item.author}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* Search Bar */}
                    <Text style={styles.heading}>Discover the world</Text>
                    <TextInput style={styles.searchBar} placeholder="Search" />

                    {/* Top Search */}
                    <View style={styles.topSearch}>
                        {image?.download_url && (
                            <Image
                                source={{ uri: image.download_url }}
                                style={styles.topSearchImage}
                            />
                        )}
                        <Text style={styles.topSearchText}>#Top search of the day</Text>
                    </View>

                    {/* Trending Hashtags */}
                    <Section
                        renderItem={renderHashtagItem}
                        topic="Trending hashtags"
                    />

                    {/* Top Community */}
                    <Section
                        renderItem={renderCommunityItem}
                        topic="Top community"
                    />

                    {/* Top Nomads */}
                    <Section
                        renderItem={renderNomadItem}
                        topic="Top nomads"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F9F9F9",
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: "#F9F9F9",
    },
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#4DA1A9"
    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    topSearch: {
        marginBottom: 16,
    },
    topSearchImage: {
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    topSearchText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    hashtagItem: {
        marginRight: 12,
    },
    hashtagImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    hashtagText: {
        marginTop: 8,
        textAlign: "center",
    },
    communityItem: {
        marginRight: 12,
        width: 150,
    },
    communityImage: {
        height: 100,
        borderRadius: 8,
    },
    communityText: {
        marginTop: 8,
        textAlign: "center",
        fontWeight: "bold",
    },
    nomadItem: {
        alignItems: "center",
        marginRight: 16,
    },
    nomadImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    nomadName: {
        marginTop: 8,
        fontSize: 8
    },
});

export default Search;
