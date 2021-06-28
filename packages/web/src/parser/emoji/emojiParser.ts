import visit from 'unist-util-visit';

const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;

import EMOJI_TRANSLATIONS from './emojis.json';

const DEFAULT_SETTINGS = {};

export function plugin(_: typeof DEFAULT_SETTINGS): any {
  const getEmoji = (match: string) => {
    const got = (EMOJI_TRANSLATIONS as any)[match.slice(1, -1)];
    if (!got) {
      return match;
    } else {
      return got;
    }
  };

  return (tree: any) => {
    visit(tree, 'text', (node: any) => {
      node.value = node.value.replace(RE_EMOJI, getEmoji);
    });
  };
}
