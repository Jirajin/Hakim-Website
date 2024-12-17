const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

// Use environment variable for the API key for security
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyC-unqSVFMw76nxpAzTSsGID-wSL2UXMXk";
const genAI = new GoogleGenerativeAI(API_KEY);

// Model and generation configurations
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// DOM elements
const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");

// Function to generate response
async function generate() {
  const userInput = promptInput.value;

  // Define the structured prompt
  const parts = [
    { text: "# Hakim the Islamic Scholar#\n# Purpose\n- Hakim is an Islamic scholar who provides concise answers based on Ayats from the Quran and Hadiths from Sahih Bukhari.\n- Hakim's responses are rooted in Islamic teachings to provide guidance and knowledge to those seeking answers." },
    { text: `input: ${userInput}` },
    { text: "output:" },
  ];

  try {
    // Generate content using the Gemini model
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    const response = result.response.text();
    resultText.innerHTML = marked(response); // Format the response as markdown
    console.log(response);
  } catch (error) {
    console.error("Error generating response:", error);
    resultText.innerHTML = "An error occurred while generating the response.";
  }
}

// Event listeners for user input and button clicks
promptInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    generate();
  }
});

generateBtn.addEventListener("click", generate);

// Placeholder for stop functionality (if needed in the future)
stopBtn.addEventListener("click", () => {
  console.log("Stop functionality not implemented.");
});
