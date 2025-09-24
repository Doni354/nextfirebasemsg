/* eslint-disable @typescript-eslint/no-require-imports */

const cors = require("cors")({ origin: true });
const { onRequest } = require("firebase-functions/v2/https");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const fetch = require("node-fetch"); // 👈 penting

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = getFirestore();


exports.generateAIResponse = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { chatId, questionId, aiDocId, userText } = req.body;

      if (!chatId || !questionId || !aiDocId) {
        return res.status(400).json({ error: "chatId, questionId, aiDocId required" });
      }

      // 🔥 Call Flowise API dengan memory (sessionId) + overrideConfig
      const flowiseResponse = await fetch(
        "https://cloud.flowiseai.com/api/v1/prediction/749e7ed0-91eb-4a08-93eb-354c36a31c9d",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: userText,
            overrideConfig: {
              sessionId: chatId,
              temperature: 0.9,
              streaming: false // true kalau mau streaming
            }
          }),
        }
      );

      const aiResult = await flowiseResponse.json();
      const aiText = aiResult.text || JSON.stringify(aiResult);

      await db.collection("messages").doc(aiDocId).update({
        text: aiText,
        isLoading: false,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.json({ success: true, aiText });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  });
});

