import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { StoryblokService } from "../../../lib/storyblok";
import { ContentRenderer } from "../../../components/storyblok/renderer";

export const usePost = routeLoader$(async (requestEvent) => {
  const slug = requestEvent.params.slug;
  
  try {
    const post = await StoryblokService.getStory(`posts/${slug}`);
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw requestEvent.error(404, 'Post not found');
  }
});

export default component$(() => {
  const post = usePost();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* 네비게이션 */}
        <div class="navbar bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div class="max-w-4xl mx-auto w-full">
            <div class="navbar-start">
              <a href="/" class="btn btn-ghost">
                ← 홈으로 돌아가기
              </a>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div class="max-w-4xl mx-auto">
          {/* 포스트 헤더 */}
          <header class="relative">
            {/* 히어로 이미지 */}
            {post.value.content.thumbnail && (
              <div class="relative h-96 mb-8 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={post.value.content.thumbnail.filename}
                  alt={post.value.content.thumbnail.alt || post.value.content.title}
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* 제목 오버레이 */}
                <div class="absolute bottom-0 left-0 right-0 p-8">
                  <div class="max-w-3xl">
                    <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      {post.value.content.title}
                    </h1>
                    {post.value.content.excerpt && (
                      <p class="text-xl text-white/90 leading-relaxed">
                        {post.value.content.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 썸네일이 없는 경우 */}
            {!post.value.content.thumbnail && (
              <div class="mb-8 px-8">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {post.value.content.title}
                </h1>
                {post.value.content.excerpt && (
                  <p class="text-xl text-gray-600 leading-relaxed">
                    {post.value.content.excerpt}
                  </p>
                )}
              </div>
            )}

            {/* 메타 정보 */}
            <div class="px-8 mb-8">
              <div class="flex flex-wrap items-center gap-4 text-gray-600">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span class="font-medium">
                    {formatDate(post.value.first_published_at || post.value.created_at)}
                  </span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>5분 읽기</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    블로그 포스트
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* 포스트 본문 */}
          <article class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="px-8 py-12">
              <div class="prose prose-lg prose-blue max-w-none">
                <ContentRenderer content={post.value.content.content} />
              </div>
              
            </div>
          </article>

          {/* 공유 및 추가 액션 */}
          <div class="mt-12 px-8">
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-4">
                이 글이 도움이 되었나요?
              </h3>
              <div class="flex justify-center gap-4">
                <button class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  좋아요
                </button>
                <button class="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                  </svg>
                  공유하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const post = resolveValue(usePost);
  
  return {
    title: `${post.content.title} | My Qwik Blog`,
    meta: [
      {
        name: "description",
        content: post.content.excerpt || "Blog post",
      },
      {
        property: "og:title",
        content: post.content.title,
      },
      {
        property: "og:description", 
        content: post.content.excerpt || "Blog post",
      },
      {
        property: "og:image",
        content: post.content.thumbnail?.filename || "",
      },
    ],
  };
};