

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
 // const apiKey = process.env.GEMINI_API_KEY;
 const MODEL_NAME = "gemini-1.0-pro";
  const API_KEY = "AIzaSyAPKNfJ2xy3ou4ACWZ_v80JZ-KRyYWjXVE"
  
  
  async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({model: MODEL_NAME });
  
  
  const generationConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
  };
  
   const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT, 
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, 
      }, 
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, 
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, 
      }, 
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, 
      }, 
     
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings, 
      history: [

      ],
    })
  
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();
  }
  
   export default runChat;