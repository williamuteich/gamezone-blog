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
import { DeleteAfiliadoDialogProps } from "@/types/afiliado"
import { deleteRecord } from "@/app/actions/deleteRecord"

export default function DeleteAfiliadoDialog({ afiliado, children, open, onOpenChange }: DeleteAfiliadoDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900 border-gray-700 text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o produto{' '}
                        <span className="font-semibold text-white">{afiliado.title}</span> e removerá todos os seus dados.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                        Cancelar
                    </AlertDialogCancel>
                    <form action={deleteRecord}>
                        <input type="hidden" name="id" value={afiliado.id} />
                        <input type="hidden" name="url" value="affiliates" />
                        <input type="hidden" name="revalidate" value="/dashboard/afiliados" />
                        <AlertDialogAction
                            type="submit"
                            className="bg-red-600 hover:bg-red-500 text-white"
                        >
                            Excluir
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
