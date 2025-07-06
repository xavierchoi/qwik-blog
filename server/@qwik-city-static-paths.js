const staticPaths = new Set(["/qwik-blog/","/qwik-blog/debug/","/qwik-blog/favicon.svg","/qwik-blog/manifest.json","/qwik-blog/q-manifest.json","/qwik-blog/robots.txt","/qwik-blog/sitemap.xml"]);
function isStaticPath(method, url) {
  if (method.toUpperCase() !== 'GET') {
    return false;
  }
  const p = url.pathname;
  if (p.startsWith("/qwik-blog/build/")) {
    return true;
  }
  if (p.startsWith("/qwik-blog/assets/")) {
    return true;
  }
  if (staticPaths.has(p)) {
    return true;
  }
  if (p.endsWith('/q-data.json')) {
    const pWithoutQdata = p.replace(/\/q-data.json$/, '');
    if (staticPaths.has(pWithoutQdata + '/')) {
      return true;
    }
    if (staticPaths.has(pWithoutQdata)) {
      return true;
    }
  }
  return false;
}
export { isStaticPath };