export interface Vehicle {
  name: string;
  capacity: number;
  volume: number;
  drive: string;
  image: string;
  engine: string;
  fuel: string;
  bodyType: string;
  grossWeight: number;
  description: string;
}

export interface Material {
  name: string;
  description: string;
  image: string;
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
  description?: string;
  highlight?: boolean;
}

export interface Stat {
  icon: string;
  value: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  phoneRaw: string;
  email: string;
  max: string;
  schedule: string;
}
