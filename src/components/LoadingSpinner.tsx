
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-accent-light rounded-full animate-spin"></div>
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
