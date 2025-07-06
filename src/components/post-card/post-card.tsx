import { component$ } from "@builder.io/qwik";
import type { StoryblokStory } from "../../types/storyblok";

interface PostCardProps {
  post: StoryblokStory;
}

export const PostCard = component$<PostCardProps>(({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <article class="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
      <a href={`/blog/${post.slug}/`} class="block">
        {/* 썸네일 이미지 */}
        <div class="relative overflow-hidden h-56">
          <img
            src={post.content.thumbnail?.filename || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop"}
            alt={post.content.thumbnail?.alt || post.content.title}
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* 읽기 시간 배지 */}
          <div class="absolute top-4 right-4">
            <span class="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              5분 읽기
            </span>
          </div>
        </div>

        {/* 카드 콘텐츠 */}
        <div class="p-6">
          {/* 카테고리 & 날짜 */}
          <div class="flex items-center gap-3 mb-3">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
              블로그
            </span>
            <span class="text-gray-500 text-sm">
              {formatDate(post.first_published_at || post.created_at)}
            </span>
          </div>

          {/* 제목 */}
          <h2 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {post.content.title}
          </h2>

          {/* 요약 */}
          <p class="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {post.content.excerpt}
          </p>

          {/* 읽기 더보기 */}
          <div class="flex items-center justify-between">
            <div class="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
              자세히 읽기
              <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
});