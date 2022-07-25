import { ethers } from "../node_modules/ethers/dist/ethers.esm.js";
import { abiContent } from "./abi.js";

let tmp = "";

const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
const contractAddress = "0x4B70d8eB6A009cE8715eFB48F601E52e943bc357";
const contractAbi = abiContent;
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

const testClick = document.getElementById("testClick");
testClick.addEventListener("click", onTestClick, false);

const clickConnect = document.getElementById("connect");
clickConnect.addEventListener("click", connectWallet, false);

const query = document.getElementById("query");
query.addEventListener("click", queryBalance, false);

const queryContract = document.getElementById("queryContract");
queryContract.addEventListener("click", queryContractBalance, false);

const donateETH = document.getElementById("donateETH");
donateETH.addEventListener("click", donate, false);

const withdrawETH = document.getElementById("withdrawETH");
withdrawETH.addEventListener("click", withdraw, false);

function onTestClick() {
    document.getElementById("testContent").textContent = "讀取成功";
}


function connectWallet() {
    signer.getAddress().then(res=>tmp = res.toString())
    document.getElementById("address").textContent = tmp;
}

function queryBalance() {
    signer.getBalance().then(res=>tmp = res.toString());
    document.getElementById("balance").textContent = tmp;
}

function queryContractBalance() {
    contract.queryBalance().then(res => tmp = res.toString())
    document.getElementById("contract").textContent = contractAddress;
    document.getElementById("contractBalance").textContent = tmp;
}

function donate() {
    const tx = signer.sendTransaction(
        {
            from: signer.getAddress(),
            to: contractAddress,
            value:  ethers.utils.parseEther("0.001")
        }
    )
    queryContractBalance();
}

function withdraw() {
    contract.getETH(signer.getAddress()).then(res=>tmp = res.toString());
    queryContractBalance();
}