import { ImageData } from "./types";

const BASE_URL = `https://picsum.photos/`;

const fetchImages = async (page=1, limit=10): Promise<ImageData[]> => {
    try {
        const response = await fetch(`${BASE_URL}v2/list?page=${page}&limit=${limit}`);
        const data: ImageData[] = await response.json();
        return data;
    } catch(err: any) {
        console.error("Failed to fetch images:", err.message);
        return [];
    }
}

const fetchSingleImage = async (): Promise<ImageData | Record<string, unknown>> => {
    try {
        const randomIndex: number = Math.ceil(Math.random() * 20);
        const response: ImageData[] = await fetchImages(3, 20);
        return response[randomIndex];
    } catch (err: any) {
        console.error("Failed to fetch images:", err.message);
        return {};
    }
};


export {
    fetchImages,
    fetchSingleImage
}