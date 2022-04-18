import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import Web3 from "web3";
import ConnectButton from "../../components/ConnectButton/ConnectButton";
import ContractDetail from "../../components/ContractDetail/ContractDetail";
import { AbiJson } from "../../Contract/abi";
import "./Home.scss";

const contractAddress = "0x7f268357A8c2552623316e2562D90e642bB538E5";

export const HomePage = (): ReactElement => {
  const [name, setName] = useState('')
  const { ethereum }: any = useMemo(() => window, []);
  const web3 = useMemo(() => new Web3(ethereum), [ethereum]);
  const contractInstance = useMemo(
    () => new web3.eth.Contract(AbiJson, contractAddress),
    [web3]
  );
  console.log(contractInstance);

  useEffect(() => {
    // const getName = async () => {
    //   const name = await contractInstance.methods.name().call();
    //   console.log("[contract name", contractInstance.methods.name());
    // };
    // getName();
    // console.log("contract name", contractInstance.methods.name().call().then());

    contractInstance.methods.name().call().then((res: string) => {
      console.log('test', res)
      setName(res)
    })

  }, [contractInstance, ethereum]);

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = useCallback(
    () => async () => {
      if (!ethereum) {
        console.log("Make sure you have Metamask installed!");
        return;
      } else {
        console.log("Wallet exists! We're ready to go!");
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    },
    [ethereum]
  );

  useEffect(() => {
    checkWalletIsConnected();
  }, [checkWalletIsConnected]);

  const connectWalletHandler = async () => {
    if (!ethereum) {
      alert("Please install Metamask!");
    }

    if (currentAccount !== null) {
      setCurrentAccount(null);
      return;
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const [frontData, setFrontData] = useState({
    amountAddContract: "",
    amountToDeposit: "",
    emergencyWithdraw: "",

    slippage: "",

    tokenAddr: "",
    toAddress: "",
    ERCtokenAmount: "",
    newOwner: "",
    amountToWithdraw: "",
  });

  const titles = [
    "1. Name",
    "2. deposite",
    "3. emergencyWithdraw",
    "4. withdraw",
  ];
  const onWrite = (title: string | undefined) => {
    if (currentAccount === null) {
      console.log("No Valid Account found!, please connect metamask");
      connectWalletHandler();
      return;
    }
    console.log(currentAccount);
    let method = null;
    switch (title) {
      // "Claim",
      case titles[0]:
        method = contractInstance.methods.claim();
        break;
      // "deposite",
      case titles[1]:
        method = contractInstance.methods.deposit(
          web3.utils.toWei(frontData.amountToDeposit, "ether")
        );
        break;
      // "emergencyWithdraw",
      case titles[2]:
        method = contractInstance.methods.emergencyWithdraw(
          web3.utils.toWei(frontData.emergencyWithdraw, "ether")
        );
        break;
      // "withdraw"
      case titles[3]:
        method = contractInstance.methods.withdraw(
          web3.utils.toWei(frontData.amountToWithdraw, "ether")
        );
        break;

      default:
        break;
    }
    method
      .send({
        from: currentAccount,
      })
      .on("transactionHash", (hash: any) => {
        console.log("transactionHash", hash);
      })
      .on("receipt", function (receipt: any) {
        console.log("receipt", receipt);
      })
      .on("confirmation", function (confirmationNumber: any, receipt: any) {
        console.log("confirmation", receipt, confirmationNumber);
      })
      .on("error", function (error: any, receipt: any) {
        console.log("error", receipt, error);
      });
  };

  const onChange = (field: string, value: any) => {
    setFrontData({
      ...frontData,
      [field]: value,
    });
  };

  return (
    <div className="home-page">
      <div className="container v-r">
        <ConnectButton
          isConnect={currentAccount !== null}
          onClick={connectWalletHandler}
        />

        {/* ====Claim=== */}
        <div className="contract-item">
          <ContractDetail read={true} value={name} title={titles[0]} onWrite={onWrite} />
        </div>

        {/* ====deposite=== */}
        <div className="contract-item">
          <ContractDetail
            title={titles[1]}
            description="amount(uint256)"
            placeholder="amount(uint256)"
            value={frontData.amountToDeposit}
            onWrite={onWrite}
            onChange={(e: any) => onChange("amountToDeposit", e)}
          />
        </div>

        {/* ====emergencyWithdraw=== */}
        <div className="contract-item">
          <ContractDetail
            title={titles[2]}
            description="amount(uint256)"
            placeholder="amount(uint256)"
            value={frontData.emergencyWithdraw}
            onWrite={onWrite}
            onChange={(e) => onChange("emergencyWithdraw", e)}
          />
        </div>

        {/* ====withdraw=== */}
        <div className="contract-item">
          <ContractDetail
            title={titles[3]}
            description="amountToWithdraw(uint256)"
            placeholder="amountToWithdraw(uint256)"
            value={frontData.amountToWithdraw}
            onWrite={onWrite}
            onChange={(e) => onChange("amountToWithdraw", e)}
          />
        </div>
      </div>
    </div>
  );
};
