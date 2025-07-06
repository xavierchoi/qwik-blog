import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 기본 HTML 템플릿
const htmlTemplate = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Qwik Blog</title>
    <link rel="stylesheet" href="/assets/farRd_6e-style.css">
</head>
<body>
    <div id="root">
        <div style="text-align: center; padding: 4rem; color: #666;">
            <h1>My Qwik Blog</h1>
            <p>Qwik과 Storyblok으로 만든 블로그</p>
            <p>JavaScript가 로드되는 중입니다...</p>
        </div>
    </div>
    <script src="/build/q-sbFw8QGh.js" async></script>
</body>
</html>`;

// dist 디렉토리가 없으면 생성
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// index.html 생성
fs.writeFileSync(path.join(distDir, 'index.html'), htmlTemplate);

// 404.html 생성 (GitHub Pages용)
fs.writeFileSync(path.join(distDir, '404.html'), htmlTemplate);

console.log('✅ Static files generated successfully!');
console.log('📁 Generated: index.html, 404.html');