import { GoogleGenerativeAI } from "@google/generative-ai";

// API Key provided by user. 
// In a production app, this should be in an environment variable and calls proxied through a backend.
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Generates an outfit review based on uploaded items and selected style.
 * @param {Array} items - Array of { typeLabel, image (base64) }
 * @param {String} style - Selected style (e.g., "Casual", "Formal")
 * @returns {Promise<Object>} - { rating, review, tips }
 */
export const generateOutfitReview = async (items, style) => {
    try {
        // Prepare image parts
        const imageParts = items.map(item => {
            // Remove data:image/png;base64, prefix if present
            const base64Data = item.image.split(',')[1];
            return {
                inlineData: {
                    data: base64Data,
                    mimeType: "image/jpeg"
                }
            };
        });

        const prompt = `
      Anda adalah seorang fashion stylist dari "CocokGak!" yang sedang mereview outfit pengguna.
      Konteks: Pengguna ingin bergaya "${style}".
      Pengguna telah mengunggah ${items.length} item pakaian.
      
      Mohon berikan respons dalam Bahasa Indonesia yang santai tapi profesional:
      1. Rating (1-5 Bintang) berdasarkan keserasian outfit.
      2. Review (3-4 kalimat) yang jujur dan membangun tentang padu-padan warna dan style.
      3. Tips (2-3 kalimat) konkret untuk membuat outfit ini lebih keren (misal: "Gulung lengan kemeja", "Ganti sepatu warna putih").
      
      Kembalikan respons HANYA dalam format JSON valid seperti ini:
      {
        "rating": 4,
        "review": "Paduan warna ini cukup aman...",
        "tips": "Coba tambahkan jam tangan..."
      }
      Jangan gunakan format markdown seperti \`\`\`json.
    `;

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        const text = response.text();

        // Clean up if markdown is included
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Maaf Paduka, hamba gagal melihat busana Anda. Mohon coba lagi.");
    }
};

export const generateMannequin = async (items, style) => {
    try {
        const modelName = "gemini-2.0-flash-preview-image-generation"; // sesuai blog/docs
        const url =
            `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

        const imageParts = items.map(item => ({
            inlineData: {
                data: item.image.split(",")[1],
                mimeType: "image/jpeg",
            },
        }));

        const prompt = `
Generate a realistic, high-quality fashion catalog image:
- Subject: a mannequin wearing the provided clothing items
- Style aesthetic: "${style}"
- Pose: neutral standing pose
- Background: simple studio / abstract texture
Return an IMAGE in the response.
    `.trim();

        const body = {
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }, ...imageParts],
                },
            ],
            generationConfig: {
                responseModalities: ["IMAGE", "TEXT"], // ini kuncinya
            },
        };

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("Image-gen HTTP error:", res.status, errText);
            return null;
        }

        const data = await res.json();

        // Cari part image dari response
        const parts = data?.candidates?.[0]?.content?.parts || [];
        const imagePart = parts.find(p => p.inlineData?.data);

        if (!imagePart) {
            console.warn("No image returned. Parts:", parts);
            return null;
        }

        // Balikkan sebagai data URL biar langsung bisa dipakai di <img src="...">
        const mime = imagePart.inlineData.mimeType || "image/png";
        return `data:${mime};base64,${imagePart.inlineData.data}`;
    } catch (e) {
        console.error("Mannequin Generation Error:", e);
        return null;
    }
};

