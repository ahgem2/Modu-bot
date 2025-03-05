
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import RecordsAuth from '@/components/records/RecordsAuth';
import RecordsTable from '@/components/records/RecordsTable';
import AddPersonForm from '@/components/records/AddPersonForm';
import { Person } from '@/types/records';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const STORAGE_KEY = 'queryQuest_records';
const PASSCODE = '1234'; // Simple passcode for demonstration

const Records = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const { toast } = useToast();

  // Load records from localStorage when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const savedRecords = localStorage.getItem(STORAGE_KEY);
      if (savedRecords) {
        try {
          const parsedRecords = JSON.parse(savedRecords);
          setPeople(parsedRecords.map((person: any) => ({
            ...person,
            createdAt: new Date(person.createdAt)
          })));
        } catch (error) {
          console.error('Error parsing records:', error);
          toast({
            title: "Error loading records",
            description: "There was a problem loading saved records.",
            variant: "destructive",
          });
        }
      }
    }
  }, [isAuthenticated, toast]);

  // Save records to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && people.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
    }
  }, [people, isAuthenticated]);

  const handleAuthenticate = (enteredPasscode: string) => {
    if (enteredPasscode === PASSCODE) {
      setIsAuthenticated(true);
      toast({
        title: "Access granted",
        description: "You now have access to the records.",
      });
    } else {
      toast({
        title: "Access denied",
        description: "Incorrect passcode.",
        variant: "destructive",
      });
    }
  };

  const handleAddPerson = (person: Omit<Person, 'id' | 'createdAt'>) => {
    const newPerson: Person = {
      ...person,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    
    setPeople([...people, newPerson]);
    toast({
      title: "Person added",
      description: `${person.name} has been added to the records.`,
    });
  };

  const handleDeletePerson = (id: string) => {
    setPeople(people.filter(person => person.id !== id));
    toast({
      title: "Person removed",
      description: "Record has been deleted.",
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Records Management | QueryQuest</title>
        <meta name="description" content="Securely manage and track records of people." />
      </Helmet>

      <main className="container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <RecordsAuth onAuthenticate={handleAuthenticate} />
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Records Management</h1>
              <button 
                onClick={() => setIsAuthenticated(false)} 
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-gray-800 transition-colors"
              >
                Lock Records
              </button>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex items-start gap-3">
              <AlertCircle className="text-amber-600 h-5 w-5 mt-0.5" />
              <div className="text-amber-800 text-sm">
                <p className="font-medium">Important: Local Storage Only</p>
                <p>These records are stored only in your browser's local storage. They will be lost if you clear your browser data.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Add New Person</h2>
                <AddPersonForm onAddPerson={handleAddPerson} />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Current Records</h2>
                <RecordsTable people={people} onDeletePerson={handleDeletePerson} />
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Records;
