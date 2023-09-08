type queryParams = {
    eventName: string,
    eventSubtitle: string,
    eventDescription: string,
    eventDate: string,
    eventTime: string,
    eventVenue: string
};

type fetchGiftMessageProps = {
    [key in keyof queryParams]?: string | undefined;
};

export async function fetchGiftMessage({
    eventName,
    eventSubtitle,
    eventDescription,
    eventDate,
    eventTime,
    eventVenue,
}: fetchGiftMessageProps): Promise<string> {
    const functionName = "fetchGiftMessage";
    const baseURL = `${window.location.origin}/.netlify/functions/${functionName}`;

    const queryParams = new URLSearchParams();
    queryParams.set('eventName', eventName || "");
    queryParams.set('eventSubtitle', eventSubtitle || "");
    queryParams.set('eventDescription', eventDescription || "");
    queryParams.set('eventDate', eventDate || "");
    queryParams.set('eventTime', eventTime || "");
    queryParams.set('eventVenue', eventVenue || "");

    const url = `${baseURL}?${queryParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.message) {
        return data.message;
    } else {
        throw new Error(data.error);
    }
}

export type TicketDesignResponse = {
    ticket_color: string,
    font_color: string,
    texture: string,
    font: string,
}

export async function fetchTicketDesign({
    eventName,
    eventSubtitle,
    eventDescription,
    eventDate,
    eventTime,
    eventVenue,
}: fetchGiftMessageProps): Promise<TicketDesignResponse> {
    const functionName = "fetchTicketDesign";
    const baseURL = `${window.location.origin}/.netlify/functions/${functionName}`;

    const queryParams = new URLSearchParams();
    queryParams.set('eventName', eventName || "");
    queryParams.set('eventSubtitle', eventSubtitle || "");
    queryParams.set('eventDescription', eventDescription || "");
    queryParams.set('eventDate', eventDate || "");
    queryParams.set('eventTime', eventTime || "");
    queryParams.set('eventVenue', eventVenue || "");

    const url = `${baseURL}?${queryParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data) {
        return data;
    } else {
        throw new Error(data.error);
    }
}
