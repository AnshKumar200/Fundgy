# Fundgy

## Getting Started

### Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Nodejs](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install) instead of `npm`

## Quickstart

```
git clone https://github.com/AnshKumar200/Fundgy.git
cd Fundgy
cd contracts
yarn
yarn hardhat deploy
```


# Deployment to a Testnet or Mainnet

### 1. Setup Environment Variables

You'll want to set your `SEPOLIA_RPC_URL` and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file, similar to what you see in `.env.example`.

- `PRIVATE_KEY`: The private key of your account (like from [metamask](https://metamask.io/)). You can [learn how to export it here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
- `SEPOLIA_RPC_URL`: This is url of the Sepolia testnet node you're working with. You can get setup with one for free from [Alchemy](https://alchemy.com/?a=673c802981)

Add `COINMARKETCAP_API_KEY` and `ETHERSCAN_API_KEY` for more details and verification in the `.env` file. They are not required though.

- `COINMARKETCAP_API_KEY`: To get a USD estimation of gas cost. You can get one for free from [CoinMarketCap](https://pro.coinmarketcap.com/signup)
Then, uncomment the line `coinmarketcap: COINMARKETCAP_API_KEY,` in `hardhat.config.js` to get the USD estimation. Just note, everytime you run your tests it will use an API call, so it might make sense to disable using coinmarketcap until you need it. You can disable it by just commenting the line back out. 

- `ETHERSCAN_API_KEY`: If you deploy to a testnet or mainnet, you can verify it if you get an [API Key](https://etherscan.io/myapikey) from Etherscan and set it as an environment variable named `ETHERSCAN_API_KEY`.
  - However, you can manual verify with:
    
    ```
    yarn hardhat verify --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
    ```

### 2. Get Testnet ETH

Head over to [faucets.chain.link](https://faucets.chain.link/) and get some testnet ETH. You should see the ETH show up in your metamask.

### 3. Deploy on Sepolia Testnet

```
yarn hardhat deploy --network sepolia
```

## Testing

```
yarn hardhat test
```

## Test Coverage

```
yarn hardhat coverage
```
## Estimate Gas

You can estimate how much gas things cost by running:

```
yarn hardhat test
```

And you'll see it in an output file called `gas-report.txt`

# Thank you!