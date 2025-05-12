'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export const ToolLayout = ({ children, title, description }: ToolLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Tools
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
            <div className="mt-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 