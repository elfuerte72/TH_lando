import type { Stat } from '../types';

export const stats: Stat[] = [
  { icon: 'calendar', value: '2013', label: 'Лет в отрасли' },
  { icon: 'truck', value: '11+', label: 'Единиц техники' },
  { icon: 'clock', value: '24/7', label: 'Без праздников и выходных' },
  { icon: 'shield', value: 'I–IV', label: 'Класс опасности. Лицензия' },
  { icon: 'satellite', value: 'GPS', label: 'Контроль каждой машины' },
];

export const advantages = [
  'Собственный автопарк — никаких посредников',
  'Все машины — полный привод 6×6',
  'Опыт работы на Крайнем Севере (Сабетта, Бованенково) и Востоке (Ковыктинское месторождение)',
  'Наличие лицензии работы с отходами',
];

export const contactInfo = {
  phone: '8 (922) 261-28-54',
  whatsapp: '89222612854',
  email: '89222612854@mail.ru',
  schedule: 'Круглосуточно, без выходных',
};

export const navigation = [
  { label: 'Автопарк', href: '#fleet' },
  { label: 'Услуги', href: '#materials' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'О компании', href: '#about' },
];
