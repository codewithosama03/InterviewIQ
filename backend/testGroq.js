import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY,
});

async function testAI() {
try {
const response = await groq.chat.completions.create({
messages: [
{
role: "user",
content: "Say hello",
},
],
model: "openai/gpt-oss-120b",
});


console.log("Groq response:", response.choices[0].message.content);


} catch (error) {
console.error("Groq error:", error.status, error.message);
}
}

testAI();
