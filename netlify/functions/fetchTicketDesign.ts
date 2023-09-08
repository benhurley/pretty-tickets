import type { Handler, HandlerEvent } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const eventName = event.queryStringParameters?.eventName
    const eventSubtitle = event.queryStringParameters?.subTitle || ""
    const eventDescription = event.queryStringParameters?.eventDescription || ""
    const eventDate = event.queryStringParameters?.eventDate || ""
    const eventTime = event.queryStringParameters?.eventTime || ""
    const eventVenue = event.queryStringParameters?.eventVenue || ""

    if (!eventName) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Event Name is missing in the query parameters." }),
        };
    }

    const prompt = `Event Details: ${eventName} ${eventSubtitle} ${eventDescription} ${eventDate} ${eventTime} ${eventVenue}`

    const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are designing a digital ticket for an upcoming event in the form of an api response. The ticket will be gifted virtually to a friend and can include a small gift message as part of it. Use event data to return the most asthetically pleasing styles for the virtual ticket (think light colors like pastels and at least 85% contrast between ticket color and font color). You will always answer in the form of a json object containing ticket_color (hex), font_color (hex), texture (Linen, Horizontal Lines, Vertical Lines, Recycled, Weathered, Wrinkled, Marble, or Wood) and font (native browser-supported fonts only).",
            },
            // Use "slice" to limit the length of the input to 500 characters
            { role: "user", content: prompt.slice(0, 500) },
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
