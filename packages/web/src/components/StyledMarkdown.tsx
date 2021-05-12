import { plugin as EmojiParser } from '@lib/emojiParser';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
import styles from './StyledMarkdown.module.css';

export const StyledMarkdown: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        components={{
          code({ node: _, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={materialDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className}>{children}</code>
            );
          },
        }}
        remarkPlugins={[gfm, EmojiParser]}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default StyledMarkdown;
