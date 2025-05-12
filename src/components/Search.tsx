'use client';

import { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const Search = ({ onSearch, placeholder = 'Search tools...', className = '' }: SearchProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  return (
    <div className={`relative group ${className}`}>
      <div className={`
        absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none
        transition-colors duration-200
        ${isFocused ? 'text-blue-500' : 'text-gray-400'}
      `}>
        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          block w-full pl-12 pr-4 py-3
          bg-white dark:bg-gray-800
          border-2 rounded-2xl
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          ${isFocused 
            ? 'border-blue-500 shadow-lg shadow-blue-100 dark:shadow-none' 
            : 'border-gray-100 hover:border-gray-200 dark:border-gray-700 dark:hover:border-gray-600'
          }
        `}
        placeholder={placeholder}
        aria-label="Search"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center"
          aria-label="Clear search"
        >
          <span className="
            text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400
            cursor-pointer rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700
            transition-colors duration-200
          ">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
      )}
      <div className={`
        absolute -inset-px rounded-2xl pointer-events-none
        transition-opacity duration-200
        ${isFocused ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="absolute inset-0 rounded-2xl bg-blue-50 dark:bg-blue-900/10 -z-10"></div>
      </div>
    </div>
  );
}; 