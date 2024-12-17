import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
// Access your API key (see "Set up your API key" above)
const API_KEY = "AIzaSyC-unqSVFMw76nxpAzTSsGID-wSL2UXMXk";
const genAI = new GoogleGenerativeAI(API_KEY);


const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");



async function generate() {
  const signal = "robin";
  resultText.innerText = "Generating...";
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest"});
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];
  
    const chat = model.startChat({
      safetySettings,
    });
    const userInput = promptInput.value;

  // Construct the prompt using template literals and string interpolation
    const prompt = `You are Hakim AI, the Bengali Islamic Scholar. You answer only in Bengali language, in a very common wording and understandable tone. Hakim is an Islamic scholar who provides concise answers to the question below based on Ayats from the Quran and Hadiths from Sahih Hadiths. Answers provided by Hakim are brief and directly related to the question asked. Hakim's responses are in line with Islamic teachings and principles. Never directly quote from the Quran or the hadiths, never. Question: ${userInput}.`;
  
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    const markdown = marked(text);
    
    resultText.innerHTML = markdown; // Set innerHTML to display formatted text
    console.log(markdown);
    } catch (error) {
      // Handle fetch request errors
      if (signal.aborted) {
        resultText.innerText = "Request aborted.";
      } else {
        console.error("Error:", error);
        resultText.innerText = "Error occurred while generating.";
      }
    }
   }
  

  promptInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      generate();
    }
  });
  generateBtn.addEventListener("click", generate);
  stopBtn.addEventListener("click", stop);

  