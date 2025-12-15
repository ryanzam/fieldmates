import type { Geofence, TeamMember } from '@/types/mongodb';
import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { getGeofenceCenter, getGeofenceId, getGeofencePolygonCoords, getMemberCoords, getMemberId, STATUS_COLORS } from '@/utils';

interface RealtimeMapProps {
    className?: string;
    teamMembers: TeamMember[];
    geofences: Geofence[];
    selectedMember: string | null;
    onMemberSelect: (id: string | null) => void;
}

const RealtimeMap = ({
    className = '',
    teamMembers,
    geofences,
    selectedMember,
    onMemberSelect
}: RealtimeMapProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const markers = useRef<Map<string, maplibregl.Marker>>(new Map());

    // Initialize map
    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        // Calculate center from team members or use default
        const center = teamMembers.length > 0
            ? [
                teamMembers.reduce((sum, m) => sum + m.location.lng, 0) / teamMembers.length,
                teamMembers.reduce((sum, m) => sum + m.location.lat, 0) / teamMembers.length
            ] as [number, number]
            : [-98.5, 29.45] as [number, number]; // San Antonio default

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: {
                version: 8,
                sources: {
                    'osm-tiles': {
                        type: 'raster',
                        tiles: [
                            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        ],
                        tileSize: 256,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }
                },
                layers: [
                    {
                        id: 'osm-tiles-layer',
                        type: 'raster',
                        source: 'osm-tiles',
                        minzoom: 0,
                        maxzoom: 19
                    }
                ]
            },
            center: center,
            zoom: 12
        });

        map.current.addControl(
            new maplibregl.NavigationControl({ visualizePitch: true }),
            'top-right'
        );

        map.current.addControl(
            new maplibregl.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                trackUserLocation: true
            })
        );

        map.current.addControl(new maplibregl.ScaleControl(), 'bottom-right');

        return () => {
            markers.current.forEach(marker => marker.remove());
            markers.current.clear();
            map.current?.remove();
            map.current = null;
        };
    }, []);

    // Update geofences
    useEffect(() => {
        if (!map.current) return;

        const mapInstance = map.current;

        const addGeofences = () => {
            // Remove existing geofence layers and sources
            geofences.forEach(gf => {
                const gfId = getGeofenceId(gf);
                if (mapInstance.getLayer(`geofence-${gfId}-fill`)) {
                    mapInstance.removeLayer(`geofence-${gfId}-fill`);
                }
                if (mapInstance.getLayer(`geofence-${gfId}-outline`)) {
                    mapInstance.removeLayer(`geofence-${gfId}-outline`);
                }
                if (mapInstance.getSource(`geofence-${gfId}`)) {
                    mapInstance.removeSource(`geofence-${gfId}`);
                }
            });

            // Add new geofences
            geofences.forEach(geofence => {
                const gfId = getGeofenceId(geofence);
                let coordinates: number[][];

                if (geofence.type === 'circle' && geofence.radius) {
                    const center = getGeofenceCenter(geofence);
                    if (!center) return;
                    coordinates = createCirclePolygon(center, geofence.radius);
                } else if (geofence.type === 'polygon') {
                    const polyCoords = getGeofencePolygonCoords(geofence);
                    if (!polyCoords) return;
                    coordinates = polyCoords;
                } else {
                    return;
                }

                mapInstance.addSource(`geofence-${gfId}`, {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: { name: geofence.name },
                        geometry: {
                            type: 'Polygon',
                            coordinates: [coordinates]
                        }
                    }
                });

                mapInstance.addLayer({
                    id: `geofence-${gfId}-fill`,
                    type: 'fill',
                    source: `geofence-${gfId}`,
                    paint: {
                        'fill-color': geofence.color,
                        'fill-opacity': 0.15
                    }
                });

                mapInstance.addLayer({
                    id: `geofence-${gfId}-outline`,
                    type: 'line',
                    source: `geofence-${gfId}`,
                    paint: {
                        'line-color': geofence.color,
                        'line-width': 2,
                        'line-dasharray': [2, 2]
                    }
                });
            });
        };

        if (mapInstance.isStyleLoaded()) {
            addGeofences();
        } else {
            mapInstance.on('load', addGeofences);
        }
    }, [geofences]);

    // Update team member markers
    useEffect(() => {
        if (!map.current) return;

        const currentMarkerIds = new Set(markers.current.keys());
        const newMemberIds = new Set(teamMembers.map(m => getMemberId(m)));

        // Remove markers for members no longer present
        currentMarkerIds.forEach(id => {
            if (!newMemberIds.has(id)) {
                markers.current.get(id)?.remove();
                markers.current.delete(id);
            }
        });

        // Update or create markers
        teamMembers.forEach(member => {
            const memberId = getMemberId(member);
            const existingMarker = markers.current.get(memberId);
            const coords = getMemberCoords(member);

            if (existingMarker) {
                // Update position
                existingMarker.setLngLat(coords);
                // Update marker element
                const el = existingMarker.getElement();
                updateMarkerElement(el, member, selectedMember === memberId);
            } else {
                // Create new marker
                const el = createMarkerElement(member, selectedMember === memberId);

                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    onMemberSelect(memberId === selectedMember ? null : memberId);
                });

                const speed = member.location.speed || 0;
                const battery = member.batteryLevel || 0;

                const popup = new maplibregl.Popup({
                    offset: 25,
                    closeButton: false,
                    closeOnClick: false
                }).setHTML(`
          <div style="padding: 8px; min-width: 150px;">
            <div style="font-weight: 600; margin-bottom: 4px;">${member.name}</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 8px;">${member.role}</div>
            <div style="display: flex; gap: 12px; font-size: 11px; color: #888;">
              <span>📍 ${speed > 0 ? `${speed} mph` : 'Stationary'}</span>
              <span>🔋 ${battery}%</span>
            </div>
          </div>
        `);

                const marker = new maplibregl.Marker({ element: el })
                    .setLngLat(coords)
                    .setPopup(popup)
                    .addTo(map.current!);

                el.addEventListener('mouseenter', () => marker.getPopup().addTo(map.current!));
                el.addEventListener('mouseleave', () => marker.getPopup().remove());

                markers.current.set(memberId, marker);
            }
        });
    }, [teamMembers, selectedMember, onMemberSelect]);

    // Fly to selected member
    useEffect(() => {
        if (!map.current || !selectedMember) return;

        const member = teamMembers.find(m => getMemberId(m) === selectedMember);
        if (member) {
            map.current.flyTo({
                center: getMemberCoords(member),
                zoom: 15,
                duration: 1000
            });
        }
    }, [selectedMember, teamMembers]);

    return (
        <div className={`relative ${className}`}>
            <div ref={mapContainer} className="absolute inset-0" />
        </div>
    );
}

