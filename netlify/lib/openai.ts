// Shared helper for calling the OpenAI Responses API from Netlify functions.
// Lives outside netlify/functions so Netlify doesn't deploy it as its own endpoint.

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

// Small, fast, cheap tier. Override with the OPENAI_MODEL env var without a redeploy of code.
const DEFAULT_MODEL = "gpt-6-luna";

// Synchronous Netlify functions are killed at ~10s, which surfaces as a 502.
// Abort a little before that so we can return a readable error instead.
const REQUEST_TIMEOUT_MS = 9000;

type JsonSchema = Record<string, unknown>;

type GenerateOptions = {
    instructions: string;
    input: string;
    maxOutputTokens?: number;
    // When provided, the model is constrained to this JSON schema (Structured Outputs).
    schema?: { name: string; schema: JsonSchema };
};

export class OpenAIRequestError extends Error {}

type ResponsesContent = { type: string; text?: string; refusal?: string };
type ResponsesOutputItem = { type: string; content?: ResponsesContent[] };
type ResponsesBody = {
    status?: string;
    incomplete_details?: { reason?: string } | null;
    error?: { message?: string } | null;
    output?: ResponsesOutputItem[];
};

export async function generateText({ instructions, input, maxOutputTokens = 600, schema }: GenerateOptions): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new OpenAIRequestError("OPENAI_API_KEY is not set.");
    }

    const requestBody: Record<string, unknown> = {
        model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
        instructions,
        input,
        // These are simple extraction/styling tasks; skip reasoning to keep latency well under the function timeout.
        reasoning: { effort: "none" },
        max_output_tokens: maxOutputTokens,
        store: false,
    };

    if (schema) {
        requestBody.text = {
            format: { type: "json_schema", name: schema.name, schema: schema.schema, strict: true },
        };
    }

    let response: Response;
    try {
        response = await fetch(OPENAI_RESPONSES_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(requestBody),
            signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        });
    } catch (err) {
        const reason = err instanceof Error && err.name === "TimeoutError" ? "timed out" : String(err);
        throw new OpenAIRequestError(`OpenAI request failed: ${reason}`);
    }

    const data = (await response.json().catch(() => ({}))) as ResponsesBody;

    if (!response.ok) {
        throw new OpenAIRequestError(`OpenAI returned ${response.status}: ${data.error?.message ?? "unknown error"}`);
    }

    if (data.status === "incomplete") {
        throw new OpenAIRequestError(`OpenAI response incomplete: ${data.incomplete_details?.reason ?? "unknown reason"}`);
    }

    const content = (data.output ?? [])
        .filter((item) => item.type === "message")
        .flatMap((item) => item.content ?? []);

    const refusal = content.find((c) => c.type === "refusal");
    if (refusal) {
        throw new OpenAIRequestError(`OpenAI refused the request: ${refusal.refusal ?? ""}`);
    }

    const text = content
        .filter((c) => c.type === "output_text")
        .map((c) => c.text ?? "")
        .join("");

    if (!text) {
        throw new OpenAIRequestError("OpenAI returned no text output.");
    }

    return text;
}

// Wraps a function body so OpenAI failures come back as a JSON error the frontend can handle,
// instead of an unhandled exception (which Netlify reports as a bare 502).
export async function withOpenAIErrors(fn: () => Promise<{ statusCode: number; body: string }>) {
    try {
        return await fn();
    } catch (err) {
        // Full details go to the Netlify function log; keep the client-facing message generic
        // since upstream errors can include account/key details.
        console.error(err);
        return {
            statusCode: 502,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "AI generation failed. Please try again." }),
        };
    }
}
