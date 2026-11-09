import type { Handler, HandlerEvent } from "@netlify/functions";
import { generateText, withOpenAIErrors } from "../lib/openai";
import { getFonts } from "../../src/helpers/fonts";

// Must match the `name` values in src/helpers/textures.ts (that file imports images, so it can't be bundled here).
const TEXTURES = ["Linen", "Horizontal Lines", "Vertical Lines", "Recycled", "Weathered", "Wrinkled", "Marble", "Wood"];
const FONTS = getFonts().map((f) => f.value);

const INSTRUCTIONS =
    "You are designing a digital ticket for an upcoming event. The ticket will be gifted virtually to a friend. Use the event data to choose neutral and aesthetically pleasing styles for the virtual ticket: light pastel colors for the ticket background, and a font color with strong contrast against it (at least a WCAG AA 4.5:1 contrast ratio). Pick a texture and font that suit the event.";

const SCHEMA = {
    name: "ticket_design",
    schema: {
        type: "object",
        properties: {
            ticket_color: { type: "string", description: "Ticket background color as a 6-digit hex code, e.g. #F6E7D8" },
            font_color: { type: "string", description: "Font color as a 6-digit hex code, e.g. #2B2B2B" },
            texture: { type: "string", enum: TEXTURES },
            font: { type: "string", enum: FONTS },
        },
        required: ["ticket_color", "font_color", "texture", "font"],
        additionalProperties: false,
    },
};

const handler: Handler = async (event: HandlerEvent) => {
    const params = event.queryStringParameters ?? {};
    const eventName = params.eventName;

    if (!eventName) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Event Name is missing in the query parameters." }),
        };
    }

    const details = [params.eventType, eventName, params.eventSubtitle, params.eventDescription, params.eventVenue]
        .filter(Boolean)
        .join(" ");

    return withOpenAIErrors(async () => {
        const design = await generateText({
            instructions: INSTRUCTIONS,
            // Limit user-controlled input length
            input: `Event Details: ${details}`.slice(0, 500),
            schema: SCHEMA,
        });

        return {
            statusCode: 200,
            body: design,
        };
    });
};

export { handler };
