// Require web3 to instantiate
const Web3 = require("web3");

// Get elements from DOM
// // Elements of the signing process
const dataToSign = document.getElementById("data-to-sign");
const accountInput = document.getElementById("account");
const signButton = document.getElementById("sign-button");
const dataSigned = document.getElementById("data-signed");

// // Elements of the recover process
const signature = document.getElementById("signature");
const originalText = document.getElementById("original-text");
const accountThatSigned = document.getElementById("account-that-signed");
const recoverButton = document.getElementById("recover-button");

// Event handlers
// // Method that signs data
const signData = () => {
  // sign receives three parameters:
  // 1.- Data that will be signed
  // 2.- Account that will sign the data
  // 3.- Web3 provider password to unlock accounts (not needed in this case)
  web3.eth.personal
    .sign(dataToSign.value, accountInput.value, "")
    .then(signature => {
      // This function retrieves a signature
      dataSigned.value = signature;
    });
};

// // Method that recovers signer public key
const recoverAccount = () => {
  // ecRecover receives two parameters:
  // 1.- The original message signed
  // 2.- The signature
  web3.eth.personal
    .ecRecover(originalText.value, signature.value)
    .then(accountRecovered => {
      // This function retrieves the original signer account
      accountThatSigned.value = accountRecovered;
    });
};

window.onload = () => {
  if (!window.web3) {
    // If not injected web3 environment, show a warning
    alert("This app needs some web3 provider such as metamask");
  } else {
    // Instantiate a new web3 with full capabilities
    web3 = new Web3(Web3.givenProvider, null, {});

    // Request the user account and save it into input
    web3.eth.requestAccounts().then(accounts => {
      accountInput.value = accounts[0];
    });

    // Add listeners to clicks that handle the sign and recover process's
    signButton.addEventListener("click", signData);
    recoverButton.addEventListener("click", recoverAccount);
  }
};
