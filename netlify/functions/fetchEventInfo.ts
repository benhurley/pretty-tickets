import type { Handler, HandlerEvent } from "@netlify/functions";
import { generateText, withOpenAIErrors } from "../lib/openai";

const INSTRUCTIONS =
    "You are extracting data from a purchase receipt for an upcoming event. The input is raw text; parse it and return the event fields. Use an empty string for any field you can't determine.";

const field = (description: string) => ({ type: "string", description });

const SCHEMA = {
    name: "event_info",
    schema: {
        type: "object",
        properties: {
            type: field("The type of event based on context, e.g. tennis match, baseball game, concert"),
            title: field("The main event, e.g. US OPEN"),
            subtitle: field("e.g. VIP or the confirmation number"),
            description: field("e.g. Session 24 - Women's Final"),
            date: field("Event date in yyyy-mm-dd format"),
            start_time: field("Start time in strict 24-hour HH:MM format, no AM/PM"),
            end_time: field("End time in strict 24-hour HH:MM format, no AM/PM"),
            venue: field("Venue name"),
            section: field("Seating section"),
            row: field("Seating row"),
            seats: field("Seat number(s)"),
        },
        required: ["type", "title", "subtitle", "description", "date", "start_time", "end_time", "venue", "section", "row", "seats"],
        additionalProperties: false,
    },
};

const handler: Handler = async (event: HandlerEvent) => {
    const purchaseData = event.queryStringParameters?.purchaseData;

    if (!purchaseData) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Purchase Data is missing in the query parameters." }),
        };
    }

    return withOpenAIErrors(async () => {
        const eventInfo = await generateText({
            instructions: INSTRUCTIONS,
            // Limit user-controlled input length
            input: `Purchase Data: ${purchaseData}`.slice(0, 1000),
            schema: SCHEMA,
        });

        return {
            statusCode: 200,
            body: eventInfo,
        };
    });
};

export { handler };
