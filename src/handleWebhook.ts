import { Request, Response } from "express";
import { lineClient } from "..";
import { Client } from "./client";
export const handleWebhook = (req: Request, res: Response) => {
  const event = req.body.events[0];
  if (!event) return res.status(200).end();
  const client = new Client(event.replyToken);
  if (event.type === "message") {
    const message = event.message;
    if (message.type === "text") {
      const text = message.text;
      if (text === "ข้อความ") {
        client.text("สวัสดีครับ");
      } else if (text === "สติ๊กเกอร์") {
        client.sticker("1", "1");
      } else if (text === "รูปภาพ") {
        client.image(
          "https://i.pinimg.com/736x/12/56/00/1256000a71e6e0fbcd09c8505529889f.jpg",
          "https://i.pinimg.com/736x/12/56/00/1256000a71e6e0fbcd09c8505529889f.jpg"
        );
      } else if (text === "ที่อยู่") {
        lineClient.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "location",
              title: "มหาวิทยาลัยรังสิต",
              address:
                "52 347 ถ. พหลโยธิน ตำบล หลักหก อำเภอเมืองปทุมธานี ปทุมธานี 12000",
              // 13.964310381829296, 100.5866290791515
              latitude: 13.964310381829296,
              longitude: 100.5866290791515,
            },
          ],
        });
      } else if (text === "วีดีโอ") {
        lineClient.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "video",
              originalContentUrl:
                "https://download.samplelib.com/mp4/sample-5s.mp4",
              previewImageUrl:
                "https://download.samplelib.com/mp4/sample-5s.mp4",
            },
          ],
        });
      } else if (text === "เสียง") {
        client.audio(
          "https://tunes.stocktune.com/public/c/5/5/c555e234-116f-4625-b417-438256f9b854/whimsical-midnight-cat-ballet-stocktune.mp3",
          1000 * 60 * 97
        );
      } else if (text === "คอนเฟิร์ม") {
        client.confirm({
          type: "confirm",
          text: "Do you want to save?",
          actions: [
            {
              type: "message",
              label: "Yes",
              text: "yes",
            },
            {
              type: "message",
              label: "No",
              text: "no",
            },
          ],
        });
      } else if (text === "แฟล็ก") {
        client.flex({
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "Hello,",
              },
              {
                type: "text",
                text: "World!",
              },
            ],
          },
        });
      } else if (text === "เทมเพลต") {
        client.template({
          type: "template",
          altText: "this is a confirm template",
          template: {
            type: "buttons",
            text: "Select Menu",
            actions: [
              {
                type: "message",
                label: "Buy",
                text: "Buy",
              },
              {
                type: "message",
                label: "Add to cart",
                text: "Add to cart",
              },
              {
                type: "message",
                label: "View cart",
                text: "View cart",
              },
            ],
          },
        });
      } else {
        client.text("ม่ายเข้าจายโว๊ย🤬");
      }
    }
  }

  res.status(200).end();
};
