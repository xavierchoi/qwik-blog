import { component$, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { StoryblokService } from "../lib/storyblok";
import { PostCard } from "../components/post-card/post-card";

export const usePosts = routeLoader$(async () => {
  try {
    const posts = await StoryblokService.getStories({
      starts_with: 'posts/',
      per_page: 10,
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
});

export default component$(() => {
  const posts = usePosts();

  useStyles$(`
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in {
      animation: fade-in 0.6s ease-out forwards;
      opacity: 0;
    }
  `);

  return (
    <>
      <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* 헤더 섹션 */}
        <header class="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
          <div class="relative max-w-6xl mx-auto px-8 py-16">
            <div class="text-center">
              <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                My Qwik Blog
              </h1>
              <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Qwik과 Storyblok으로 만든 블로그에서 개발 이야기와 인사이트를 공유합니다
              </p>
              <div class="mt-8 flex justify-center">
                <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span class="text-sm text-gray-600 font-medium">
                    {posts.value.length}개의 포스트가 있습니다
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main class="max-w-6xl mx-auto px-8 py-12">
          {posts.value.length > 0 ? (
            <>
              {/* 최신 포스트 섹션 */}
              <section class="mb-12">
                <div class="flex items-center justify-between mb-8">
                  <h2 class="text-3xl font-bold text-gray-900">최신 포스트</h2>
                  <div class="hidden md:flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    최근 업데이트됨
                  </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.value.map((post, index) => (
                    <div 
                      key={post.id} 
                      class="animate-fade-in" 
                      style={`animation-delay: ${index * 100}ms`}
                    >
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              </section>

              {/* 통계 섹션 */}
              <section class="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div class="group">
                    <div class="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                      {posts.value.length}
                    </div>
                    <div class="text-gray-600 font-medium">게시된 포스트</div>
                  </div>
                  <div class="group">
                    <div class="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                      {posts.value.length * 5}분
                    </div>
                    <div class="text-gray-600 font-medium">예상 읽기 시간</div>
                  </div>
                  <div class="group">
                    <div class="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">
                      100%
                    </div>
                    <div class="text-gray-600 font-medium">Qwik Powered</div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div class="text-center py-16">
              <div class="max-w-md mx-auto">
                <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">첫 번째 포스트를 작성해보세요</h3>
                <p class="text-gray-600 mb-6">Storyblok에서 posts 폴더에 새로운 포스트를 만들어보세요.</p>
                <a 
                  href="/debug" 
                  class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  디버그 페이지에서 확인하기
                </a>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "My Qwik Blog",
  meta: [
    {
      name: "description",
      content: "A blog built with Qwik and Storyblok",
    },
  ],
};
