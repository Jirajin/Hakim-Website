import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
// Access your API key (see "Set up your API key" above)
const API_KEY = "AIzaSyC-unqSVFMw76nxpAzTSsGID-wSL2UXMXk";
const genAI = new GoogleGenerativeAI(API_KEY);


const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");



async function generate() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const userInput = promptInput.value;

  // Construct the prompt using template literals and string interpolation
    const prompt = `3 arguments for ${userInput}.`;
  
    const result = await model.generateContentStream(prompt);
    const response = await result.response;
    const text = response.text();

    const markdown = marked(text);

    resultText.innerHTML = markdown; // Set innerHTML to display formatted text
    console.log(markdown);
  }
  

  promptInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      generate();
    }
  });
  generateBtn.addEventListener("click", generate);
  stopBtn.addEventListener("click", stop);