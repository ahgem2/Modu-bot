
export interface Person {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
  createdAt: Date;
}

export interface RecordsState {
  people: Person[];
  isAuthenticated: boolean;
}
