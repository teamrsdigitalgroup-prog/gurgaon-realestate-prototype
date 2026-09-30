import type { NearbyPlace } from "./types";

/**
 * Landmarks are a property of the locality, not the individual flat, so they
 * live here and are attached to each listing at build time.
 */
export const nearbyByLocality: Record<string, NearbyPlace[]> = {
  "dlf-phase-1": [
    { name: "Sikanderpur Metro Station", category: "Metro", distanceKm: 2.6 },
    { name: "The Shri Ram School, Moulsari", category: "School", distanceKm: 1.4 },
    { name: "Artemis Hospital", category: "Hospital", distanceKm: 4.1 },
    { name: "Galleria Market", category: "Mall", distanceKm: 2.2 },
    { name: "DLF Cyber City", category: "Business Park", distanceKm: 5.3 },
  ],
  "dlf-phase-2": [
    { name: "Belvedere Towers Metro Station", category: "Metro", distanceKm: 0.9 },
    { name: "Lancers International School", category: "School", distanceKm: 2.8 },
    { name: "Columbia Asia Hospital", category: "Hospital", distanceKm: 3.4 },
    { name: "Ambience Mall", category: "Mall", distanceKm: 4.6 },
    { name: "DLF Cyber Hub", category: "Business Park", distanceKm: 1.7 },
  ],
  "dlf-phase-3": [
    { name: "Moulsari Avenue Metro Station", category: "Metro", distanceKm: 0.7 },
    { name: "Scottish High International School", category: "School", distanceKm: 3.6 },
    { name: "Park Hospital", category: "Hospital", distanceKm: 2.4 },
    { name: "DLF Cyber Hub", category: "Mall", distanceKm: 1.2 },
    { name: "DLF Cyber City", category: "Business Park", distanceKm: 1.1 },
  ],
  "dlf-phase-4": [
    { name: "Sector 54 Chowk Metro Station", category: "Metro", distanceKm: 2.1 },
    { name: "DPS Sector 45", category: "School", distanceKm: 3.2 },
    { name: "Max Hospital, Sector 19", category: "Hospital", distanceKm: 3.8 },
    { name: "Galleria Market", category: "Mall", distanceKm: 0.6 },
    { name: "Udyog Vihar", category: "Business Park", distanceKm: 6.4 },
  ],
  "dlf-phase-5": [
    { name: "Sector 53–54 Metro Station", category: "Metro", distanceKm: 1.3 },
    { name: "The Heritage School", category: "School", distanceKm: 2.7 },
    { name: "Fortis Memorial Research Institute", category: "Hospital", distanceKm: 3.1 },
    { name: "DLF Mall of India Golf Course Road", category: "Mall", distanceKm: 2.4 },
    { name: "DLF Golf & Country Club", category: "Business Park", distanceKm: 0.8 },
  ],
  "golf-course-road": [
    { name: "Sector 53–54 Metro Station", category: "Metro", distanceKm: 0.8 },
    { name: "Shikshantar School", category: "School", distanceKm: 2.3 },
    { name: "Fortis Memorial Research Institute", category: "Hospital", distanceKm: 1.9 },
    { name: "Good Earth City Centre", category: "Mall", distanceKm: 1.5 },
    { name: "One Horizon Center", category: "Business Park", distanceKm: 2.8 },
  ],
  "sohna-road": [
    { name: "Huda City Centre Metro Station", category: "Metro", distanceKm: 6.2 },
    { name: "Gurgaon Public School", category: "School", distanceKm: 1.1 },
    { name: "Park Hospital, Sohna Road", category: "Hospital", distanceKm: 1.6 },
    { name: "Omaxe Celebration Mall", category: "Mall", distanceKm: 2.0 },
    { name: "Unitech Cyber Park", category: "Business Park", distanceKm: 3.4 },
  ],
  "sector-56": [
    { name: "Sector 55–56 Metro Station", category: "Metro", distanceKm: 0.5 },
    { name: "Amity International School", category: "School", distanceKm: 1.8 },
    { name: "Artemis Hospital", category: "Hospital", distanceKm: 5.2 },
    { name: "Sector 56 Market", category: "Mall", distanceKm: 0.4 },
    { name: "Golf Course Road offices", category: "Business Park", distanceKm: 3.9 },
  ],
  "sector-82": [
    { name: "Huda City Centre Metro Station", category: "Metro", distanceKm: 14.5 },
    { name: "Delhi Public School, Sector 84", category: "School", distanceKm: 1.9 },
    { name: "Aarvy Healthcare", category: "Hospital", distanceKm: 3.7 },
    { name: "Vatika Town Square", category: "Mall", distanceKm: 1.2 },
    { name: "IMT Manesar", category: "Business Park", distanceKm: 8.8 },
  ],
  "cyber-city": [
    { name: "Cyber City Metro Station", category: "Metro", distanceKm: 0.3 },
    { name: "Lancers International School", category: "School", distanceKm: 4.2 },
    { name: "Columbia Asia Hospital", category: "Hospital", distanceKm: 2.9 },
    { name: "Ambience Mall", category: "Mall", distanceKm: 2.1 },
    { name: "Indira Gandhi International Airport", category: "Airport", distanceKm: 13.4 },
  ],
  "mg-road": [
    { name: "MG Road Metro Station", category: "Metro", distanceKm: 0.4 },
    { name: "Blue Bells Model School", category: "School", distanceKm: 2.2 },
    { name: "Max Hospital, Sector 19", category: "Hospital", distanceKm: 1.7 },
    { name: "Ambience Mall", category: "Mall", distanceKm: 1.1 },
    { name: "Indira Gandhi International Airport", category: "Airport", distanceKm: 15.8 },
  ],
  "nirvana-country": [
    { name: "Huda City Centre Metro Station", category: "Metro", distanceKm: 7.4 },
    { name: "The Shri Ram Millennium School", category: "School", distanceKm: 1.0 },
    { name: "Medanta – The Medicity", category: "Hospital", distanceKm: 4.6 },
    { name: "Nirvana Courtyard Plaza", category: "Mall", distanceKm: 0.5 },
    { name: "Unitech Cyber Park", category: "Business Park", distanceKm: 4.0 },
  ],
  "dwarka-expressway": [
    { name: "Sector 21 Dwarka Metro Station", category: "Metro", distanceKm: 9.6 },
    { name: "GD Goenka World School", category: "School", distanceKm: 3.3 },
    { name: "Signature Advanced Super Speciality", category: "Hospital", distanceKm: 2.8 },
    { name: "Ansal Plaza, Sector 102", category: "Mall", distanceKm: 2.4 },
    { name: "Indira Gandhi International Airport", category: "Airport", distanceKm: 11.2 },
  ],
  "southern-peripheral-road": [
    { name: "Sector 55–56 Metro Station", category: "Metro", distanceKm: 4.8 },
    { name: "Pathways World School", category: "School", distanceKm: 2.6 },
    { name: "Medanta – The Medicity", category: "Hospital", distanceKm: 5.4 },
    { name: "Airia Mall", category: "Mall", distanceKm: 1.7 },
    { name: "Golf Course Extension offices", category: "Business Park", distanceKm: 2.2 },
  ],
};

export function nearbyFor(localitySlug: string): NearbyPlace[] {
  return nearbyByLocality[localitySlug] ?? [];
}
