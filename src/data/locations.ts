import type { Location } from '../types';

export const locations: Location[] = [
  { name: 'Тюмень', lat: 57.15, lng: 65.53 },
  { name: 'Ялуторовск', lat: 56.65, lng: 66.30 },
  { name: 'Заводоуковск', lat: 56.50, lng: 66.55 },
  { name: 'Ярково', lat: 57.04, lng: 68.00 },
  { name: 'Тобольск', lat: 58.20, lng: 68.25 },
  { name: 'Демьянское', lat: 59.49, lng: 69.86 },
  { name: 'Горноправдинск', lat: 60.06, lng: 69.90 },
  { name: 'Ханты-Мансийск', lat: 61.00, lng: 69.00 },
  { name: 'Сургут', lat: 61.25, lng: 73.38 },
  { name: 'Нижневартовск', lat: 60.93, lng: 76.57 },
  { name: 'Муравленко', lat: 63.79, lng: 74.52 },
  { name: 'Коротчаево', lat: 65.97, lng: 78.22 },
  { name: 'Новый Уренгой', lat: 66.08, lng: 76.68 },
  { name: 'Надым', lat: 65.53, lng: 72.52 },
  { name: 'Салехард', lat: 66.53, lng: 66.60 },
  { name: 'Лабытнанги', lat: 66.66, lng: 66.42 },
  { name: 'Сабетта', lat: 71.26, lng: 72.07 },
  { name: 'Бованенково', lat: 70.36, lng: 68.38 },
  {
    name: 'Ковыктинское месторождение',
    lat: 54.17,
    lng: 105.72,
    highlight: true,
  },
];

export const sectors = [
  { name: 'Нефтяники', icon: 'oil' },
  { name: 'Дорожники', icon: 'road' },
  { name: 'Строители', icon: 'building' },
  { name: 'Заводы', icon: 'factory' },
] as const;
