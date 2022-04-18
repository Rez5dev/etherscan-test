import { Modal } from 'react-bootstrap';
import './ConnectWeb3Modal.scss';
import { ReactSVG } from 'react-svg'
import { useDispatch, useSelector } from 'react-redux';
import { toggleConnectWeb3Modal } from '../../Redux/Actions';
import closeIcon from '../../Assets/Icon/close-icon.svg';
import { IState } from '../../models';

function ConnectWeb3Modal() {
  const dispatch = useDispatch();

  const { isConnectWeb3Modal } = useSelector(
    (state:IState) => state.Modal
  );

  const onMetaMask = () => {
    console.log("==onMetaMask==")
    dispatch(toggleConnectWeb3Modal(false, {isMetaMask: true}));
  };

  const onWallectConnect = () => {
    console.log("==onWallectConnect==")
    dispatch(toggleConnectWeb3Modal(false, {isWalletConnect: true}));
  };

  const closeModal = () => {
    dispatch(toggleConnectWeb3Modal(false));
  }

  return (
    <Modal show={isConnectWeb3Modal} className="connect-modal-component">
      <div className='modal-header v-c'>
        <div>
          Connect a Wallet
        </div>
        <div className="close-btn"> <ReactSVG src={closeIcon} className='icon-close' onClick={closeModal} /> </div>
      </div>
      <div className='modal-body'>
        <div className='connect-button mb-3' onClick={onMetaMask}>
          MetaMask
        </div>
        <div className='connect-button' onClick={onWallectConnect}>
          WalletConnect
        </div>
      </div>
    </Modal>
  );
}

export default ConnectWeb3Modal;
