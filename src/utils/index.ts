import type { Geofence, TeamMember } from "@/types/mongodb";

export function getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

export const STATUS_COLORS = {
    active: '#22c55e',
    idle: '#eab308',
    offline: '#71717a'
};


export const getMemberId = (member: TeamMember): string => member._id || '';
export const getGeofenceId = (geofence: Geofence): string => geofence._id || '';

export const getMemberCoords = (member: TeamMember): [number, number] => [
    member.location.lng,
    member.location.lat
];

export const getGeofenceCenter = (geofence: Geofence): [number, number] | null => {
    if (geofence.center) {
        return [geofence.center.lng, geofence.center.lat];
    }
    return null;
};

export const getGeofencePolygonCoords = (geofence: Geofence): number[][] | null => {
    if (geofence.coordinates && geofence.coordinates.length > 0) {
        return geofence.coordinates.map(c => [c.lng, c.lat]);
    }
    return null;
};