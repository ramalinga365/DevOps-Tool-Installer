export const LoadingSpinner = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`} role="status">
      <div className="animate-spin h-6 w-6 border-3 border-current border-t-transparent text-blue-600 rounded-full" 
        aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}; 