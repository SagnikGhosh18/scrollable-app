import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';

interface ImageData {
    id: string;
    author: string;
    download_url: string;
}

interface SectionProps {
    images: ImageData[];
    renderItem: (item: any) => JSX.Element;
    topic: string
}

const Section = (props: SectionProps) => {
    const {
        images,
        renderItem,
        topic
    } = props;

    return (
        <>
            <Text style={styles.sectionHeading}>{topic}</Text>
            <FlatList
                data={images}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
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
    },
    horizontalList: {
        marginBottom: 16,
    },
});