
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

});

