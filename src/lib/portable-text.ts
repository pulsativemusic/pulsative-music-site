import type { PortableTextBlock } from '@portabletext/types';

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
