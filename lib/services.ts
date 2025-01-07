import { ImageData } from "./types";

const BASE_URL = `https://picsum.photos/v2/list`;

const fetchImages = async (page=1, limit=10): Promise<ImageData[]> => {
    const response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);
    const data: ImageData[] = await response.json();
    return data;
}

export {
    fetchImages
}