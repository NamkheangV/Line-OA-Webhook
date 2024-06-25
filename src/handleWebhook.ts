import { Request, Response } from "express";
import { lineClient } from "..";
export const handleWebhook = (req: Request, res: Response) => {
  const event = req.body.events[0];
  if (!event) return res.status(200).end();
  if (event.type === "message") {
    const message = event.message;
    if (message.type === "text") {
      const text = message.text;
      if (text === "ข้อความ") {
        lineClient.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "text",
              text: "Hello World!",
            },
          ],
        });
      } else if (text === "สติ๊กเกอร์") {
        lineClient.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "sticker",
              packageId: "1",
              stickerId: "1",
            },
          ],
        });
      } else if (text === "รูปภาพ") {
        lineClient.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "image",
              originalContentUrl:
                "https://i.pinimg.com/736x/12/56/00/1256000a71e6e0fbcd09c8505529889f.jpg",
              previewImageUrl:
                "https://i.pinimg.com/736x/12/56/00/1256000a71e6e0fbcd09c8505529889f.jpg",
            },
          ],
        });
      } else if (text === "คอนเฟิร์ม") {
        lineClient.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "template",
              altText: "this is a confirm template",
              template: {
                type: "confirm",
                text: "Are you sure?",
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
              },
            },
          ],
        });
      }
    }
  }

  res.status(200).end();
};
