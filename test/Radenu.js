// const {
//   time,
//   loadFixture,
// } = require("@nomicfoundation/hardhat-network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers} = require("hardhat");


describe("Radenu", async () => {
  let Currency, Radenu, currency, contract, owner
  const amount = ethers.utils.parseEther("10100")
  const total = ethers.utils.parseEther("100")

  before(async () => {
    Currency = await ethers.getContractFactory("Currency")
    currency = await Currency.deploy()
    await currency.deployed()
    await currency.mint()

    Radenu = await ethers.getContractFactory("Radenu");
    contract = await Radenu.deploy(currency.address);
    owner = await ethers.getSigner()
    console.log("Address: ", owner.address)
    await contract.deployed();

  })

  describe("Radenu Contract Deployment", async () => {
    it("Address should be equall to owner address", async() => {
      expect(await contract.owner()).to.equal(owner.address)
    })
  })

  describe("Attempt to create order", async () => {
    it("Should fail to create order as contract is not approved", async() => {
      await expect(contract.createOrder(200, 1020304050, "John Doe", "First Bank", "Nigeria", 702))
      .to.be.revertedWith("ERC20: insufficient allowance")
    })
  })

  describe("Attempt to create order", async () => {
    it("Should fail to create order as contract is not approved", async() => {
      await expect(contract.createOrder(200, 1020304050, "John Doe", "First Bank", "Nigeria", 702))
      .to.be.revertedWith("ERC20: insufficient allowance")
    })
  })

  describe("Approve token for spending", async () => {
    it("Should approve 1000 amount of token", async() => {
      currency.approve(contract.address, amount)
      const allowance = await currency.allowance(owner.address, contract.address)
      const value = parseInt(ethers.utils.formatUnits(allowance))
      console.log("The value is: ", value)
      await expect(Math.round(amount / (10 ** 18))).to.equal(value)
    })
  })

  describe("Create order", async () => {
    it("Should pass with lenght of 1", async() => {
      await contract.createOrder(total, 1020304050, "John Doe", "First Bank", "Nigeria", 702)
      let orders = await contract.getTotalOrder()
      expect (orders.length).to.equal(1)
    })
  })
  
  describe("Create 100 order", async () => {
    it("Should pass with length of 101", async() => {
      for (let i = 0; i < 100; i++){
        await contract.createOrder(total, 1020304050+i, `John Doe ${i}`, `First Bank ${i}`, "Nigeria", 702)
      }
      let orders = await contract.getTotalOrder()
      v = await currency.balanceOf(contract.address)
      console.log("Balance in cuntract is: ", parseInt(ethers.utils.formatUnits(v)))
      console.log("transfer amount is: ", orders[0])
      expect (orders.length).to.equal(101)
    })
  })

  describe("Accept order", async () => {
    it("Should pass with order state ACCEPTED", async() => {
      let orders = await contract.getTotalOrder()
      //console.log("OrderId before :", orders[10])
      await contract.acceptOrder(11)
      let mOrders = await contract.getTotalOrder()
      //console.log("OrderId After :", mOrders[10])
      expect(mOrders[10].state).to.equal(1)
    })
  })

  describe("Complete order", async () => {
    it("Should pass with order state COMPLETED", async() => {
      let orders = await contract.getTotalOrder()
      console.log("OrderId before :", orders[10])
      await contract.completeOrder(11)
      let mOrders = await contract.getTotalOrder()
      console.log("OrderId After :", mOrders[10])
      expect(mOrders[10].state).to.equal(2)
    })
  })






  // describe("Add Subgraph", async () => {
  //   it("Should pass with length of 1", async() => {
  //     const amount = ethers.utils.parseEther("1000000")
  //     await token.approve(contract.address, amount);
  //     contract.addSubGraph("test", "test1", "test2", "test3")
  //     //expect(await contract.get().length).to.equal(1)
  //     expect(await contract.multiplier(owner.address)).to.equal(1)
      
  //   })
  // })

});


  // beforeEach(async () => {
  //   const Greeter = await ethers.getContractFactory("MillerProtocol");
  //   const greeter = await Greeter.deploy("0x55d37DB5Ce7b2bE7f05DA00fF30A9e1c8f5D8437", "0x40443d961c12444f2ec5f7d07afb6fa6e07bedeb");
  //   await greeter.deployed();
  //   await greeter.addSubGraph("test", "test1", "test2", "test3")
  // })
  
  // describe("Check Created Subgraph", function () {
  //   it("Should return the name of the subgraph", async function () {
  //     const Greeter = await ethers.getContractFactory("MillerProtocol");
  //     const greeter = await Greeter.deploy("0x55d37DB5Ce7b2bE7f05DA00fF30A9e1c8f5D8437", "0x40443d961c12444f2ec5f7d07afb6fa6e07bedeb");
  //     await greeter.deployed();
  
  //     //expect(await greeter.greet()).to.equal("Hello, world!");
  
  //     // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
  
  //     // // wait until the transaction is mined
  //     // await setGreetingTx.wait();
  
  //     // expect(await greeter.greet()).to.equal("Hola, mundo!");
  //   });
  // });

  // function approve(){
  //   const amount = utils.parseEther("1000000")
  //   const txHash = await contract.approve(millerProtocolAddress, amount);
  // }





