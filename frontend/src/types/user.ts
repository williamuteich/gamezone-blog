export interface User {
    imageUrl: string | Blob | undefined;
    id: string;
    name: string;
    email: string;
    password?: string;
    role: string;
    status: boolean;
    avatar?: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt?: string;
    posts?: number;
}

export interface UserFormDialogProps {
    user?: User;
    mode: 'add' | 'edit';
    children: React.ReactNode;
}

export interface UserCardProps {
    user: User;
}

export interface DeleteUserDialogProps {
    user: User;
    children: React.ReactNode;
}

export interface UserStatsProps {
    users: User[];
}
