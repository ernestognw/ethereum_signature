//Eth Sign with Ethers.js
const ethers = require("ethers");

const accountInput = document.getElementById("account");
const signButton = document.getElementById("sign-button");

const dataToSign = document.getElementById("data-to-sign");
const dataSigned = document.getElementById("data-signed");

const recoverButton = document.getElementById("recover-button");
const signature = document.getElementById("signature");
const originalText = document.getElementById("original-text");
const accountThatSigned = document.getElementById("account-that-signed");

//Methods
const signData = (signer) => {
    signer.signMessage(dataToSign.value)
        .then((signature) => {
            dataSigned.value = signature;
        });
}

const recoverAccount = () => {
    let addressAccount = ethers.utils.verifyMessage(originalText.value, signature.value);
    accountThatSigned.value = addressAccount;
}

window.onload = async () => {
    if(!window.web3)
        alert("This app needs some web3 provider such as metamask")
    else {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        accountInput.value = await signer.getAddress();

        //Events
        signButton.addEventListener("click", () => signData(signer));
        recoverButton.addEventListener("click", recoverAccount);
    }
}