export interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  imageHint: string;
  content: string;
  tags: string[];
}

export interface GalleryImage {
  id: string;
  src: string;
  hint: string;
  alt: string;
  caption: string;
  category: string;
}

export interface Settings {
  email: string;
  instagram: string;
}
