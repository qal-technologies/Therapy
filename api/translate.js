export default async function handler(req, res) {
    const { text, target, sourceLang } = req.query;

    try {
        const r = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
        );
        const data = await r.json();
        res.status(200).json({ translated: data[0].map(item => item[0]).join("") });
    } catch (e) {
        res.status(500).json({ error: "Translation failed" });
    }
}
