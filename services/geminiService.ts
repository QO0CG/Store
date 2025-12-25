
import { GoogleGenAI } from "@google/genai";

// Always initialize strictly with the process.env.API_KEY named parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartProductInsight = async (productName: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a short, 2-sentence "Why you'll love this" pitch for a product named "${productName}". 
                Context: ${description}. Make it sound modern, luxury, and persuasive.`,
      config: {
        temperature: 0.7,
      }
    });
    // Directly access the .text property from the GenerateContentResponse object.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

export const getSearchSuggestions = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Act as a search assistant for an e-commerce store. User typed: "${query}". 
                Return a comma-separated list of 3 similar product search terms.`,
      config: {
        temperature: 0.2,
      }
    });
    // Directly access the .text property from the GenerateContentResponse object.
    return response.text?.split(',').map(s => s.trim()) || [];
  } catch (error) {
    return [];
  }
};
