export interface TextBlock {
  component: 'text_block';
  content: string;
  _uid: string;
}

export interface CodeBlock {
  component: 'code_block';
  code: string;
  language: string;
  _uid: string;
}

export interface QuoteBlock {
  component: 'quote_block';
  quote: string;
  _uid: string;
}

export type ContentBlock = TextBlock | CodeBlock | QuoteBlock;

export interface PostStory {
  component: 'post';
  title: string;
  excerpt: string;
  thumbnail: {
    filename: string;
    alt: string;
  };
  content: ContentBlock[];
  _uid: string;
}

export interface StoryblokStory {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  created_at: string;
  published_at: string;
  content: PostStory;
}