# Solidity API

## Radenu

### orderId

```solidity
struct Counters.Counter orderId
```

### transferToken

```solidity
contract IERC20 transferToken
```

### rewardsToken

```solidity
contract IERC20 rewardsToken
```

### OrderState

```solidity
enum OrderState {
  INITIATED,
  ACCEPTED,
  COMPLETED,
  FUFILLED,
  CANCELLED,
  INDISPUTE
}
```

### _totalSupply

```solidity
uint256 _totalSupply
```

### _balances

```solidity
mapping(address => uint256) _balances
```

### ADMIN_ROLE

```solidity
bytes32 ADMIN_ROLE
```

### MOD_ROLE

```solidity
bytes32 MOD_ROLE
```

### constructor

```solidity
constructor(address _transferToken) public
```

### Order

```solidity
struct Order {
  uint256 amount;
  uint256 accountNumber;
  string accountName;
  string bankName;
  string country;
  uint128 exchangeRate;
  address payable sender;
  address payable receiver;
  uint256 orderId;
  uint128 duration;
  uint256 timeInitiated;
  enum Radenu.OrderState state;
}
```

### order

```solidity
struct Radenu.Order[] order
```

### acceptedOrder

```solidity
mapping(address => struct Radenu.Order) acceptedOrder
```

### initOrder

```solidity
function initOrder(uint256 _amount, uint256 _accountNumber, string _accountName, string _bankName, string _country, uint128 _exchangeRate) internal
```

### createOrder

```solidity
function createOrder(uint256 _amount, uint256 _accountNumber, string _accountName, string _bankName, string _country, uint128 _exchangeRate) external
```

### acceptOrder

```solidity
function acceptOrder(uint256 _orderId) external
```

### completeOrder

```solidity
function completeOrder(uint256 _orderId) external
```

### releasePayment

```solidity
function releasePayment(uint256 _orderId) external
```

### cancelOrder

```solidity
function cancelOrder(uint256 _orderId) external
```

### creditUser

```solidity
function creditUser(address user, uint256 _orderId) external
```

### openDispute

```solidity
function openDispute(uint256 _orderId) external
```

### getTotalOrder

```solidity
function getTotalOrder() external view returns (struct Radenu.Order[])
```

### mintFee

```solidity
function mintFee(uint256 amount) internal pure returns (uint256)
```

### nextOrderId

```solidity
function nextOrderId() private returns (uint256)
```

### orderTotal

```solidity
function orderTotal() external view returns (uint256)
```

### findAndProcessOrder

```solidity
function findAndProcessOrder(uint256 id) internal returns (struct Radenu.Order)
```

### withdraw

```solidity
function withdraw() public
```

### withdrawTokens

```solidity
function withdrawTokens(contract IERC20 token) public
```

### OrderInitiated

```solidity
event OrderInitiated(address sender, uint256 amount, uint256 when)
```

### OrderAccepted

```solidity
event OrderAccepted(address sender, address reciever, uint256 amount, uint256 when)
```

### OrderCompleted

```solidity
event OrderCompleted(address sender, address reciever, uint256 amount, uint256 when)
```

### OrderFufilled

```solidity
event OrderFufilled(address sender, address reciever, uint256 amount, uint256 when)
```

### OrderCancelled

```solidity
event OrderCancelled(address sender, uint256 amount, uint256 when)
```

### OrderDisputed

```solidity
event OrderDisputed(address sender, address reciever, uint256 amount, uint256 when)
```

### UserCredited

```solidity
event UserCredited(address sender, uint256 amount, uint256 when)
```

## Radenu

### orderId

```solidity
struct Counters.Counter orderId
```

### transferToken

```solidity
contract IERC20 transferToken
```

### rewardsToken

```solidity
contract IERC20 rewardsToken
```

### OrderState

```solidity
enum OrderState {
  INITIATED,
  ACCEPTED,
  COMPLETED,
  FUFILLED,
  CANCELLED,
  INDISPUTE
}
```

### _totalSupply

```solidity
uint256 _totalSupply
```

### _balances

```solidity
mapping(address => uint256) _balances
```

### ADMIN_ROLE

```solidity
bytes32 ADMIN_ROLE
```

### MOD_ROLE

```solidity
bytes32 MOD_ROLE
```

### constructor

```solidity
constructor(address _transferToken) public
```

### Order

```solidity
struct Order {
  uint256 amount;
  uint256 accountNumber;
  string accountName;
  string bankName;
  string country;
  uint128 exchangeRate;
  address payable sender;
  address payable receiver;
  uint256 orderId;
  uint128 duration;
  uint256 timeInitiated;
  enum Radenu.OrderState state;
}
```

### order

```solidity
struct Radenu.Order[] order
```

### acceptedOrder

```solidity
mapping(address => struct Radenu.Order) acceptedOrder
```

### initOrder

```solidity
function initOrder(uint256 _amount, uint256 _accountNumber, string _accountName, string _bankName, string _country, uint128 _exchangeRate) internal
```

### createOrder

```solidity
function createOrder(uint256 _amount, uint256 _accountNumber, string _accountName, string _bankName, string _country, uint128 _exchangeRate) external
```

### acceptOrder

```solidity
function acceptOrder(uint256 _orderId) external
```

### completeOrder

```solidity
function completeOrder(uint256 _orderId) external
```

### releasePayment

