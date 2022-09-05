// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Radenu is AccessControl, ReentrancyGuard {
    using Counters for Counters.Counter;
    using Strings for uint256;
    using SafeERC20 for IERC20;

    Counters.Counter private orderId;

    IERC20 public transferToken;
    IERC20 public rewardsToken;

    enum OrderState {INITIATED, ACCEPTED, COMPLETED, FUFILLED, CANCELLED, INDISPUTE}
    
    
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MOD_ROLE = keccak256("MOD_ROLE");

        /* ========== CONSTRUCTOR ========== */

    constructor(address _transferToken, address _rewardsToken) {
        _grantRole(DEFAULT_ADMIN_ROLE, address(this));
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        transferToken = IERC20(_transferToken);
        rewardsToken = IERC20(_rewardsToken);
    }

    struct Order{
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
        OrderState state;
    }

    Order[] public openOrder;
    mapping (address => Order) public acceptedOrder;
   

    function initOrder(
        uint256 _amount, 
        uint256 _accountNumber, 
        string memory _accountName, 
        string memory _bankName,
        string memory _country,
        uint128 _exchangeRate) internal 
        
        {
            uint256 value = _amount - mintFee(_amount);
            openOrder.push(
                Order({
                    amount: value,
                    accountNumber: _accountNumber,
                    accountName: _accountName,
                    bankName: _bankName,
                    country: _country,
                    exchangeRate: _exchangeRate,
                    sender: payable(msg.sender),
                    receiver: payable(address(0)),
                    orderId: nextOrderId(),
                    duration: 0,
                    timeInitiated: block.timestamp,
                    state: OrderState.INITIATED
                })
            );
    }

    function initiateOrder (
        uint256 _amount, 
        uint256 _accountNumber, 
        string memory _accountName, 
        string memory _bankName,
        string memory _country,
        uint128 _exchangeRate
        ) 
        external nonReentrant
    {
        initOrder(_amount, _accountNumber, _accountName, _bankName, _country, _exchangeRate);
        require(_amount >= 10, "Cannot send less than 10");
        _totalSupply += _amount;
        transferToken.safeTransferFrom(msg.sender, address(this), _amount);
        emit OrderInitiated(msg.sender, _amount, block.timestamp);
    }

    function acceptOrder(uint256 _orderId) external nonReentrant {
        require(acceptedOrder[msg.sender].receiver == address(0), "FORBIDEN: Pending order");
        Order memory _acceptedOrder = findAndProcessOrder(_orderId);
        acceptedOrder[msg.sender] = _acceptedOrder;
        emit OrderAccepted(_acceptedOrder.sender, msg.sender, _acceptedOrder.amount, block.timestamp);
    }

    function completeOrder(uint256 _orderId) external nonReentrant {
        Order[] memory _openOrder = openOrder;
        for (uint256 i = 0; i < _openOrder.length; i++){
                if(_openOrder[i].orderId == _orderId) {
                    openOrder[i].state = OrderState.COMPLETED;
                     emit OrderCompleted(
                         _openOrder[i].sender, 
                         msg.sender, 
                         _openOrder[i].amount, 
                         block.timestamp
                         );
                }
                 acceptedOrder[msg.sender].state = OrderState.COMPLETED;
        }
    }

    function releasePayment(uint256 _orderId) external nonReentrant {
        Order[] memory _openOrder = openOrder;
        for (uint256 i = 0; i < _openOrder.length; i++){
                if(_openOrder[i].orderId == _orderId) {
                    require(
                        _openOrder[i].sender == msg.sender &&
                        _openOrder[i].state == OrderState.COMPLETED,
                        "RADENU: FORBIDDEN"
                        );
                    uint256 amount = openOrder[i].amount;
                    openOrder[i].state = OrderState.FUFILLED;
                    delete acceptedOrder[_openOrder[i].receiver];
                    _totalSupply -= amount;
                    transferToken.transfer(_openOrder[i].receiver, amount);
                    emit OrderFufilled(
                         _openOrder[i].sender, 
                         _openOrder[i].receiver, 
                         _openOrder[i].amount, 
                         block.timestamp
                         );
                }       
        }

    }

    function cancelOrder(uint256 _orderId) external nonReentrant {
        Order[] memory _openOrder = openOrder;
        for (uint256 i = 0; i < _openOrder.length; i++){
                if(_openOrder[i].orderId == _orderId) {
                    require(
                        _openOrder[i].sender == msg.sender &&
                        _openOrder[i].state == OrderState.INITIATED,
                        "RADENU: FORBIDDEN"
                    );
                    openOrder[i].state = OrderState.CANCELLED;
                    uint256 amount = _openOrder[i].amount;
                    uint256 total = amount + mintFee(amount);
                    transferToken.transfer(msg.sender, total);
                    emit OrderCancelled(
                         msg.sender, 
                         amount, 
                         block.timestamp
                         );
                }       
        }

    }

    function creditUser(address user, uint256 _orderId) external nonReentrant onlyRole(MOD_ROLE){
        Order[] memory _openOrder = openOrder;
        for (uint256 i=0; i < _openOrder.length; i++){
                if(_openOrder[i].orderId == _orderId) {
                    uint256 amount = openOrder[i].amount;
                    _totalSupply -= amount;
                    transferToken.transfer(user, amount);
                    emit OrderDisputed(
                         _openOrder[i].sender, 
                         _openOrder[i].receiver, 
                         _openOrder[i].amount, 
                         block.timestamp
                         );
                }
        }
    }

    function openDispute(uint256 _orderId) external nonReentrant {
        Order[] memory _openOrder = openOrder;
        for (uint256 i=0; i < _openOrder.length; i++){
                if(_openOrder[i].orderId == _orderId) {
                    require(
                        openOrder[i].receiver == msg.sender || 
                        openOrder[i].sender == msg.sender, 
                        "RADENU: FORBIDDEN"
                        );
                    openOrder[i].state = OrderState.INDISPUTE;
                    emit OrderDisputed(
                         _openOrder[i].sender, 
                         _openOrder[i].receiver, 
                         _openOrder[i].amount, 
                         block.timestamp
                         );
                }
        }
    }

    function mintFee(uint256 amount) internal pure returns (uint256){
        return (uint256(1) / uint256(500)) *  amount;
    }

    // ============ SUPPORTING FUNCTIONS ============

    function nextOrderId() private returns (uint256) {
        orderId.increment();
        return orderId.current();
    }

    function orderTotal() external view returns (uint256) {
        return orderId.current();
    }

    function assignRole (address user) external onlyRole(ADMIN_ROLE){
        _setupRole(MOD_ROLE, user);
    }

    function findAndProcessOrder(uint256 id) internal returns (Order memory){
        Order[] memory _openOrder = openOrder;
        for (uint256 i=0; i < _openOrder.length; i++){
                if(_openOrder[i].orderId == id) {
                    require(
                        openOrder[i].receiver == address(0), 
                        "FORBIDDEN: Order Accepted by Someone Else"
                        );
                    openOrder[i].receiver = payable(msg.sender);
                    openOrder[i].state = OrderState.ACCEPTED;
                    openOrder[i].duration = uint128 (block.timestamp);
                    return _openOrder[i];
                }
        }
        revert('Not found');
    }

       // ============ OWNER-ONLY ADMIN FUNCTIONS ============

    function withdraw() public onlyRole(ADMIN_ROLE) {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function withdrawTokens(IERC20 token) 
    public 
    onlyRole(ADMIN_ROLE) 
    {
        uint256 balance = token.balanceOf(address(this));
        token.transfer(msg.sender, balance);
    }
    
    //EVENTS
    event OrderInitiated(address indexed sender, uint256 amount, uint256 when);
    event OrderAccepted(address indexed sender, address indexed reciever, uint256 amount, uint256 when);
    event OrderCompleted(address indexed sender, address indexed reciever, uint256 amount, uint256 when);
    event OrderFufilled(address indexed sender, address indexed reciever, uint256 amount, uint256 when);
    event OrderCancelled(address indexed sender, uint256 amount, uint256 when);
    event OrderDisputed(address indexed sender, address indexed reciever, uint256 amount, uint256 when);
    event UserCredited(address indexed sender, uint256 amount, uint256 when);
   

}
