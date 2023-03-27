const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Test CarManagement", () => {
  it("should insert car details with owner assigning", async () => {
    const [owner] = await ethers.getSigners();
    const CarManagement = await ethers.getContractFactory("CarManagement");
    const carManagment = await CarManagement.deploy();

    const newCarDetails = {
      number: "ABC-123",
      color: "red",
      model: "2023",
    };

    await carManagment.storeCarDetails(newCarDetails);

    const carOwner = await carManagment.retrieveOwnerOfCar(
      newCarDetails.number
    );

    expect(owner.address).to.be.equals(carOwner);
  });

  it("should return correct car details", async () => {
    const [owner] = await ethers.getSigners();
    const CarManagement = await ethers.getContractFactory("CarManagement");
    const carManagment = await CarManagement.deploy();

    const newCarDetails = {
      number: "ABC-123",
      color: "red",
      model: "2023",
    };

    await carManagment.storeCarDetails(newCarDetails);

    const carDetails = await carManagment.retrieveCarDetails(
      newCarDetails.number
    );

    expect(carDetails.number).to.be.equals(newCarDetails.number);
    expect(carDetails.color).to.be.equals(newCarDetails.color);
    expect(carDetails.model).to.be.equals(newCarDetails.model);
  });

  it("should transfer car ownership", async () => {
    const [owner] = await ethers.getSigners();
    const buyer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const CarManagement = await ethers.getContractFactory("CarManagement");
    const carManagment = await CarManagement.deploy();

    const carDetails = {
      number: "ABC-123",
      color: "red",
      model: "2023",
    };

    await carManagment.storeCarDetails(carDetails);

    let currentCarOwner = await carManagment.retrieveOwnerOfCar(
      carDetails.number
    );

    expect(currentCarOwner).to.be.equals(owner.address);

    await carManagment.transferOwnership(carDetails.number, buyer);

    currentCarOwner = await carManagment.retrieveOwnerOfCar(carDetails.number);

    expect(currentCarOwner).to.be.equals(buyer);
  });
});
