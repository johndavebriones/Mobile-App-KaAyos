export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Cleaning',
    icon: 'wand-sparkles',
    description: 'Home cleaning, deep cleaning, and sanitation',
    count: 12,
  },
  {
    id: '2',
    name: 'Plumbing',
    icon: 'wrench',
    description: 'Pipe repairs, faucet installation, drainage',
    count: 8,
  },
  {
    id: '3',
    name: 'Electrical',
    icon: 'bolt',
    description: 'Wiring, outlet repair, lighting installation',
    count: 10,
  },
  {
    id: '4',
    name: 'Carpentry',
    icon: 'hammer',
    description: 'Furniture repair, shelving, woodwork',
    count: 6,
  },
  {
    id: '5',
    name: 'Painting',
    icon: 'paintbrush',
    description: 'Interior & exterior painting, touch-ups',
    count: 7,
  },
  {
    id: '6',
    name: 'Appliance Repair',
    icon: 'gear',
    description: 'AC, refrigerator, washer, and more',
    count: 9,
  },
  {
    id: '7',
    name: 'Gardening',
    icon: 'leaf',
    description: 'Lawn care, landscaping, plant maintenance',
    count: 5,
  },
  {
    id: '8',
    name: 'Moving & Hauling',
    icon: 'truck',
    description: 'Furniture moving, junk removal, delivery',
    count: 4,
  },
];
