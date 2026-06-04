import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function testAI() {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Say hello"
      }
    ],
    model: "llama-3.3-70b-versatile",
  });

  console.log(response.choices[0].message.content);
}

testAI();