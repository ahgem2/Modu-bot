
import { useState } from 'react';
import { Team } from '@/types/team';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  MessageSquare, 
  Calendar 
} from 'lucide-react';

interface TeamListProps {
  teams: Team[];
  onSelectTeam: (teamId: string) => void;
}

const TeamList = ({ teams, onSelectTeam }: TeamListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (teams.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-12 w-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-lg font-medium">No teams yet</h3>
        <p className="mt-2 text-gray-500">
          Create your first team to start collaborating
        </p>
        <Button className="mt-4">Create Team</Button>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Teams</span>
          <div className="relative">
            <input
              type="text"
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team Name</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.map(team => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{team.name}</span>
                    {team.description && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {team.description}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{team.members.length}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{team.createdAt.toLocaleDateString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center"
                    onClick={() => onSelectTeam(team.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TeamList;
