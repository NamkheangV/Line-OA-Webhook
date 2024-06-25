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
        lineClient.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "audio",
              originalContentUrl:
                "https://tunes.stocktune.com/public/c/5/5/c555e234-116f-4625-b417-438256f9b854/whimsical-midnight-cat-ballet-stocktune.mp3",
              duration: 1000 * 60 * 97,
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
      } else if (text === "แฟล็ก") {
        lineClient.replyMessage({
          replyToken: event.replyToken,
          messages: [
            {
              type: "flex",
              altText: "This is a Flex Message",
              contents: {
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
              },
            },
          ],
        });
      }
    }
  }

  res.status(200).end();
};
