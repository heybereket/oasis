import { plugin as EmojiParser } from '@lib/emojiParser';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import OasisDark from './OasisDark';
import gfm from 'remark-gfm';
import styles from './StyledMarkdown.module.css';
import poststyles from './StyledMarkdownPost.module.css';
import biostyles from './StyledMarkdownBio.module.css';

export const StyledMarkdown: React.FC<{
  text: string;
  isBio?: boolean;
  isPost?: boolean;
}> = ({ text, isBio, isPost }) => {
  return (
    <div
      className={`${styles.markdown} ${isPost ? poststyles.markdown : ''} ${
        isBio ? biostyles.markdown : ''
      }`}
    >
      <ReactMarkdown
        components={{
          code({ node: _, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
              <SyntaxHighlighter
                style={OasisDark}
                language={match?.[1]}
                PreTag="div"
                {...props}
                className="rounded-lg shadow-sm"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={`bg-gray-900 py-1 px-2 rounded-md ${className}`}>
                {children}
              </code>
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
