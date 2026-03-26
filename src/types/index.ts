export interface Vehicle {
  name: string;
  type?: string;
  year: string;
  capacity: number;
  volume: number;
  drive: string;
  count: number;
  image: string;
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
  whatsapp: string;
  email: string;
  schedule: string;
}
