
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/context/auth';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Team, TeamMember } from '@/types/team';
import TeamList from '@/components/team/TeamList';
import TeamChat from '@/components/team/TeamChat';
import CreateTeamForm from '@/components/team/CreateTeamForm';

// Mock data for demo
const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Marketing Team',
    description: 'Team for marketing strategy and content',
    createdAt: new Date('2023-01-15'),
    ownerId: 'user-1',
    members: [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        joinedAt: new Date('2023-01-15')
      },
      {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'editor',
        joinedAt: new Date('2023-01-16')
      }
    ]
  },
  {
    id: '2',
    name: 'Development Team',
    description: 'Product development and engineering',
    createdAt: new Date('2023-02-10'),
    ownerId: 'user-1',
    members: [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        joinedAt: new Date('2023-02-10')
      },
      {
        id: 'user-3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        role: 'editor',
        joinedAt: new Date('2023-02-12')
      }
    ]
  }
];

const TeamPage = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const [activeTab, setActiveTab] = useState('teams');

  // Redirect to home if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [isLoading, user, navigate]);

  // Load teams (mock data for now)
  useEffect(() => {
    setTeams(mockTeams);
    if (mockTeams.length > 0) {
      setActiveTeam(mockTeams[0]);
    }
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  const handleCreateTeam = (newTeam: Omit<Team, 'id' | 'createdAt' | 'ownerId' | 'members'>) => {
    const team: Team = {
      id: `team-${Date.now()}`,
      name: newTeam.name,
      description: newTeam.description,
      createdAt: new Date(),
      ownerId: user.id,
      members: [
        {
          id: user.id,
          name: user.name || 'Anonymous',
          email: user.email,
          role: 'admin',
          joinedAt: new Date()
        }
      ]
    };
    
    setTeams([...teams, team]);
    setActiveTeam(team);
    setActiveTab('chat');
  };

  const handleSelectTeam = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    if (team) {
      setActiveTeam(team);
      setActiveTab('chat');
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Team Collaboration | QueryQuest</title>
        <meta name="description" content="Collaborate with your team on AI chat sessions" />
      </Helmet>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Team Collaboration</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Create teams and share AI chat sessions with your colleagues
          </p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="teams">My Teams</TabsTrigger>
            <TabsTrigger value="create">Create Team</TabsTrigger>
            {activeTeam && (
              <TabsTrigger value="chat">{activeTeam.name} Chat</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="teams" className="mt-0">
            <TeamList 
              teams={teams} 
              onSelectTeam={handleSelectTeam} 
            />
          </TabsContent>
          
          <TabsContent value="create" className="mt-0">
            <CreateTeamForm onCreateTeam={handleCreateTeam} />
          </TabsContent>
          
          <TabsContent value="chat" className="mt-0">
            {activeTeam ? (
              <TeamChat team={activeTeam} currentUser={user} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Select a team to start chatting
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
};

export default TeamPage;
