export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';

export interface Booking {
  id: string;
  workerId: string;
  workerName: string;
  serviceName: string;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  location: string;
  price: number;
  notes?: string;
  createdAt: string;
}

export const homeownerBookings: Booking[] = [
  {
    id: 'b1',
    workerId: 'w1',
    workerName: 'Mang Pedring Santos',
    serviceName: 'Plumbing - Pipe Repair',
    status: 'completed',
    scheduledDate: '2026-06-20',
    scheduledTime: '09:00 AM',
    location: 'Brgy. 2, Tuy, Batangas',
    price: 750,
    createdAt: '2026-06-18',
  },
  {
    id: 'b2',
    workerId: 'w3',
    workerName: 'Aling Nena Cruz',
    serviceName: 'Deep Cleaning',
    status: 'confirmed',
    scheduledDate: '2026-06-30',
    scheduledTime: '08:00 AM',
    location: 'Brgy. 5, Tuy, Batangas',
    price: 1200,
    createdAt: '2026-06-25',
  },
  {
    id: 'b3',
    workerId: 'w6',
    workerName: 'Jun de Guzman',
    serviceName: 'AC Repair',
    status: 'in_progress',
    scheduledDate: '2026-06-28',
    scheduledTime: '10:00 AM',
    location: 'Brgy. 3, Tuy, Batangas',
    price: 1500,
    notes: 'Window type AC, not cooling',
    createdAt: '2026-06-26',
  },
  {
    id: 'b4',
    workerId: 'w2',
    workerName: 'Ka Rolly Mercado',
    serviceName: 'Electrical - Outlet Repair',
    status: 'pending',
    scheduledDate: '2026-07-02',
    scheduledTime: '01:00 PM',
    location: 'Brgy. 1, Tuy, Batangas',
    price: 500,
    createdAt: '2026-06-27',
  },
];

export interface JobRequest {
  id: string;
  homeownerId: string;
  homeownerName: string;
  homeownerAddress: string;
  serviceName: string;
  description: string;
  status: 'pending' | 'accepted' | 'declined';
  proposedPrice: number;
  scheduledDate: string;
  scheduledTime: string;
  createdAt: string;
}

export const providerJobRequests: JobRequest[] = [
  {
    id: 'j1',
    homeownerId: 'h1',
    homeownerName: 'Maria Reyes',
    homeownerAddress: 'Brgy. 2, Tuy, Batangas',
    serviceName: 'Plumbing - Pipe Repair',
    description: 'Kitchen sink pipe leaking, needs immediate repair',
    status: 'pending',
    proposedPrice: 800,
    scheduledDate: '2026-06-29',
    scheduledTime: '09:00 AM',
    createdAt: '2026-06-27',
  },
  {
    id: 'j2',
    homeownerId: 'h2',
    homeownerName: 'Josefa Villanueva',
    homeownerAddress: 'Brgy. 5, Tuy, Batangas',
    serviceName: 'Faucet Installation',
    description: 'Need to replace old faucet in bathroom',
    status: 'accepted',
    proposedPrice: 500,
    scheduledDate: '2026-06-30',
    scheduledTime: '02:00 PM',
    createdAt: '2026-06-26',
  },
  {
    id: 'j3',
    homeownerId: 'h3',
    homeownerName: 'Pedro Gomez',
    homeownerAddress: 'Brgy. 3, Tuy, Batangas',
    serviceName: 'Water Heater Repair',
    description: 'Water heater not producing hot water',
    status: 'pending',
    proposedPrice: 1200,
    scheduledDate: '2026-07-01',
    scheduledTime: '10:00 AM',
    createdAt: '2026-06-28',
  },
];
