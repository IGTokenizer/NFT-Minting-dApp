import React, { useEffect, useState } from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from "ethers";
import myEpicNft from './utils/MySmartNFT.json';
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;


const App = () => {
  const [isMinting, setIsMinting] = useState(false);
  const [mintingComplete, setMintingComplete] = useState(false);
  const askContractToMintNft = async () => {
    const CONTRACT_ADDRESS = "0xA8dF98cdc60D5774057421E0E503FfBe4A9a03F7";
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);
  
        console.log("Going to pop wallet now to pay gas...")
        setIsMinting(true);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeAnEpicNFT();

        console.log("Mining...please wait.")
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`);

        // Update state to indicate minting has finished
        setIsMinting(false);
        setMintingComplete(true);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [currentAccount, setCurrentAccount] = useState("");
  
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 
    } catch (error) {
      console.log(error);
    }
  }

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  // Modify the render function
  const renderMintUI = () => {
    if (isMinting) {
      return <p className="sub-text">Minting in progress... Please wait.</p>;
    } else if (mintingComplete) {
      return <p className="sub-text">Minting complete! Check OpenSea! https://testnets.opensea.io/collection/secutry-nft-s-1</p>;
    } else {
      return (
        <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
          Mint NFT
        </button>
      );
    }
  }

  // Modify the return statement in the App component
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">IGTokenizer NFT Minting dApp</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.<br/> -----------------------------------------------
          </p>
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
        </div>
      </div>
    </div>
  );
};

export default App;