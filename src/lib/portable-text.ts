import type { PortableTextBlock } from '@portabletext/types';

type MarkDef = { _key: string; _type: string; href?: string };

function escapeHtml(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderSpans(
  children: PortableTextBlock['children'] | undefined,
  markDefs: MarkDef[] = [],
): string {
  if (!children) return '';

  return children
    .map((child) => {
      if (!('text' in child) || typeof child.text !== 'string') return '';

      // Soft breaks from Sanity (Shift+Enter) stay as newlines in the span text.
      let html = escapeHtml(child.text).replaceAll('\n', '<br>');
      const marks = 'marks' in child && Array.isArray(child.marks) ? child.marks : [];

      for (const mark of marks) {
        if (mark === 'strong') html = `<strong>${html}</strong>`;
        else if (mark === 'em') html = `<em>${html}</em>`;
        else if (mark === 'code') html = `<code>${html}</code>`;
        else if (mark === 'underline') html = `<u>${html}</u>`;
        else if (mark === 'strike-through') html = `<s>${html}</s>`;
        else {
          const def = markDefs.find((d) => d._key === mark);
          if (def?._type === 'link' && def.href) {
            html = `<a href="${escapeHtml(def.href)}">${html}</a>`;
          }
        }
      }

      return html;
    })
    .join('');
}

function blockTag(
  block: PortableTextBlock,
  markDefs: MarkDef[],
): { open: string; close: string; inner: string } | null {
  if (block._type !== 'block' || !('children' in block)) return null;

  const style = 'style' in block ? block.style : 'normal';
  const listItem = 'listItem' in block ? block.listItem : undefined;
  const inner = renderSpans(block.children, markDefs);

  if (listItem === 'bullet') return { open: '<li>', close: '</li>', inner };
  if (listItem === 'number') return { open: '<li>', close: '</li>', inner };

  switch (style) {
    case 'h2':
      return { open: '<h2>', close: '</h2>', inner };
    case 'h3':
      return { open: '<h3>', close: '</h3>', inner };
    case 'blockquote':
      return { open: '<blockquote>', close: '</blockquote>', inner };
    default:
      return { open: '<p>', close: '</p>', inner };
  }
}

/** Minimal PT → HTML for bio/legal bodies (no custom blocks). */
export function portableTextToHtml(blocks: PortableTextBlock[] = []) {
  const parts: string[] = [];
  let listOpen: 'ul' | 'ol' | null = null;

  const closeList = () => {
    if (listOpen) {
      parts.push(`</${listOpen}>`);
      listOpen = null;
    }
  };

  for (const block of blocks) {
    const markDefs =
      'markDefs' in block && Array.isArray(block.markDefs)
        ? (block.markDefs as MarkDef[])
        : [];
    const listItem = 'listItem' in block ? block.listItem : undefined;
    const rendered = blockTag(block, markDefs);
    if (!rendered) {
      closeList();
      continue;
    }

    const nextList: 'ul' | 'ol' | null =
      listItem === 'bullet' ? 'ul' : listItem === 'number' ? 'ol' : null;

    if (nextList !== listOpen) {
      closeList();
      if (nextList) {
        parts.push(`<${nextList}>`);
        listOpen = nextList;
      }
    }

    parts.push(`${rendered.open}${rendered.inner}${rendered.close}`);
  }

  closeList();
  return parts.join('');
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
