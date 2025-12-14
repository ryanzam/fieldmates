export interface TeamMember {
    _id?: string;
    name: string;
    role: string;
    status: 'active' | 'idle' | 'offline';
    avatar?: string;
    location: {
        lat: number;
        lng: number;
        accuracy?: number;
        heading?: number;
        speed?: number;
    };
    lastUpdate: string;
    deviceId?: string;
    batteryLevel?: number;
}

export interface Geofence {
    _id?: string;
    name: string;
    type: 'circle' | 'polygon';
    color: string;
    center?: { lat: number; lng: number };
    radius?: number; // meters, for circle type
    coordinates?: Array<{ lat: number; lng: number }>; // for polygon type
    triggers?: {
        onEnter?: GeofenceTrigger[];
        onExit?: GeofenceTrigger[];
    };
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GeofenceTrigger {
    type: 'start_timer' | 'stop_timer' | 'assign_job' | 'send_notification' | 'log_entry';
    config?: Record<string, unknown>;
}

export interface Pin {
    _id?: string;
    type: 'issue' | 'completed' | 'note' | 'photo';
    title: string;
    description?: string;
    location: {
        lat: number;
        lng: number;
    };
    photos?: string[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    status?: 'open' | 'in_progress' | 'resolved';
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
}

export interface MongoDBResponse<T> {
    document?: T;
    documents?: T[];
    insertedId?: string;
    matchedCount?: number;
    modifiedCount?: number;
    deletedCount?: number;
}

export interface MongoDBFilter {
    [key: string]: unknown;
}