import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey: string = process.env.GEMINI_API_KEY!;

const genAI = new GoogleGenerativeAI(apiKey);
const baseModel = genAI.getGenerativeModel({ model: "gemini" });
const proModel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

export const generateText = async (prompt: string) => {
  const result = await baseModel.generateContent(prompt);
  return result.response.text;
};

export const readImage = async (image: string) => {
  const prompt = "ช่วยบรรยายภาพนี้ใcห้หน่อย";
  const mimeType = "image/png";

  // Convert image binary to a GoogleGenerativeAI.Part object.
  const imageParts = [
    {
      inlineData: {
        data: Buffer.from(image, "binary").toString("base64"),
        mimeType,
      },
    },
  ];
  const result = await proModel.generateContent([prompt, ...imageParts]);
  return result.response.text;
};

export const chat = async (prompt: string) => {
  const chat = baseModel.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "สวัสดีจ้า" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "I am an expert in Amway products. My name is 'Am'. You can ask me anything! about Amway products.",
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text;
};

export const chatWithOwnData = async (prompt: string) => {
  const response = fetch("https://api.example.com/data").then((res) =>
    res.json()
  );
  let information = await response;
  information = JSON.stringify(information);

  const chat = baseModel.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "สวัสดีจ้า" }],
      },
      {
        role: "model",
        parts: [
          {
            text:
              "Answer the question using the text below. Respond with only the text provided. If you cannot answer, you must answer ขออภัยครับ ไม่พบข้อมูลดังกล่าว \nQuestion: " +
              prompt +
              "\nText: " +
              information,
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text;
};
