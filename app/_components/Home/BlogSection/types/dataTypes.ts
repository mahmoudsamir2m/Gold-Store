export interface BlogContentItem {
  type: 'heading' | 'list' | 'paragraph';
  value: string | string[];
}

export interface BlogItem {
  id: number;
  slug: string; 
  imageSrc: string;
  title: string;
  description: string;
  date: string;
  author: string;
  href: string;
  content: BlogContentItem[];
}
