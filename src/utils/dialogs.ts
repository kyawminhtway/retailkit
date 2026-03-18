import { alertManager } from "#/lib/store";

export function showWarning(message: string){
    return alertManager.open({
        title: 'WARNING',
        description: message,
    });
}

export function showError(message: string){
    return alertManager.open({
        title: 'ERROR',
        description: message,
    });
}

export function showMessage(message: string){
    return alertManager.open({
        title: 'MESSAGE',
        description: message,
    });
}