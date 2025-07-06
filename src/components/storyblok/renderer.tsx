import { component$, useStyles$ } from "@builder.io/qwik";
import type { ContentBlock } from "../../types/storyblok";
import { marked } from 'marked';

// Markdown 설정
marked.setOptions({
  gfm: true,
  breaks: true,
});

// 개별 블록 컴포넌트들
export const TextBlock = component$<{ blok: any }>(({ blok }) => {
  // 커스텀 스타일 추가
  useStyles$(`
    .markdown-content {
      line-height: 1.75;
      color: #374151;
    }
    .markdown-content h1 {
      font-size: 2.25rem;
      font-weight: 800;
      color: #111827;
      margin-top: 0;
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    .markdown-content h2 {
      font-size: 1.875rem;
      font-weight: 700;
      color: #111827;
      margin-top: 2rem;
      margin-bottom: 1rem;
      line-height: 1.3;
    }
    .markdown-content h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #111827;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      line-height: 1.4;
    }
    .markdown-content p {
      margin-bottom: 1rem;
      color: #4b5563;
    }
    .markdown-content ul {
      list-style-type: disc;
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }
    .markdown-content ol {
      list-style-type: decimal;
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }
    .markdown-content li {
      margin-bottom: 0.5rem;
      color: #4b5563;
    }
    .markdown-content a {
      color: #2563eb;
      text-decoration: none;
    }
    .markdown-content a:hover {
      text-decoration: underline;
    }
    .markdown-content blockquote {
      border-left: 4px solid #e5e7eb;
      padding-left: 1rem;
      margin: 1rem 0;
      font-style: italic;
      color: #6b7280;
      background-color: #f9fafb;
      padding: 1rem;
      border-radius: 0.375rem;
    }
    .markdown-content blockquote p {
      margin: 0;
    }
    .markdown-content code {
      background-color: #f3f4f6;
      color: #e11d48;
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    }
    .markdown-content strong {
      font-weight: 600;
      color: #111827;
    }
    .markdown-content em {
      font-style: italic;
    }
  `);

  // Markdown을 HTML로 변환
  const htmlContent = marked.parse(blok.content || '') as string;
  
  return (
    <div 
      class="markdown-content mb-6"
      dangerouslySetInnerHTML={htmlContent}
    />
  );
});

export const CodeBlock = component$<{ blok: any }>(({ blok }) => {
  return (
    <div class="mb-6">
      <div class="mockup-code">
        <div class="px-4 py-2 bg-neutral text-neutral-content text-sm font-mono rounded-t-lg">
          {blok.language || 'code'}
        </div>
        <pre class="px-4 py-4 overflow-x-auto">
          <code class="text-sm">{blok.code}</code>
        </pre>
      </div>
    </div>
  );
});

export const QuoteBlock = component$<{ blok: any }>(({ blok }) => {
  return (
    <div class="mb-6">
      <blockquote class="border-l-4 border-primary pl-4 py-2 bg-base-200 rounded-r-lg">
        <div class="prose prose-lg italic text-base-content/80">
          <div dangerouslySetInnerHTML={blok.quote} />
        </div>
      </blockquote>
    </div>
  );
});

// 메인 렌더러 컴포넌트
interface StoryblokRendererProps {
  blok: ContentBlock;
}

export const StoryblokRenderer = component$<StoryblokRendererProps>(({ blok }) => {
  switch (blok.component) {
    case 'text_block':
      return <TextBlock blok={blok} />;
      
    case 'code_block':
      return <CodeBlock blok={blok} />;
      
    case 'quote_block':
      return <QuoteBlock blok={blok} />;
      
    default:
      console.warn(`Unknown component type: ${blok.component}`);
      return (
        <div class="alert alert-warning mb-4">
          <span>Unknown block type: {blok.component}</span>
        </div>
      );
  }
});

// 콘텐츠 배열 전체를 렌더링하는 컴포넌트
interface ContentRendererProps {
  content: ContentBlock[];
}

export const ContentRenderer = component$<ContentRendererProps>(({ content }) => {
  if (!content || content.length === 0) {
    return (
      <div class="alert alert-info">
        <span>콘텐츠가 없습니다.</span>
      </div>
    );
  }

  return (
    <div class="content-wrapper">
      {content.map((blok) => (
        <StoryblokRenderer key={blok._uid} blok={blok} />
      ))}
    </div>
  );
});