import React from 'react';

interface ImagePromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const ImagePromptForm: React.FC<ImagePromptFormProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Describe the image you want to create:
        </label>
        <textarea
          id="prompt"
          name="prompt"
          rows={4}
          className="block w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-100 placeholder-gray-400 transition-colors duration-150"
          placeholder="e.g., A photo of a cat astronaut exploring Mars, cinematic lighting"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
          autoFocus
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed transition-all duration-150 ease-in-out transform active:scale-95"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Image'
        )}
      </button>
    </form>
  );
};

export default ImagePromptForm;
