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
  //        Masterchef Constructor Args,
  // address _devaddr,
  // address _feeAddress,
  // uint256 _eggPerBlock,
  // uint256 _startBlock
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // constructor args
  
  const cob = "0x793AcF39c3d605d3aD042Ae01fd290a6fE489164"
  const provider = new ethers.providers.JsonRpcProvider("https://rpc-mainnet.maticvigil.com/v1/4b331c188697971af1cd6f05bb7065bc358b7e89");
  const account = new ethers.Wallet(process.env.PRIVATE_KEY);
  const signer = account.connect(provider);
  const devaddress = signer.address;
  const feeaddress = signer.address;
  const eggPerBlock = ethers.utils.parseUnits("2", "ether");
  const startblock = BigNumber.from(20285829);


  // We get the contract to deploy
  const MasterChefV2 = await ethers.getContractFactory("MasterChefV2");
  const masterchef = await MasterChefV2.deploy(cob, devaddress, feeaddress, eggPerBlock, startblock);

  await masterchef.deployed();

  console.log("Master Chief 117 deployed to:", masterchef.address);
  const CobToken = await ethers.getContractFactory("CobToken");
  const cobContract = CobToken.attach(cob);
  await cobContract.transferOwnership(masterchef.address);

  console.log("Transferred ownership of Cob to MasterChief for minting & staking rewards")
}

//renounce ownership of COB token to Masterchef



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// 0xc9B2b713242c7Fc144ee7AC3b4D6f329EdbD3cba - MasterChef
///0xd79E2Ec72aFeaB56171f3e6d4a1879d8b955a384 - Farm token
// 0x7DBaFf79d13A0c842777742A86aE3aCAc9817250 - alt1
// 0xCCd1660797fe05dAe3439568aD39D2a4DacEab0e - alt2