import { createStore, useStore } from "@tanstack/react-store";


export type AlertConfig = {
    isOpen: boolean,
    title: string,
    description: string,
    onAction?: () => void,
};

export type ClientStore = {
    accessToken?: string,
    alert?: AlertConfig,
};

export const clientStore = createStore<ClientStore>({
    alert: {
        isOpen: false,
        title: '',
        description: '',
    }
});

export const accessTokenManager = {
    setToken: (token: string) => {
        clientStore.setState(state => {
            return {
                ...state,
                accessToken: token,
            }
        });
    },
    removeToken: () => {
        clientStore.setState(state => {
            return {
                ...state,
                accessToken: undefined,
            }
        });
    },
};

export const alertManager = {
    open: (config: Omit<AlertConfig, 'isOpen'>) => {
        clientStore.setState(state => ({ ...state, alert: { isOpen: true, ...config } }))
    },
    close: () => {
        clientStore.setState(state => ({ ...state, alert: { ...state.alert!, isOpen: false }}));
    },
};

export function useAlertStore(){
    return useStore(clientStore, state => state.alert);
} 