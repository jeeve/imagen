import React from 'react';

interface ImageDisplayProps {
  imageUrl: string | null;
  prompt: string; 
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, prompt }) => {
  if (!imageUrl) {
    return (
      <div className="w-full aspect-square bg-gray-700/30 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-center">Your generated image will appear here.</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-square rounded-lg overflow-hidden shadow-xl border border-gray-700">
      <img
        src={imageUrl}
        alt={prompt ? `AI generated: ${prompt}` : 'AI generated image'}
        className="w-full h-full object-contain bg-gray-800"
      />
    </div>
  );
};

export default ImageDisplay;
