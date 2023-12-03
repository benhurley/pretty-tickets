import type { Handler, HandlerEvent } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const purchaseData = event.queryStringParameters?.purchaseData;

    if (!purchaseData) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Purchase Data is missing in the query parameters." }),
        };
    }

    const prompt = `Purchase Data: ${purchaseData}`

    const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are extracting data from a purchase receipt for an upcoming event. The input is raw, and you must parse it to extract and return specific string values. The fields in the event schema that we need are: type (the type of event based on context e.g. tennis match, baseball game, concert), title (the main event e.g. US OPEN), subtitle (e.g. VIP or the confirmation number), description (e.g. Session 24 - Women's Final), date (yyyy-mm-dd), start_time (strict hh:mm format, military time with no AM/PM), end_time (strict hh:mm format, military time with no AM/PM), venue, section, row, and seats. You must always return your findings in an object using these values as keys if they are found.",
            },
            // Use "slice" to limit the length of the input to 1000 characters
            { role: "user", content: prompt.slice(0, 1000) },
        ],
        temperature: 1, // Scale 0-1 with 1 being most variable between submissions
    };

    // Call OpenAI's chat completions API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    const generatedMessage = data.choices[0].message.content;

    return {
        statusCode: 200,
        body: generatedMessage,
    };
};

export { handler };
