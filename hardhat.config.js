require("@nomicfoundation/hardhat-toolbox");
require ('solidity-docgen')
//require('hardhat-docgen');

const dotenv = require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    
    mumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: [ process.env.PRIVATE_KEY ]
      //url: "https://rpc-mumbai.maticvigil.com/",
      //accounts: [ "1b16d28f81cc8163d22b18907989163def6e4e05a039c464502c5788b428e264" ]
    },

    hardhat: {
      //chainId: 31337,
      from: '0x3861e035d21C154Ba1918Cdd884e1ff0888d8588',
      forking: {
        url: "https://eth-rinkeby.alchemyapi.io/v2/dDnGVijGVGGAZ9Ubh3P3kyfz-O0TrG7j",
        //blockNumber: 10498650,
        accounts: [ process.env.PRIVATE_KEY ],
       
      }
    },

    polygon: {
      url: "https://rpc-mainnet.maticvigil.com/",
      accounts: [ process.env.PRIVATE_KEY ]
      //url: "https://rpc-mumbai.maticvigil.com/",
      //accounts: [ "1b16d28f81cc8163d22b18907989163def6e4e05a039c464502c5788b428e264" ]
    },

    // testnet: {
    //   url: "https://data-seed-prebsc-1-s1.binance.org:8545",
    //   chainId: 97,
    //   gasPrice: 20000000000,
    //   accounts: [ process.env.PRIVATE_KEY ]
    // },

    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/YqqmhiG4K2s481G_chTurm9i7ndNWfae",
      accounts: [ process.env.PRIVATE_KEY ]
    },

    rinkeby: {
      //url: "https://rinkeby.infura.io/v3/da220ac7e5a945a69f15174a66aeea4a",
      url: "https://eth-rinkeby.alchemyapi.io/v2/dDnGVijGVGGAZ9Ubh3P3kyfz-O0TrG7j",
      accounts: [ process.env.PRIVATE_KEY ]
    }
  },
  gasReporter: {
    currency: 'USD',
    enabled: (process.env.GAS_REPORT) ? true : false,
    //gasPrice: 17,
    coinmarketcap: '5ee42e4d-f1d8-4193-ae67-b27d91ef793b'
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    //apiKey: 'WHSWSK3C8PCPEQ31MNETTY7N21RN9W1BDQ'
    apiKey: 'Y8M6DDIB7VZWM5AW2HZ36QC562CGR88ZRY'
  }
};
