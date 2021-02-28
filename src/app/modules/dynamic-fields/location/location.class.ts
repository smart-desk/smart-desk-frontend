export class Location {
    title: string;
    lat: number;
    lng: number;
}

export class Area extends Location {
    radius: number;
}
