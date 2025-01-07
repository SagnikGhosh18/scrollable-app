import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import { SectionProps } from '@/lib/types';


const Section = (props: SectionProps) => {
    const {
        loading,
        images,
        renderItem,
        topic
    } = props;

    return (
        <>
            <Text style={styles.sectionHeading}>{topic}</Text>
            {loading ?
                <ActivityIndicator size="large" color="black" /> :
                <FlatList
                    data={images}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                />}
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