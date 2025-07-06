import StoryblokClient from 'storyblok-js-client';
import type { StoryblokStory } from '../types/storyblok';

const storyblokClient = new StoryblokClient({
  accessToken: import.meta.env.PUBLIC_STORYBLOK_ACCESS_TOKEN,
});

export class StoryblokService {
  static async getStories(options: {
    starts_with?: string;
    per_page?: number;
    page?: number;
  } = {}) {
    try {
      const response = await storyblokClient.get('cdn/stories', {
        version: 'draft',
        ...options,
      });
      return response.data.stories as StoryblokStory[];
    } catch (error) {
      console.error('Error fetching stories:', error);
      throw error;
    }
  }

  static async getStory(slug: string) {
    try {
      const response = await storyblokClient.get(`cdn/stories/${slug}`, {
        version: 'draft',
      });
      return response.data.story as StoryblokStory;
    } catch (error) {
      console.error('Error fetching story:', error);
      throw error;
    }
  }

  static async getPostsByTag(tag: string) {
    try {
      const response = await storyblokClient.get('cdn/stories', {
        version: 'draft',
        filter_query: {
          component: {
            in: 'post',
          },
          tags: {
            in: tag,
          },
        },
      });
      return response.data.stories as StoryblokStory[];
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
      throw error;
    }
  }
}

export { storyblokClient };