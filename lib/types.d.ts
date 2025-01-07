export interface ImageData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface SectionProps {
  renderItem: (item: any) => JSX.Element;
  topic: string;
}