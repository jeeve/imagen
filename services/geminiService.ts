import { GoogleGenAI } from "@google/genai";

// This relies on process.env.API_KEY being set in the execution environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable is not set. Gemini API calls will fail. Ensure this variable is available in your deployment environment.");
}

// Initialize with a fallback or throw if API_KEY is critical and undefined.
// The prompt implies API_KEY will be available, so we use '!' for non-null assertion.
// If API_KEY is indeed undefined, this will throw a runtime error at initialization.
const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateImageWithImagen = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    // This check provides a user-friendly error if the API key wasn't available at initialization
    // and the app somehow proceeded.
    return Promise.reject(new Error("Gemini API key is not configured. Please set the API_KEY environment variable."));
  }
  
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002', // Specified Imagen model
      prompt: prompt,
      config: { 
        numberOfImages: 1, 
        outputMimeType: 'image/jpeg' // Using JPEG for smaller file sizes
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("The API did not return any images. The prompt might be too restrictive, unsupported, or there could be a temporary issue with the service.");
    }

    const image = response.generatedImages[0];
    if (!image.image || !image.image.imageBytes) {
      throw new Error("Generated image data is missing or malformed in the API response.");
    }

    const base64ImageBytes: string = image.image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;

  } catch (error) {
    console.error("Error generating image with Imagen:", error);
    let errorMessage = "Failed to generate image due to an unknown error.";
    if (error instanceof Error) {
      // Check for specific error messages that might come from the SDK or network
      if (error.message.toLowerCase().includes('api key not valid') || error.message.toLowerCase().includes('permission denied')) {
        errorMessage = "Invalid API Key or insufficient permissions. Please check your API key and ensure it has access to the Imagen model.";
      } else if (error.message.toLowerCase().includes('quota')) {
        errorMessage = "API quota exceeded. Please try again later or check your quota limits.";
      } else if (error.message.toLowerCase().includes('model_not_found') || error.message.toLowerCase().includes('model not found')) {
        errorMessage = "The specified image generation model is currently unavailable or not found.";
      } else {
        errorMessage = error.message; // Use the error's message directly if it's descriptive
      }
    }
    // Throw a new error with a potentially more user-friendly message
    throw new Error(errorMessage);
  }
};
