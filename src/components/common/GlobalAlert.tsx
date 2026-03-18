import { alertManager, useAlertStore } from "#/lib/store"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"

export function GlobalAlert() {
    const state = useAlertStore();
    if(!state)
        return null;
    return (
        <AlertDialog 
            open={state.isOpen} 
            onOpenChange={open => !open && alertManager.close()}>
            <AlertDialogContent className="fixed top-6 left-[50%] translate-x-[-50%] translate-y-0 border-0">
                <AlertDialogHeader>
                <AlertDialogTitle>{state.title}</AlertDialogTitle>
                <AlertDialogDescription>{state.description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel className="border-secondary">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                    onClick={() => {
                    state.onAction?.()
                    alertManager.close()
                    }}
                >
                    Continue
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}