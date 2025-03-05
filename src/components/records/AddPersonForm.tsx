
import React, { useState } from 'react';
import { Person } from '@/types/records';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddPersonFormProps {
  onAddPerson: (person: Omit<Person, 'id' | 'createdAt'>) => void;
}

const AddPersonForm: React.FC<AddPersonFormProps> = ({ onAddPerson }) => {
  const [person, setPerson] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPerson(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPerson(person);
    setPerson({
      name: '',
      email: '',
      phone: '',
      notes: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md bg-white dark:bg-gray-800">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={person.name}
          onChange={handleChange}
          required
          placeholder="Full name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email (optional)</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={person.email}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            name="phone"
            value={person.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          value={person.notes}
          onChange={handleChange}
          placeholder="Add any additional information..."
          className="h-24"
        />
      </div>

      <Button type="submit" className="w-full">Add Person</Button>
    </form>
  );
};

export default AddPersonForm;
