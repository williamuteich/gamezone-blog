export interface Afiliado {
    id: string;
    title: string;
    description: string;
    link: string;
    buttonName: string;
    imageUrl?: string;
    status: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface AfiliadoFormDialogProps {
    afiliado?: Afiliado;
    mode: 'add' | 'edit';
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface AfiliadoCardProps {
    afiliado: Afiliado;
}

export interface DeleteAfiliadoDialogProps {
    afiliado: Afiliado;
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface AfiliadoStatsProps {
    afiliados: Afiliado[];
    stats: {
        totalAfiliados: number;
        activeAfiliados: number;
        inactiveAfiliados: number;
    };
}