```solidity
function releasePayment(uint256 _orderId) external
```

### cancelOrder

```solidity
function cancelOrder(uint256 _orderId) external
```

### creditUser

```solidity
function creditUser(address user, uint256 _orderId) external
```

### openDispute

```solidity
function openDispute(uint256 _orderId) external
```

### getTotalOrder

```solidity
function getTotalOrder() external view returns (struct Radenu.Order[])
```

### mintFee

```solidity
function mintFee(uint256 amount) internal pure returns (uint256)
```

### nextOrderId

```solidity
function nextOrderId() private returns (uint256)
```

### orderTotal

```solidity
function orderTotal() external view returns (uint256)
```

### findAndProcessOrder

```solidity
function findAndProcessOrder(uint256 id) internal returns (struct Radenu.Order)
```

### withdraw

```solidity
function withdraw() public
```

### withdrawTokens

```solidity
function withdrawTokens(contract IERC20 token) public
```

### OrderInitiated

```solidity
event OrderInitiated(address sender, uint256 amount, uint256 when)
```

### OrderAccepted

```solidity
event OrderAccepted(address sender, address reciever, uint256 amount, uint256 when)
```

### OrderCompleted

```solidity
event OrderCompleted(address sender, address reciever, uint256 amount, uint256 when)
```

### OrderFufilled

```solidity
event OrderFufilled(address sender, address reciever, uint256 amount, uint256 when)
```

### OrderCancelled

```solidity
event OrderCancelled(address sender, uint256 amount, uint256 when)
```

### OrderDisputed

```solidity
event OrderDisputed(address sender, address reciever, uint256 amount, uint256 when)
```

### UserCredited

```solidity
event UserCredited(address sender, uint256 amount, uint256 when)
```

## Currency

### constructor

```solidity
constructor() public
```

### mint

```solidity
function mint() external
```

## Radenu

### orderId

```solidity
struct Counters.Counter orderId
```

### transferToken

```solidity
contract IERC20 transferToken
```

### rewardsToken

```solidity
contract IERC20 rewardsToken
```

### OrderState

```solidity
enum OrderState {
  INITIATED,
  ACCEPTED,
  COMPLETED,
  FUFILLED,
  CANCELLED,
  INDISPUTE
}
```

### _totalSupply

```solidity
uint256 _totalSupply
```

### _balances

```solidity
mapping(address => uint256) _balances
```

### ADMIN_ROLE

```solidity
bytes32 ADMIN_ROLE
```

### MOD_ROLE

```solidity
bytes32 MOD_ROLE
```

### constructor

```solidity
constructor(address _transferToken) public
```

### Order

```solidity
struct Order {
  uint256 amount;
  uint256 accountNumber;
  string accountName;
  string bankName;
  string country;
  uint128 exchangeRate;
  address payable sender;
  address payable receiver;
  uint256 orderId;
  uint128 duration;
  uint256 timeInitiated;
  enum Radenu.OrderState state;
}
```

### order

```solidity
struct Radenu.Order[] order
```

### acceptedOrder

```solidity
mapping(address => struct Radenu.Order) acceptedOrder
```

### initOrder

```solidity
function initOrder(uint256 _amount, uint256 _accountNumber, string _accountName, string _bankName, string _country, uint128 _exchangeRate) internal
```

### createOrder

```solidity
function createOrder(uint256 _amount, uint256 _accountNumber, string _accountName, string _bankName, string _country, uint128 _exchangeRate) external
```

### acceptOrder

```solidity
function acceptOrder(uint256 _orderId) external
```

### completeOrder

```solidity
function completeOrder(uint256 _orderId) external
```

### releasePayment

```solidity
function releasePayment(uint256 _orderId) external
```

### cancelOrder

```solidity
function cancelOrder(uint256 _orderId) external
```

### creditUser

```solidity
function creditUser(address user, uint256 _orderId) external
```

### openDispute

```solidity
function openDispute(uint256 _orderId) external
```

### getTotalOrder

```solidity
function getTotalOrder() external view returns (struct Radenu.Order[])
```

### mintFee

```solidity
function mintFee(uint256 amount) internal pure returns (uint256)
```

### nextOrderId

```solidity
function nextOrderId() private returns (uint256)
```

### orderTotal

```solidity
function orderTotal() external view returns (uint256)
```

### findAndProcessOrder

```solidity
function findAndProcessOrder(uint256 id) internal returns (struct Radenu.Order)
```

### withdraw

```solidity
function withdraw() public
```

### withdrawTokens

```solidity
function withdrawTokens(contract IERC20 token) public
```

### OrderInitiated

```solidity
event OrderInitiated(address sender, uint256 amount, uint256 when)
```

### OrderAccepted

```solidity
event OrderAccepted(address sender, address reciever, uint256 amount, uint256 when)
```

### OrderCompleted

```solidity
event OrderCompleted(address sender, address reciever, uint256 amount, uint256 when)
```

### OrderFufilled

```solidity
event OrderFufilled(address sender, address reciever, uint256 amount, uint256 when)
```

### OrderCancelled

```solidity
event OrderCancelled(address sender, uint256 amount, uint256 when)
```

### OrderDisputed

```solidity
event OrderDisputed(address sender, address reciever, uint256 amount, uint256 when)
```

### UserCredited

```solidity
event UserCredited(address sender, uint256 amount, uint256 when)
```