// describe("Lock", function () {
//   // We define a fixture to reuse the same setup in every test.
//   // We use loadFixture to run this setup once, snapshot that state,
//   // and reset Hardhat Network to that snapshot in every test.
//   async function deployOneYearLockFixture() {
//     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//     const ONE_GWEI = 1_000_000_000;

//     const lockedAmount = ONE_GWEI;
//     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

//     // Contracts are deployed using the first signer/account by default
//     const [owner, otherAccount] = await ethers.getSigners();

//     const Lock = await ethers.getContractFactory("Lock");
//     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//     return { lock, unlockTime, lockedAmount, owner, otherAccount };
//   }

//   describe("Deployment", function () {
//     it("Should set the right unlockTime", async function () {
//       const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.unlockTime()).to.equal(unlockTime);
//     });

//     it("Should set the right owner", async function () {
//       const { lock, owner } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.owner()).to.equal(owner.address);
//     });

//     it("Should receive and store the funds to lock", async function () {
//       const { lock, lockedAmount } = await loadFixture(
//         deployOneYearLockFixture
//       );

//       expect(await ethers.provider.getBalance(lock.address)).to.equal(
//         lockedAmount
//       );
//     });

//     it("Should fail if the unlockTime is not in the future", async function () {
//       // We don't use the fixture here because we want a different deployment
//       const latestTime = await time.latest();
//       const Lock = await ethers.getContractFactory("Lock");
//       await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
//         "Unlock time should be in the future"
//       );
//     });
//   });

//   describe("Withdrawals", function () {
//     describe("Validations", function () {
//       it("Should revert with the right error if called too soon", async function () {
//         const { lock } = await loadFixture(deployOneYearLockFixture);

//         await expect(lock.withdraw()).to.be.revertedWith(
//           "You can't withdraw yet"
//         );
//       });

//       it("Should revert with the right error if called from another account", async function () {
//         const { lock, unlockTime, otherAccount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // We can increase the time in Hardhat Network
//         await time.increaseTo(unlockTime);

//         // We use lock.connect() to send a transaction from another account
//         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
//           "You aren't the owner"
//         );
//       });

//       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//         const { lock, unlockTime } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // Transactions are sent using the first signer by default
//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).not.to.be.reverted;
//       });
//     });

//     describe("Events", function () {
//       it("Should emit an event on withdrawals", async function () {
//         const { lock, unlockTime, lockedAmount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw())
//           .to.emit(lock, "Withdrawal")
//           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//       });
//     });

//     describe("Transfers", function () {
//       it("Should transfer the funds to the owner", async function () {
//         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).to.changeEtherBalances(
//           [owner, lock],
//           [lockedAmount, -lockedAmount]
//         );
//       });
//     });
//   });
// });
