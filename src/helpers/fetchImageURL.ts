type PixabayResponse = {
    total: number;
    totalHits: number;
    hits: Array<{
        id: number;
        pageURL: string;
        type: string;
        tags: string;
        previewURL: string;
        previewWidth: number;
        previewHeight: number;
        webformatURL: string;
        webformatWidth: number;
        webformatHeight: number;
        largeImageURL: string;
        imageWidth: number;
        imageHeight: number;
        imageSize: number;
        views: number;
        downloads: number;
        collections: number;
        likes: number;
        comments: number;
        user_id: number;
        user: string;
        userImageURL: string;
    }>;
}

export const fetchImageURL = async (query: string): Promise<PixabayResponse | null> => {
    const massagedQuery = query.replace(' ', '+');

    try {
        const response = await fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${massagedQuery}&image_type=photo&orientation=horizontal&safesearch=true`, {
            method: 'GET',
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
