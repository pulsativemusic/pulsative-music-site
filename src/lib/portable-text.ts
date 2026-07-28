import type { PortableTextBlock } from '@portabletext/types';

function escapeHtml(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderSpans(
  children: PortableTextBlock['children'] | undefined,
): string {
  if (!children) return '';

  return children
    .map((child) => {
      if (!('text' in child) || typeof child.text !== 'string') return '';

      let html = escapeHtml(child.text);
      const marks = 'marks' in child && Array.isArray(child.marks) ? child.marks : [];
      if (marks.includes('strong')) html = `<strong>${html}</strong>`;
      if (marks.includes('em')) html = `<em>${html}</em>`;
      if (marks.includes('code')) html = `<code>${html}</code>`;
      if (marks.includes('underline')) html = `<u>${html}</u>`;
      if (marks.includes('strike-through')) html = `<s>${html}</s>`;
      return html;
    })
    .join('');
}

/** Minimal PT → HTML for bio/legal bodies (no custom blocks). */
export function portableTextToHtml(blocks: PortableTextBlock[] = []) {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !('children' in block)) {
        return '';
      }

      const style = 'style' in block ? block.style : 'normal';
      const inner = renderSpans(block.children);

      switch (style) {
        case 'h2':
          return `<h2>${inner}</h2>`;
        case 'h3':
          return `<h3>${inner}</h3>`;
        case 'blockquote':
          return `<blockquote>${inner}</blockquote>`;
        default:
          return `<p>${inner}</p>`;
      }
    })
    .join('');
}

export function portableTextToPlainText(blocks: PortableTextBlock[] = []) {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !('children' in block)) {
        return '';
      }

      return block.children
        .map((child) => ('text' in child ? child.text : ''))
        .join('');
    })
    .join('\n\n');
}
