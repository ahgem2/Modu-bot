
import { useState } from 'react';
import { Team } from '@/types/team';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface CreateTeamFormProps {
  onCreateTeam: (team: Omit<Team, 'id' | 'createdAt' | 'ownerId' | 'members'>) => void;
}

const CreateTeamForm = ({ onCreateTeam }: CreateTeamFormProps) => {
  const { toast } = useToast();
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teamName.trim()) {
      toast({
        title: "Error",
        description: "Team name is required",
        variant: "destructive",
      });
      return;
    }
    
    onCreateTeam({
      name: teamName,
      description: teamDescription
    });
    
    // Reset form
    setTeamName('');
    setTeamDescription('');
    
    toast({
      title: "Team created",
      description: "Your new team has been created successfully",
    });
  };
  
  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Create a New Team</CardTitle>
        <CardDescription>
          Create a team to collaborate with others on AI chat sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="team-name" className="text-sm font-medium">
              Team Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="team-name"
              placeholder="Enter team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="team-description" className="text-sm font-medium">
              Description (Optional)
            </label>
            <Textarea
              id="team-description"
              placeholder="Enter a brief description of your team"
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Create Team
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateTeamForm;
