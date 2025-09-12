import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Team, DeleteTeamDialogProps } from "@/types/team"
import { deleteRecord } from "@/app/actions/deleteRecord"

export default function DeleteTeamDialog({ team, children, open, onOpenChange }: DeleteTeamDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o membro{' '}
                        <span className="font-semibold text-white">{team.name}</span> e removerá todos os seus dados.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 cursor-pointer border-gray-600 text-white hover:bg-gray-600">
                        Cancelar
                    </AlertDialogCancel>
                    <form action={deleteRecord}>
                        <input type="hidden" name="id" value={team.id} />
                        <input type="hidden" name="url" value="team" />
                        <input type="hidden" name="revalidate" value="/dashboard/team" />
                        <AlertDialogAction
                            type="submit"
                            className="bg-red-600 cursor-pointer hover:bg-red-500 text-white"
                        >
                            Excluir
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
