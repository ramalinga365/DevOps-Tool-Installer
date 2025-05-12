'use client';

import { CopyButton } from './CopyButton';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeBlock = ({ code, language = 'bash', className = '' }: CodeBlockProps) => {
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <div className="absolute top-2 right-2 z-10">
        <CopyButton text={code} />
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          paddingRight: '3rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}; 