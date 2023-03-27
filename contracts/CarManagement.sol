// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract CarManagement {

    struct Car { 
        string number;        
        string color;
        string model;
    }

    mapping(string => Car) private carDetails;
    mapping(string => address) private carOwners;

    modifier onlyOwner(string memory _carNumber) {
        require(carOwners[_carNumber] == msg.sender, "Only the owner can transfer the ownership");
        _;
    }

    modifier carAlreadyRegistered(Car memory _carDetail) {
        require(carOwners[_carDetail.number] == address(0), "Car is already registered to someone!");
        _;
    }

    function storeCarDetails(Car memory _carDetail) public carAlreadyRegistered(_carDetail){
        carDetails[_carDetail.number] = _carDetail;
        carOwners[_carDetail.number] = msg.sender;
    }

    function retrieveCarDetails(string memory _carNumber) public view returns (Car memory){
        return carDetails[_carNumber];
    }

    function retrieveOwnerOfCar(string memory _carNumber) public view returns (address){
        return carOwners[_carNumber];
    }

    function transferOwnership(string memory _carNumber, address _newOwner) public onlyOwner(_carNumber){
        carOwners[_carNumber] = _newOwner;
    }
}