// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { BigNumber } = require("ethers");
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // constructor args
  const supply = ethers.utils.parseUnits("10000000", "ether");
  const name = "Alt Token"
  const name2 = "Alt Token2"
  const symbol = "ALT"




  // We get the contract to deploy
  const MockToken = await ethers.getContractFactory("MockERC20");

  const mockToken = await MockToken.deploy(name, symbol, supply);
  const mockToken2 = await MockToken.deploy(name2, symbol, supply);

  const mock1 = await mockToken.deployed();
  const mock2 = await mockToken2.deployed()

  console.log(`
    Mock Token 1 deployed at ${mock1.address}

    Mock Token 2 deployed at ${mock2.address}
  `);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



///0xd79E2Ec72aFeaB56171f3e6d4a1879d8b955a384 - Farm token
// 0x7DBaFf79d13A0c842777742A86aE3aCAc9817250 - alt1
// 0xCCd1660797fe05dAe3439568aD39D2a4DacEab0e - alt2