import React, { useState, useCallback } from 'react';
import ImagePromptForm from './components/ImagePromptForm';
import ImageDisplay from './components/ImageDisplay';
import Spinner from './components/Spinner';
import { generateImageWithImagen } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageUrl(null); 

    try {
      const generatedUrl = await generateImageWithImagen(prompt);
      setImageUrl(generatedUrl);
    } catch (err) {
      let errorMessage = 'An unexpected error occurred.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Image generation failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="bg-gray-900 text-gray-100 flex flex-col items-center justify-center py-12 px-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-2xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              AI Image Generator
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Powered by Google's Imagen 3. Enter a prompt to create a unique image.
          </p>
        </header>

        <main className="bg-gray-800 shadow-2xl rounded-xl p-6 md:p-8 space-y-6">
          <ImagePromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerateImage}
            isLoading={isLoading}
          />

          {isLoading && (
            <div className="flex flex-col justify-center items-center py-10 space-y-3">
              <Spinner />
              <p className="text-gray-300 animate-pulse">Generating your masterpiece...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md" role="alert">
              <div className="flex">
                <div className="py-1">
                  <svg className="fill-current h-6 w-6 text-red-400 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 0 1-1-1V6a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1z"/></svg>
                </div>
                <div>
                  <p className="font-bold">Oops! Something went wrong.</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {!isLoading && <ImageDisplay imageUrl={imageUrl} prompt={prompt} />}
        </main>

        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>
            Ensure your <code className="bg-gray-700 text-gray-300 px-1 py-0.5 rounded text-xs">API_KEY</code> is correctly set in your environment.
          </p>
          <p className="mt-1">&copy; {new Date().getFullYear()} Imagen AI Generator. Crafted with passion.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
