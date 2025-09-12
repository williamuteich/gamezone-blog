export interface User {
    imageUrl: string | Blob | undefined;
    id: string;
    name: string;
    email: string;
    password?: string;
    status: boolean;
    avatar?: string;
    createdAt: string;
    updatedAt?: string;
    posts?: number;
}

export interface UserFormDialogProps {
    user?: User;
    mode: 'add' | 'edit';
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface UserCardProps {
    user: User;
}

export interface DeleteUserDialogProps {
    user: User;
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface UserStatsProps {
    users?: User[];
    stats?: {
        totalUsers: number;
        activeUsers: number;
        inactiveUsers: number;
    };
}
