
import { GoogleGenAI } from "@google/genai";
import type { PortfolioData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const createPrompt = (data: PortfolioData): string => {
  const { basicInfo, skills, experience, projects, design } = data;

  return `
    You are an expert web developer and designer AI. Your task is to generate a complete, single, self-contained 'index.html' file for a personal portfolio website based on the user's provided data.

    **CRITICAL INSTRUCTIONS:**
    1.  **Single File Output:** The entire output must be a single HTML file. No separate CSS or JS files.
    2.  **Tailwind CSS:** Use Tailwind CSS for all styling. You MUST include the Tailwind CSS CDN script in the <head>: <script src="https://cdn.tailwindcss.com"></script>.
    3.  **Self-Contained:** All assets must be embedded. The profile picture is provided as a Base64 string and MUST be embedded using a data URI (e.g., <img src="data:image/jpeg;base64,${basicInfo.profilePicture}" ...>). All JavaScript must be in a <script> tag at the end of the <body>.
    4.  **Content Personalization:** Do not use placeholder text. Use the provided data to populate all sections. You can creatively and professionally rephrase descriptions for projects and experiences to make them more impactful.
    5.  **Responsiveness:** The website must be fully responsive and look great on all screen sizes (mobile, tablet, desktop).
    6.  **Design Preferences:** Strictly adhere to the user's design choices:
        *   Theme: ${design.theme}
        *   Primary Color Scheme: ${design.colorScheme} (Apply this to links, buttons, headers, etc. Be creative with shades.)
        *   Layout: ${design.layout} (For 'one-page', create sections with smooth scrolling. For 'multi-page', this is a single HTML file, so simulate it with sections and a navigation bar that jumps to them).
    7.  **Code Quality:** Generate clean, semantic, and accessible HTML. Add subtle animations and hover effects to make the site feel modern and dynamic.
    8.  **NO COMMENTS OR EXPLANATIONS:** Your response MUST be ONLY the raw HTML code, starting with <!DOCTYPE html> and ending with </html>. Do not wrap it in markdown backticks or any other text.

    **USER DATA:**

    **Basic Info:**
    *   Name: ${basicInfo.name}
    *   Title: ${basicInfo.title}
    *   Bio: ${basicInfo.bio}
    *   Profile Picture (Base64): ${basicInfo.profilePicture ? 'Yes, included in data URI.' : 'No picture provided.'}

    **Skills:**
    *   Technical: ${skills.technical.join(', ')}
    *   Tools: ${skills.tools.join(', ')}
    *   Soft Skills: ${skills.soft.join(', ')}

    **Experience:**
    ${experience.map(exp => `
    *   Company: ${exp.company}
        *   Role: ${exp.role}
        *   Dates: ${exp.startDate} - ${exp.endDate}
        *   Description: ${exp.description}
    `).join('')}

    **Projects:**
    ${projects.map(proj => `
    *   Title: ${proj.title}
        *   Description: ${proj.description}
        *   GitHub: ${proj.githubLink || 'N/A'}
        *   Live Demo: ${proj.demoLink || 'N/A'}
    `).join('')}

    Now, generate the complete 'index.html' file.
  `;
};

export const generatePortfolio = async (data: PortfolioData): Promise<string> => {
  try {
    const prompt = createPrompt(data);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // The Gemini API may wrap the code in markdown, so we need to clean it.
    let htmlContent = response.text;
    if (htmlContent.startsWith('```html')) {
        htmlContent = htmlContent.substring(7);
    }
    if (htmlContent.endsWith('```')) {
        htmlContent = htmlContent.substring(0, htmlContent.length - 3);
    }

    return htmlContent.trim();
  } catch (error) {
    console.error("Error generating portfolio with Gemini:", error);
    throw new Error("Failed to generate portfolio. The AI model might be overloaded. Please try again later.");
  }
};
