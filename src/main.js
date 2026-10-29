import './style.css';
import { marked } from 'marked';

document.querySelector('#year').textContent = new Date().getFullYear();

const files = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// The front matter supports the three plain-text fields used by our posts.
const posts = Object.entries(files).map(([path, raw]) => {
  const match = raw.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Thiếu phần đầu Markdown: ${path}`);
  const meta = Object.fromEntries(match[1].split(/\r?\n/).map((line) => {
    const separator = line.indexOf(':');
    return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
  }));
  if (!meta.title || !meta.excerpt || !/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) {
    throw new Error(`Phần đầu Markdown không hợp lệ: ${path}`);
  }
  return { ...meta, slug: path.split('/').pop().replace(/\.md$/, ''), body: match[2] };
}).sort((a, b) => b.date.localeCompare(a.date));

const main = document.querySelector('main');
const home = main.innerHTML;
const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC',
});
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));
const postDate = (date) => `<time datetime="${date}">${dateFormatter.format(new Date(`${date}T00:00:00Z`))}</time>`;

function render() {
  const route = window.location.hash;
  if (route.startsWith('#/')) {
    let slug;
    try { slug = decodeURIComponent(route.slice('#/bai/'.length)); } catch { slug = null; }
    const post = route.startsWith('#/bai/') && posts.find((item) => item.slug === slug);
    main.innerHTML = `<section class="reading-view"><a class="back-link" href="#/">← Quay lại trang chủ</a>${post
      ? `<article><header><div class="post-meta">HỌC AI · ${postDate(post.date)}</div><h1 tabindex="-1">${escapeHtml(post.title)}</h1><p class="reading-excerpt">${escapeHtml(post.excerpt)}</p></header><div class="markdown-body">${marked.parse(post.body)}</div></article>`
      : '<h1 tabindex="-1">Không tìm thấy bài viết</h1><p>Bài viết này chưa có trong góc nhỏ. Mời bạn quay lại xem các bài khác nhé.</p>'}</section>`;
    // Markdown is authored locally in posts/, never supplied by visitors.
    if (route === '#/') renderHome();
    else {
      document.title = `${post ? post.title : 'Không tìm thấy bài viết'} | Góc nhỏ của mình`;
      main.querySelector('h1').focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }
  } else renderHome();
}

function renderHome() {
  main.innerHTML = home;
  document.title = 'Góc nhỏ của mình';
  const list = main.querySelector('#post-list');
  list.innerHTML = posts.map((post, index) => `<article class="post">
    <div class="post-art ${index % 2 ? 'art-notes' : 'art-morning'}" aria-hidden="true"><span>${['✧', '✎', '☕'][index % 3]}</span><small>học từng chút một</small></div>
    <div class="post-copy"><div class="post-meta">HỌC AI · ${postDate(post.date)}</div><h3><a href="#/bai/${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a></h3><p>${escapeHtml(post.excerpt)}</p><a class="read-link" href="#/bai/${encodeURIComponent(post.slug)}" aria-label="Đọc bài: ${escapeHtml(post.title)}">Đọc bài viết →</a></div>
  </article>`).join('');
}

window.addEventListener('hashchange', render);
render();
