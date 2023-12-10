const { ethers, network } = require("hardhat")
const fs = require("fs")

const FRONT_END_ADDRESS_FILE = "../src/constants/contractAddress.json"
const FRONT_END_ABI_FILE = "../src/constants/abi.json"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front end...")

        updateContractAddresses()
        updateAbi()
    }
}

async function updateAbi() {
    const crowdFunding = await ethers.getContract("CrowdFunding")
    await fs.writeFileSync(
        FRONT_END_ABI_FILE,
        crowdFunding.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    const crowdFunding = await ethers.getContract("CrowdFunding")
    const contractAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESS_FILE, "utf8"))
    if (network.config.chainId.toString() in contractAddresses) {
        if (!contractAddresses[network.config.chainId.toString()].includes(crowdFunding.address)) {
            contractAddresses[network.config.chainId.toString()].push(crowdFunding.address)
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [crowdFunding.address]
    }
    await fs.writeFileSync(FRONT_END_ADDRESS_FILE, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"]
