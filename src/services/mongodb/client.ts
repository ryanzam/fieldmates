const MONGODB_API_URL = import.meta.env.VITE_MONGODB_URL || '';

type MongoAction = 'findOne' | 'find' | 'insertOne' | 'insertMany' | 'updateOne' | 'updateMany' | 'deleteOne' | 'deleteMany';

interface MongoRequest {
    collection: string;
    filter?: Record<string, unknown>;
    document?: Record<string, unknown>;
    documents?: Record<string, unknown>[];
    update?: Record<string, unknown>;
    projection?: Record<string, unknown>;
    sort?: Record<string, number>;
    limit?: number;
    skip?: number;
}

export async function mongoRequest<T>(
    action: MongoAction,
    request: MongoRequest
): Promise<T> {
    if (!MONGODB_API_URL) {
        throw new Error('MongoDB Url is not configured. Set environment variables.');
    }
    const response = await fetch(`${MONGODB_API_URL}/action/${action}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...request,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`MongoDB API error: ${response.status} - ${error}`);
    }

    return response.json();
}