import type { Material } from '../types';

export const materials: Material[] = [
  {
    name: 'Буровой шлам',
    description: 'Вывоз с кустовых площадок на место утилизации',
    image: '/images/materials/drilling-waste.jpg',
  },
  {
    name: 'Щебень',
    description: 'Доставка с карьеров на строительные объекты',
    image: '/images/materials/gravel.jpg',
  },
  {
    name: 'Песок',
    description: 'Речной, карьерный. Для строительства и дорожных работ',
    image: '/images/materials/sand.jpg',
  },
  {
    name: 'Грунт',
    description: 'Перемещение и вывоз грунта любых объёмов',
    image: '/images/materials/soil.jpg',
  },
  {
    name: 'Уголь и руда',
    description: 'Транспортировка с месторождений',
    image: '/images/materials/coal.jpg',
  },
  {
    name: 'Асфальт',
    description: 'Доставка на объекты дорожного строительства',
    image: '/images/materials/asphalt.jpg',
  },
];

export const cargoOptions = [
  'Буровой шлам',
  'Щебень',
  'Песок',
  'Грунт',
  'Уголь и руда',
  'Асфальт',
  'Другое',
] as const;
