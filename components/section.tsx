import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ImageData, SectionProps } from '@/lib/types';
import { fetchImages } from '@/lib/services';


const Section = (props: SectionProps) => {
    const {
        renderItem,
        topic
    } = props;

    const [images, setImages] = useState<ImageData[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFetchImages = async (): Promise<void> => {
        if (loading) return;
        setLoading(true);
        try {
            const data: ImageData[] = await fetchImages(page);
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

    return (
        <>
            <Text style={styles.sectionHeading}>{topic}</Text>
            <FlatList
                data={images}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                pagingEnabled
                disableIntervalMomentum={true}
                initialNumToRender={1}
                decelerationRate="normal"
                onEndReached={handleFetchImages}
                onEndReachedThreshold={0.5}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
                ListFooterComponent={loading ? <ActivityIndicator size="small" color="#black" /> : null}
            />
        </>
    )
}

export default Section;

const styles = StyleSheet.create({
    sectionHeading: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 8,
        color: "#4DA1A9"
    },
    horizontalList: {
        marginBottom: 16,
    },
});