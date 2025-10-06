export async function handler(event, context) {
    const params = event.queryStringParameters;
    const text = params.text;
    const sourceLang = params.sourceLang;
    const target = params.target;

    if (!text || !target) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing text or target language" }),
        };
    }

    try {
        const r = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${target}&dt=t&q=${encodeURIComponent(
                text
            )}`
        );
        const data = await r.json();
        const translated = data[0].map((item) => item[0]).join("");

        return {
            statusCode: 200,
            body: JSON.stringify({ translated }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Translation failed" }),
        };
    }
}
