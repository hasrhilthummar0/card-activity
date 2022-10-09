import { useEthers } from '@usedapp/core';
import { JsonRpcProvider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';
import { useState } from 'react';

type InternalState = {
    loading: boolean;
    error?: string | null;
};

const initialState = {
    loading: false,
    error: null,
};

export type WalletConnectState = {
    loading: boolean;
    active: boolean;
    account: string | null;
    library: JsonRpcProvider | undefined;
    error: string | null;
    activateProvider: () => void;
    deactivate: () => void;
    activateBrowserWallet: () => void;
};

export const useWalletConnect = () => {
    const [internalState, setInternalState] =
        useState<InternalState>(initialState);

    const {
        isLoading,
        active,
        account,
        library,
        error,
        activate,
        deactivate,
        activateBrowserWallet,
    } = useEthers();

    const getWeb3Modal = () => {
        const providerOptions = {
            injected: {
                display: {
                    name: 'Metamask',
                    description: 'Connect with the provider in your Browser',
                },
                package: null,
            },
        };
        const web3Modal = new Web3Modal({
            network: 'mainnet',
            cacheProvider: true,
            disableInjectedProvider: false,
            providerOptions,
        });

        return web3Modal;
    };

    const activateProvider = async () => {
        setInternalState({
            ...internalState,
            loading: true,
        });

        const web3Modal = getWeb3Modal();

        try {
            const provider = await web3Modal.connect();
            await activate(provider);
            setInternalState({
                ...internalState,
                error: null,
                loading: false,
            });
        } catch (error: any) {
            setInternalState({
                ...internalState,
                error: error,
                loading: false,
            });
        }
    };

    const handleDeactivate = () => {
        deactivate();
        getWeb3Modal().clearCachedProvider();
    };

    return {
        loading: internalState.loading || isLoading,
        active,
        account: account || null,
        library,
        error: internalState.error || error?.toString() || null,
        activateProvider,
        deactivate: handleDeactivate,
        activateBrowserWallet,
    };
};
