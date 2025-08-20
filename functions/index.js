/* eslint-disable @typescript-eslint/no-require-imports */
const cors = require("cors")({ origin: true });
const { onRequest } = require("firebase-functions/v2/https");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");

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

      // 🔥 Dummy response dalam format Markdown
      const dummyResponse = `# 🤖 Dummy AI Response
Halo, ini **dummy jawaban** dari Cloud Function (Gen 2).

---

## 📦 Data yang diterima
| Field       | Value |
|-------------|-------|
| **chatId**  | \`${chatId}\` |
| **questionId** | \`${questionId}\` |
| **aiDocId** | \`${aiDocId}\` |
| **userText** | "${userText}" |

---

## 🔤 Format Demo
- **Bold**
- *Italic*
- ~~Strikethrough~~
- [Link](https://firebase.google.com)
- \`inline code\`

---

## 📋 Checklist
- [x] Firestore update berhasil
- [ ] Integrasi OpenAI (next step)

---

## 🖥️ Code Example
\`\`\`js
function reply(input) {
  return "Halo, " + input + "!";
}
console.log(reply("${userText}"));
\`\`\`

---

> "Belajar Cloud Functions itu asik 🚀"
`;

      // Update dokumen AI placeholder
      await db.collection("messages").doc(aiDocId).update({
        text: dummyResponse,
        isLoading: false,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  });
});
