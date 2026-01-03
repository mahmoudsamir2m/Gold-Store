export interface BlogContentItem {
  type: "heading" | "list" | "paragraph";
  value: string | string[];
}

export interface BlogItem {
  id: number;
  slug: string;
  imageSrc: string;
  title: string;
  description: string;
  date: string;
  content: BlogContentItem[];
}

export interface ApiBlogItem {
  id: number;
  name: string;
  image_path: string;
  titles: {
    id: number;
    blog_id: number;
    title: string;
    type: string;
    contents: {
      id: number;
      blog_title_id: number;
      content: string;
      created_at: string;
      updated_at: string;
    }[];
    created_at: string;
    updated_at: string;
  }[];
  created_at: string;
  updated_at: string;
}
