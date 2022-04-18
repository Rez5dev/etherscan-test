export interface ConnectInfoProps {
    isMetaMask?: boolean;
    isWalletConnect?: boolean;
}


export interface IModalReducer {
    isConnectWeb3Modal: boolean;
    connectInfo: ConnectInfoProps
}

export interface IState {
  Modal:IModalReducer
}