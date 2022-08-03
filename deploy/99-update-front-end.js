const { ethers, network } = require("hardhat")
const fs = require("fs")
const { frontEndAbiFile, frontEndContractsFile } = require("../helper-hardhat-config")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating to front end...")
        updateContractAddress()
        updateAbi()
        console.log("--------------- Front end updated! ---------------")
    }
}

async function updateAbi() {
    const multiSigWallet = await ethers.getContract("MultiSigWallet")
    fs.writeFileSync(
        frontEndAbiFile,
        multiSigWallet.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddress() {
    const multiSigWallet = await ethers.getContract("MultiSigWallet")
    const contractAddress = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    const chainId = network.config.chainId.toString()

    if (chainId in contractAddress) {
        if (!contractAddress[chainId].includes(multiSigWallet.address)) {
            contractAddress[chainId].push(multiSigWallet.address)
        }
    } else {
        contractAddress[chainId] = [multiSigWallet.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddress))
}

module.exports.tags = ["all", "frontend"]
