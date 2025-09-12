export interface Team {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'MODERATOR';
  avatar?: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamRequest {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'EDITOR' | 'MODERATOR';
  avatar?: string;
  status?: boolean;
}

export interface UpdateTeamRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: 'ADMIN' | 'EDITOR' | 'MODERATOR';
  avatar?: string;
  status?: boolean;
}

export interface TeamFormDialogProps {
  team?: Team;
  mode: 'add' | 'edit';
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface TeamCardProps {
  team: Team;
}

export interface DeleteTeamDialogProps {
  team: Team;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}