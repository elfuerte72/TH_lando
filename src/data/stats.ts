import type { Stat } from '../types';

export const stats: Stat[] = [
  { icon: 'calendar', value: '2013', label: 'Основание компании' },
  { icon: 'clock', value: '24/7', label: 'Без праздников и выходных' },
  { icon: 'shield', value: 'III–IV', label: 'Класс опасности. Лицензия' },
  { icon: 'satellite', value: 'GPS', label: 'Контроль каждой машины' },
];

export const advantages = [
  'Собственный автопарк — никаких посредников',
  'Все машины — полный привод 6×6',
  'Многолетний опыт работы на разных объектах: от городских стройплощадок и федеральных автодорог до труднодоступных месторождений Крайнего севера и Восточной Сибири.',
  'Наличие лицензии на транспортирование опасных отходов.',
  'Штат высококвалифицированных специалистов.',
  'Мобильные вагон-дома и модульные сооружения позволяют организовать автономное расположение в любых условиях.',
];

export const contactInfo = {
  phone: '8 (922) 261-28-54',
  phoneRaw: '89222612854',
  email: '89222612854@mail.ru',
  max: 'https://max.ru/u/f9LHodD0cOIS3DjlFBdFHmC2b1kVJDioQaRKJhHhCB_RHzuT-oHfEyL2gV8',
  schedule: 'Круглосуточно, без выходных',
};

export const navigation = [
  { label: 'Автопарк', href: '#fleet' },
  { label: 'Услуги', href: '#materials' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Портфолио', href: '#geography' },
  { label: 'О компании', href: '#about' },
];
