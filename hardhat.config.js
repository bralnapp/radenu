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
    
    hardhat: {
      //chainId: 31337,
      from: '0x3861e035d21C154Ba1918Cdd884e1ff0888d8588',
      forking: {
        url: process.env.RINKEBY_RPC,
        //blockNumber: 10498650,
        accounts: [ process.env.PRIVATE_KEY ],
      }
    },

    rinkeby: {
      url: process.env.RINKEBY_RPC,
      accounts: [ process.env.PRIVATE_KEY ]
    }
  },
  gasReporter: {
    currency: 'USD',
    enabled: (process.env.GAS_REPORT) ? true : false,
    //gasPrice: 17,
    coinmarketcap: process.env.COINMARKETCAP_API
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETH_API_KEY
  }
};
