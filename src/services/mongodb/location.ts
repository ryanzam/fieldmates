import { mongoRequest } from './client';
import type { TeamMember, MongoDBResponse, MongoDBFilter } from '@/types/mongodb';

const COLLECTION = 'locations';

export const locationService = {

    async getAll(filter?: MongoDBFilter): Promise<TeamMember[]> {
        const response = await mongoRequest<MongoDBResponse<TeamMember>>('find', {
            collection: COLLECTION,
            filter: filter || {},
        });
        return response.documents || [];
    },

    async getById(id: string): Promise<TeamMember | null> {
        const response = await mongoRequest<MongoDBResponse<TeamMember>>('findOne', {
            collection: COLLECTION,
            filter: { _id: { $oid: id } },
        });
        return response.document || null;
    },

    async getByStatus(status: TeamMember['status']): Promise<TeamMember[]> {
        const response = await mongoRequest<MongoDBResponse<TeamMember>>('find', {
            collection: COLLECTION,
            filter: { status },
        });
        return response.documents || [];
    },

    async create(member: Omit<TeamMember, '_id'>): Promise<string> {
        const response = await mongoRequest<MongoDBResponse<TeamMember>>('insertOne', {
            collection: COLLECTION,
            document: {
                ...member,
                lastUpdate: new Date().toISOString(),
            },
        });
        return response.insertedId || '';
    },

    async updateLocation(
        id: string,
        location: TeamMember['location']
    ): Promise<boolean> {
        const response = await mongoRequest<MongoDBResponse<TeamMember>>('updateOne', {
            collection: COLLECTION,
            filter: { _id: { $oid: id } },
            update: {
                $set: {
                    location,
                    lastUpdate: new Date().toISOString(),
                },
            },
        });
        return (response.modifiedCount || 0) > 0;
    },

    async updateStatus(id: string, status: TeamMember['status']): Promise<boolean> {
        const response = await mongoRequest<MongoDBResponse<TeamMember>>('updateOne', {
            collection: COLLECTION,
            filter: { _id: { $oid: id } },
            update: {
                $set: {
                    status,
                    lastUpdate: new Date().toISOString(),
                },
            },
        });
        return (response.modifiedCount || 0) > 0;
    },

    async update(id: string, data: Partial<TeamMember>): Promise<boolean> {
        const response = await mongoRequest<MongoDBResponse<TeamMember>>('updateOne', {
            collection: COLLECTION,
            filter: { _id: { $oid: id } },
            update: {
                $set: {
                    ...data,
                    lastUpdate: new Date().toISOString(),
                },
            },
        });
        return (response.modifiedCount || 0) > 0;
    },

    async delete(id: string): Promise<boolean> {
        const response = await mongoRequest<MongoDBResponse<TeamMember>>('deleteOne', {
            collection: COLLECTION,
            filter: { _id: { $oid: id } },
        });
        return (response.deletedCount || 0) > 0;
    },

    async batchUpdateLocations(
        updates: Array<{ id: string; location: TeamMember['location'] }>
    ): Promise<number> {
        let updatedCount = 0;
        for (const update of updates) {
            const success = await this.updateLocation(update.id, update.location);
            if (success) updatedCount++;
        }
        return updatedCount;
    },
};
