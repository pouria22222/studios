export type Language = 'en' | 'fa';

export type LocalizedString = {
  [key in Language]: string;
};

export interface Post {
  id: string;
  title: LocalizedString;
  author: string;
  date: string;
  image: string;
  imageHint: string;
  content: LocalizedString;
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
