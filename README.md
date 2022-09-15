
---

#### Radenu is a decentralized, non-custodial P2P remittance payment protocol. Radenu implements a unique, on-chain escrow P2P payment solution analogous to commonly understood P2P applications like Binance, but transactions are completely pseudonymous. 
Web: Visit [https://radenu.vercel.app](https://radenu.vercel.app/). 

---


#### 👨‍💻 The Core Architecture
- TheVault/Escrowü
- The Sender
- The Settler
- The Receiver

The Vault: This is the key infrastructure of the network which holds funds and acts as an escrow on the platform. The Vault is built on smart contracts that execute when all conditions for the settlement are met.

The Sender: This is the user that initiates the remittance transaction (transfer) via a cryptocurrency payment and he/she is responsible for providing the details of the receiver in the form of a local bank account (fiat currency).

The Settler: This is the user that actually deposits the fiat currency to the receiver, the settler is usually resident in the receiver’s country OR can perform funds (fiat) transfer to the receiver’s local bank account.

The Receiver: This is the recipient of the fiat payment and they do not need to be on the platform, however, they can communicate with the Sender offline to acknowledge receipt of funds to their local bank account.

![My Image](my-image.jpg)


Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
