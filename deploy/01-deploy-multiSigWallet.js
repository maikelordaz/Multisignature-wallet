const { getNamedAccounts, deployments, network, run } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer, Alice, Bob, Charlie } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : network.config.blockConfirmations
    const owners = [deployer, Alice, Bob, Charlie]
    const NUM_CONFIRMATIONS_REQUIRED = 3
    const args = [owners, NUM_CONFIRMATIONS_REQUIRED]

    log("--------------- Deploying... ---------------")
    const multiSigWallet = await deploy("MultiSigWallet", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("--------------- Verifying... ---------------")
        await verify(multiSigWallet.address, args)
    } else {
        log("--------------- Local network detected! ---------------")
    }

    log("--------------- Deploy process done! ---------------")
}

module.exports.tags = ["all", "wallet"]
