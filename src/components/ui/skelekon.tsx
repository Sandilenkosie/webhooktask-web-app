import React from "react";

type SkelekonProps = {
  className?: string;
  lines?: number;
};

const Skelekon: React.FC<SkelekonProps> = ({ className = "", lines = 6 }) => {
  return (
    <div className={`animate-pulse ${className}`}> 
      <div className="space-y-4">
        {/* prominent title placeholder */}
        <div className="h-8 bg-gray-300/90 rounded w-3/4 mb-2" />

        {/* larger input/button placeholders */}
        {Array.from({ length: Math.max(3, Math.floor(lines / 2)) }).map((_, i) => (
          <div key={`block-${i}`} className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        ))}

        {/* action/button placeholder */}
        <div className="h-12 bg-gray-300 rounded w-1/2 mt-4" />
      </div>
    </div>
  );
};

export default Skelekon;
