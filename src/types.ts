export interface Post {
  id: number;
  created_at: string;
  title: string;
  content: string;
  image: string;
}

export interface Product {
  id: number;
  created_at: string;
  name: string;
  description: string;
  price: number;
  download_url: string | null;
}

export interface Settings {
  email: string;
  youtube: string;
  telegram: string;
}
