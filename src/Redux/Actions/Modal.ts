import { ConnectInfoProps } from '../../models';
import { CONNECT_WEB3_MODAL } from '../Type';

export const toggleConnectWeb3Modal = ( isOpen:boolean, connectInfo:ConnectInfoProps = { isMetaMask: false, isWalletConnect: false }) => {
  return {
    type: CONNECT_WEB3_MODAL,
    data: { isOpen, connectInfo }
  }
}