
import React, { useState } from 'react';
import { Person } from '@/types/records';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecordsTableProps {
  people: Person[];
  onDeletePerson: (id: string) => void;
}

const RecordsTable: React.FC<RecordsTableProps> = ({ people, onDeletePerson }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPeople = people.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (person.email && person.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (person.phone && person.phone.includes(searchTerm))
  );

  if (people.length === 0) {
    return <div className="text-center py-8 text-gray-500">No records found. Add a person to get started.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPeople.length > 0 ? (
              filteredPeople.map((person) => (
                <TableRow key={person.id}>
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      {person.email && <span className="text-sm">{person.email}</span>}
                      {person.phone && <span className="text-sm">{person.phone}</span>}
                    </div>
                  </TableCell>
                  <TableCell>{person.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeletePerson(person.id)}
                      aria-label="Delete record"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                  No matching records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-gray-500 text-right">
        Total: {people.length} records
      </div>
    </div>
  );
};

export default RecordsTable;
