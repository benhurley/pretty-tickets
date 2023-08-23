type TinyUrlResponse = {
    data: {
        domain: string;
        alias: string;
        deleted: boolean;
        archived: boolean;
        analytics: {
            enabled: boolean;
            public: boolean;
        };
        tags: string[];
        created_at: string;
        expires_at: null | string;
        tiny_url: string;
        url: string;
    };
    code: number;
    errors: string[];
};

export const fetchTinyURL = async (): Promise<TinyUrlResponse | null> => {
    const requestBody = {
        url: window.location.href.replace("creatorMode", "recipientMode"),
    };

    try {
        const response = await fetch('https://api.tinyurl.com/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_TINYURL_API_KEY}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Error shortening URL:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }

    return null;
};