function createMarkerElement(member: TeamMember, isSelected: boolean): HTMLDivElement {
    const el = document.createElement('div') as HTMLDivElement;
    updateMarkerElement(el, member, isSelected);
    return el;
}

function updateMarkerElement(el: HTMLElement, member: TeamMember, isSelected: boolean): void {
    const color = STATUS_COLORS[member.status];
    const size = isSelected ? 44 : 36;
    const pulseSize = isSelected ? 60 : 48;

    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.cursor = 'pointer';
    el.style.position = 'relative';

    const initials = member.name.split(' ').map(n => n[0]).join('');

    el.innerHTML = `
    <div style="
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      ${member.status === 'active' ? `
        <div style="
          position: absolute;
          width: ${pulseSize}px;
          height: ${pulseSize}px;
          border-radius: 50%;
          background: ${color};
          opacity: 0.3;
          animation: pulse 2s ease-out infinite;
        "></div>
      ` : ''}
      <div style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: ${isSelected ? '14px' : '12px'};
        font-weight: 600;
        transition: all 0.2s;
      ">
        ${initials}
      </div>
    </div>
    <style>
      @keyframes pulse {
        0% { transform: scale(0.8); opacity: 0.5; }
        100% { transform: scale(1.5); opacity: 0; }
      }
    </style>
  `;
}

function createCirclePolygon(center: [number, number], radiusMeters: number): number[][] {
    const points = 64;
    const coordinates: number[][] = [];
    const distanceX = radiusMeters / (111320 * Math.cos((center[1] * Math.PI) / 180));
    const distanceY = radiusMeters / 110540;

    for (let i = 0; i < points; i++) {
        const angle = (i * 360) / points;
        const radians = (angle * Math.PI) / 180;
        coordinates.push([
            center[0] + distanceX * Math.cos(radians),
            center[1] + distanceY * Math.sin(radians)
        ]);
    }
    coordinates.push(coordinates[0]); // Close the polygon

    return coordinates;
}


export default RealtimeMap