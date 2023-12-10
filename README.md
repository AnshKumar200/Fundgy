# Fundgy
Fundgy is a decentralized application, transforming the crowdfunding landscape for the digital era. This innovative platform empowers individuals and organizations to seamlessly raise funds for their projects, causes, or initiatives while providing a transparent and secure environment for contributors.

## Getting Started

### Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Nodejs](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install) instead of `npm`

### Quickstart

```
git clone https://github.com/AnshKumar200/Fundgy.git
cd Fundgy
yarn
yarn start
```
### Usage

#### 1. Run your <ins>local blockchain</ins> with the lottery code

> In a different terminal/command line

```
git clone https://github.com/AnshKumar200/Fundgy.git
cd Fundgy
cd contracts
yarn
yarn hardhat node
```

#### 2. Add hardhat network to your metamask/wallet

- Get the RPC_URL of your hardhat node (usually `http://127.0.0.1:8545/`)
- Go to your wallet and add a new network. [See instructions here.](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC)
  - Network Name: Hardhat-Localhost
  - New RPC URL: http://127.0.0.1:8545/
  - Chain ID: 31337
  - Currency Symbol: ETH (or GO)
  - Block Explorer URL: None

Ideally, you'd then [import one of the accounts](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account) from hardhat to your wallet/metamask. 

#### 3. Run this code

Back in a different terminal with the code from this repo, run:

```
yarn start
```
It will create a local instance of the Fundgy.

Head over to your [localhost](http://localhost:3000).

## Inspiration
In today's interconnected world, creativity and initiative abound. Individuals are brimming with ideas for projects, causes, and initiatives that have the potential to change the world. However, the traditional funding landscape often presents insurmountable barriers, leaving many worthy endeavors unrealized. <br>
Fundgy is more than simply a crowdfunding website; it's a bridge that connects visionaries and people who believe in the power of group effect, as well as a catalyst for positive change and a facilitator of aspirations. The idea behind Fundgy is the conviction that we can unleash the full potential of human creativity and compassion in the digital era by democratizing fundraising and embracing the values of transparency and security. All ideas, no matter how big or small, have the potential to inspire, create, and have a lasting impact on the world if we work together to achieve that future.


## What It Does

Fundgy is a decentralized application designed to transform and modernize the crowdfunding landscape. The project serves as a platform where individuals and organizations can raise funds for their projects, causes, or initiatives in a more seamless, transparent, and secure manner. Here are the key functionalities and features of Fundgy:

- **Decentralization**:

    Fundgy operates on a decentralized model, meaning that it doesn't rely on a central authority or intermediaries to manage transactions or control the flow of funds. This decentralization is enabled through blockchain technology, which ensures a transparent and democratic fundraising environment.

- **Seamless Fundraising**:

    The platform provides an intuitive and user-friendly interface, making it easy for creators to launch and manage their fundraising campaigns. Whether it's a creative project, a charitable cause, or a business initiative, Fundgy aims to streamline the fundraising process for a diverse range of projects.

- **Global Reach**:

    Fundgy connects creators with a global audience of potential contributors. This expands the reach of fundraising campaigns beyond geographical boundaries, allowing creators to tap into a broader pool of supporters who share an interest in their projects.

- **Transparency**:

    Transparency is a key focus of Fundgy. The platform utilizes blockchain technology to create an immutable and verifiable ledger of all transactions. This ensures that contributors can track and verify how funds are being utilized, fostering trust between creators and supporters.

- **Security**:

    Fundgy prioritizes the security of both funds and user information. The platform employs advanced encryption techniques and smart contract technology to protect against potential cyber threats. Users can participate in crowdfunding with confidence, knowing that their contributions and personal data are secure.

Fundgy, in essence, facilitates a new era of crowdfunding by harnessing the power of decentralized technologies. It empowers creators to bring their ideas to life while offering contributors a transparent and secure means of supporting projects that align with their interests and values.

## How We Build It
Fundgy harnesses a robust technology stack to drive its decentralized crowdfunding platform, ensuring reliability, security, and seamless functionality. The core components of our tech stack include:
- React
- Solidity
- Ethers
- Chainlink
- Tailwind
- Figma

## Challenges We Ran Into
### Challenges We Faced:

- **Complex Integration Process**:

    Building a seamless integration with a decentralized identity verification service proved to be intricate. Unlike traditional methods, decentralized identity verification requires adherence to specific protocols and standards, adding complexity to the integration process.

- **Security Considerations**:

    Ensuring the security of user identity data within a decentralized framework presented a significant challenge. Balancing the need for transparency with the imperative to protect sensitive information demanded a robust security infrastructure.
    
- **Scalability Concerns**:

    The decentralized identity verification service needed to scale efficiently as the user base expanded. Addressing scalability concerns involved optimizing the performance of the integration to handle a growing number of verification requests without compromising speed or reliability.

- **Educating Users**:

    Introducing a decentralized identity verification system to users who may be accustomed to traditional centralized approaches presented a challenge. Educating users about the benefits of decentralized identity verification and addressing any concerns or misconceptions required a comprehensive communication strategy.


### Overcoming the Challenges:

- **Chainlink Workshops**:
    The workshops helped us a lot in getting to know about the overall blockchain and chainlink technology. They offered a structured learning environment for participants to understand complex topics. They also addressed the common problems everyone faced during the initial building of their web app.

- **Thorough Research and Testing**:

    Extensive research into the protocols and standards of decentralized identity verification services was crucial. Rigorous testing and simulations helped identify potential issues early in the development process.

- **Planning**:
    Planning the basic layout of a web app before starting its development is a key strategy for achieving efficiency and overcoming challenges throughout the development process. It gave clarity of vision, user experience design, technology stack integration, etc. 

##  Accomplishments That We're Proud Of

- **Successful Decentralized Fundraising**:

    Achieving successful fundraising campaigns on the platform is a noteworthy accomplishment. If users, whether individuals or organizations, have utilized Fundgy to raise funds for various projects, causes, or initiatives, it demonstrates the platform's effectiveness in empowering creators.

- **Integration with External Services**:

    Overcoming challenges in integrating external services, such as the successful integration with Chainlink for real-time ETH to USD conversion rates, is a notable accomplishment. This integration enhances the functionality of Fundgy and provides users with valuable real-time data.

## What We Learned

We learned a lot about planning and collaborating while building this project. The Chainlink community forums and chat groups were also very welcoming and helpful when we ran into some problems. We got to know a lot about different technologies and how we can use them. It led to the overall development of our knowledge and met some great people in the industry.
Decentralized applications are more complex than traditional applications, but they offer a number of advantages, such as security and scalability. Integrating with Chainlink is essential for providing real-time data feeds to smart contracts. There is a lot of demand for decentralized crowdfunding applications.
## What's Next For Fundgy

We are excited to continue developing Fundgy and making it the best crowdfunding platform on the market. Here are some of the features we are working on:

- **Adding The Ability To Remove The Campaign**: This feature is almost finished. We just need some testing and we will add it in Fundgy.

- **More Project Categories**: Adding more project categories to Fundgy to make it easier for users to find the projects they are interested in.

- **More Features For Campaign Creators**: Adding more features for campaign creators to help them make their campaigns more successful.
