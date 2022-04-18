import "./ConnectButton.scss";

export interface IConnectButton {
  isConnect: boolean;
  onClick: () => void;
}

const ConnectButton = ({ isConnect, onClick }: IConnectButton) => {
  return (
    <div className="connect-button-component">
      <div
        className={`connect-button mb-3 v-c h-c ${
          isConnect ? "active-button" : "inActive-button"
        }`}
        onClick={onClick}
      >
        <div
          className={`status-icon ${
            isConnect ? "active-icon" : "inActive-icon"
          }`}
        />
        <div>{isConnect ? "Disconnect" : "Connect MetaMask"}</div>
      </div>
    </div>
  );
};

export default ConnectButton;
