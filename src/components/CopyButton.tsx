'use client';

import { useState } from 'react';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export const CopyButton = ({ text, className = '' }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center p-2 rounded-md 
        transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${copied ? 'text-green-500' : 'text-gray-500'} ${className}`}
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <CheckIcon className="w-5 h-5" />
      ) : (
        <ClipboardIcon className="w-5 h-5" />
      )}
    </button>
  );
}; 