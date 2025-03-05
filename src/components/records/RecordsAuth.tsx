
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface RecordsAuthProps {
  onAuthenticate: (passcode: string) => void;
}

const RecordsAuth: React.FC<RecordsAuthProps> = ({ onAuthenticate }) => {
  const [passcode, setPasscode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthenticate(passcode);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
            <Lock className="h-6 w-6 text-purple-700" />
          </div>
          <CardTitle className="text-2xl">Records Access</CardTitle>
          <CardDescription>
            Enter the passcode to access the records management system.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                className="text-lg py-6"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Access Records</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RecordsAuth;
