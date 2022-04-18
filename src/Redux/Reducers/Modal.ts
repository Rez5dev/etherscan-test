import { AnyAction } from 'redux';
import { IModalReducer } from '../../models';
import { CONNECT_WEB3_MODAL } from '../Type';

const INITIAL = {
  isConnectWeb3Modal: false,
  connectInfo: {
    isMetaMask: false, isWalletConnect: false
  }
}

const reducer = (state = INITIAL, action: AnyAction): IModalReducer => {
  switch (action.type) {
    case CONNECT_WEB3_MODAL: {
      const { isOpen, connectInfo } = action.data;
      return { ...state, isConnectWeb3Modal: isOpen, connectInfo };
    }
    default:
      return state;
  }
}


export default reducer