const hre = require("hardhat");

async function main() {
  const CarManagement = await hre.ethers.getContractFactory("CarManagement");

  const gasPrice = await CarManagement.signer.getGasPrice();
  console.log(`Current gas price: ${gasPrice}`);

  const estimatedGas = await CarManagement.signer.estimateGas(
    CarManagement.getDeployTransaction()
  );
  console.log(`Estimated gas: ${estimatedGas}`);

  const deploymentPrice = gasPrice.mul(estimatedGas);
  const deployerBalance = await CarManagement.signer.getBalance();
  console.log(
    `Deployer balance:  ${hre.ethers.utils.formatEther(deployerBalance)}`
  );
  console.log(
    `Deployment price:  ${hre.ethers.utils.formatEther(deploymentPrice)}`
  );

  if (deployerBalance.lt(deploymentPrice)) {
    throw new Error(
      `Insufficient funds. Top up your account balance by ${hre.ethers.utils.formatEther(
        deploymentPrice.sub(deployerBalance)
      )}`
    );
  }

  const carManagement = await CarManagement.deploy();
  await carManagement.deployed();
  console.log("Contract Adress: ", carManagement.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
