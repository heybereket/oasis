import { plugin as EmojiParser } from '../emoji/emojiParser';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import styles from './styles/StyledMarkdown.module.css';
import poststyles from './styles/StyledMarkdownPost.module.css';
import biostyles from './styles/StyledMarkdownBio.module.css';
import { RunCode } from '../runner/RunCode';
import { RuntimesContext } from '../runner/PistonRuntimesProvider';

export const StyledMarkdown: React.FC<{
  text: string;
  isBio?: boolean;
  isPost?: boolean;
  classes?: string;
}> = ({ text, isBio, isPost, classes }) => {
  return (
    <div
      className={`${styles.markdown} ${isPost ? poststyles.markdown : ''} ${
        isBio ? biostyles.markdown : ''
      } ${classes ?? ''}`}
    >
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\*?\w+)/.exec(className || '');
            return !inline ? (
              <RuntimesContext.Consumer>
                {(context) => (
                  <RunCode
                    code={children}
                    exraProps={props}
                    languageMatch={match}
                    runtimes={context}
                  />
                )}
              </RuntimesContext.Consumer>
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
