import { plugin as EmojiParser } from '@lib/emojiParser';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import styles from './StyledMarkdown.module.css';

export const StyledMarkdown: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown remarkPlugins={[gfm, EmojiParser]}>{text}</ReactMarkdown>
    </div>
  );
};

export default StyledMarkdown;
