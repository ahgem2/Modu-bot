
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatarUrl?: string;
  joinedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  ownerId: string;
  members: TeamMember[];
}

export interface SharedChatSession {
  id: string;
  teamId: string;
  name: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  createdById: string;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    userId?: string;
    userName?: string;
  }>;
}
