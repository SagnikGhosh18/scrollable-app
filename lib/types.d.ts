export interface ImageData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface SectionProps {
  loading: boolean;
  images: ImageData[];
  renderItem: (item: any) => JSX.Element;
  topic: string;
}
