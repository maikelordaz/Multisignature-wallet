const networkConfig = {
    4: {
        name: "rinkeby",
    },
    31337: {
        name: "hardhat",
    },
}

const developmentChains = ["hardhat", "localhost"]
const frontEndAbiFile = "../nexjs-multisig-wallet/constants/abi.json"
const frontEndContractsFile = "../nexjs-multisig-wallet/constants/contractAddresses.json"

module.exports = {
    networkConfig,
    developmentChains,
    frontEndAbiFile,
    frontEndContractsFile,
}
