// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoPointsConverter {
    address public owner;
    uint256 public ethBalance;
    uint256 public conversionRate = 1000; // 1000 puntos = 1 ETH
    mapping(address => uint256) public points;
    mapping(address => uint256) public ethBalances;

    event PointsAdded(address indexed user, uint256 amount);
    event PointsConverted(address indexed user, uint256 pointsAmount, uint256 ethAmount);
    event ETHDeposited(address indexed user, uint256 amount);
    event ETHWithdrawn(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el propietario puede ejecutar");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Depositar ETH en el contrato
    function depositETH() external payable {
        ethBalances[msg.sender] += msg.value;
        ethBalance += msg.value;
        emit ETHDeposited(msg.sender, msg.value);
    }

    // Retirar ETH del contrato
    function withdrawETH(uint256 amount) external {
        require(ethBalances[msg.sender] >= amount, "Saldo insuficiente");
        ethBalances[msg.sender] -= amount;
        ethBalance -= amount;
        payable(msg.sender).transfer(amount);
        emit ETHWithdrawn(msg.sender, amount);
    }

    // Añadir puntos (solo propietario)
    function addPoints(address user, uint256 amount) external onlyOwner {
        points[user] += amount;
        emit PointsAdded(user, amount);
    }

    // Convertir puntos a ETH
    function convertToETH(uint256 pointsAmount) external {
        require(points[msg.sender] >= pointsAmount, "Puntos insuficientes");
        uint256 ethAmount = pointsAmount / conversionRate;
        
        points[msg.sender] -= pointsAmount;
        ethBalances[msg.sender] += ethAmount;
        ethBalance += ethAmount;
        
        emit PointsConverted(msg.sender, pointsAmount, ethAmount);
    }

    // Cambiar tasa de conversion (solo propietario)
    function setConversionRate(uint256 newRate) external onlyOwner {
        conversionRate = newRate;
    }

    // Obtener saldo de ETH del usuario
    function getUserETHBalance(address user) external view returns (uint256) {
        return ethBalances[user];
    }

    // Obtener puntos del usuario
    function getUserPoints(address user) external view returns (uint256) {
        return points[user];
    }
}
