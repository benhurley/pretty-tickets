import type { Handler, HandlerEvent } from "@netlify/functions";
import { generateText, withOpenAIErrors } from "../lib/openai";

const INSTRUCTIONS =
    "You are designing a digital ticket for an upcoming event. The ticket will be gifted virtually to a friend and can include a small gift message as part of it. Use event data to draft a message that the gift giver can use. Rules: Keep it to around 50 words, voice the message as if you are casually talking to a close friend, don't use salutations or signatures in the message, and don't restate all of the event info. Reply with the message text only.";

const handler: Handler = async (event: HandlerEvent) => {
    const params = event.queryStringParameters ?? {};
    const eventName = params.eventName;

    if (!eventName) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Event Name is missing in the query parameters." }),
        };
    }

    const details = [eventName, params.eventSubtitle, params.eventDescription, params.eventDate, params.eventVenue]
        .filter(Boolean)
        .join(" ");

    return withOpenAIErrors(async () => {
        const message = await generateText({
            instructions: INSTRUCTIONS,
            // Limit user-controlled input length
            input: `Event Details: ${details}`.slice(0, 500),
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: message.trim() }),
        };
    });
};

export { handler };
