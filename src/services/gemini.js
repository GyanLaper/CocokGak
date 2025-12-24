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
      Anda adalah seorang kritikus fashion profesional dan "pedas" dari "CocokGak!".
      Konteks: Pengguna ingin bergaya "${style}".
      Pengguna telah mengunggah ${items.length} item pakaian.
      
      Tugas Anda:
      1. Deteksi apakah gambar yang diunggah mengandung elemen pakaian/fashion.
         - Jika TIDAK ADA pakaian (misal: gambar kursi, wajah saja, atau benda lain):
           Kembalikan JSON dengan:
           - rating: "-/5" (String)
           - review: "Maaf, saya tidak melihat pakaian di sini. Apakah Anda yakin ini outfit?"
           - tips: "-"

      2. Jika ADA pakaian, berikan penilaian Kritis dan Jujur:
         - Berikan **Rating** dalam skala **0 - 5** (Boleh desimal, contoh: 3.5, 4.2).
         - **Personality**: Kritikus yang punya standar tinggi. Jangan ragu memberi nilai rendah jika memang tidak cocok.

      3. Aturan Output (Logic):
         - **Jika Rating > 4.5**: Bagian "tips" HANYA boleh berisi pujian/kekaguman. Jangan berikan saran perbaikan apapun.
         - **Jika Rating <= 4.5**: Bagian "tips" HARUS berisi saran konkret dan actionable untuk memperbaiki outfit.
      
      Format Output JSON (HANYA JSON):
      {
        "rating": 4.2, // atau "-/5" jika tidak ada pakaian
        "review": "Jujur saja, warnanya agak bertabrakan...",
        "tips": "Coba ganti..." // atau pujian jika rating > 4.5
      }
      Jangan gunakan format markdown.
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

