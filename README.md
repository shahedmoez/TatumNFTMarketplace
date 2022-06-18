
<div align="center">

<a href="https://github.com/shahedmoez/TatumNFTMarketplace">

<img src="public/favicon.png" alt="Logo" width="80" height="80">

</a>

<h3 align="center">NFT Marketplace with Tatum APIs</h3>

<p align="center">

Create, sell, buy all kind of NFTs and deploy smart contract and other option
  <br/>
  ### supported CELO, ETH and MATIC chains 

<br />
  </div>

<!-- <a href="...">View Demo</a> -->

<details>
<summary>Table of Contents</summary>
<li><a href="#about-the-project">About The Project</a></li>
<li><a href="#built-with">Built With</a></li>
<li><a href="#getting-started">Getting Started</a></li>
<li><a href="#prerequisites">Prerequisites</a></li>
<li><a href="#installation">Installation</a></li>
<li><a href="#pages">Pages</a></li>
<li><a href="#contact">Contact</a></li>
</details>

## About The Project
You can see Demo of this project in this link
<a href="http://shahedmoez.com">shahedmoez NFT Marketplace
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->
![screenshot](https://user-images.githubusercontent.com/92023968/172676012-17111bfb-3bd2-4d83-a7f0-e95f890e278b.jpg)

Marketplace NFT help users to create, sell, buy and view non-fungible token (NFT)

### **All transactions in this project using KMS method and do not get user`s Private key

####  In this app user can:

*   Create Express NFT (Erc721) with deploy image and metadata in IPFS network for free with Tatum API in CELO, ETH, MATIC blockchains.
*   Create Custom NFT in its own smart contracts (with deploy image and metadata in IPFS network) in CELO, ETH, MATIC blockchains.
*   Create Royalty NFT with fix Cashback or percentage Cashback.
*   Creating metadata as [Opensea.io](http://opensea.io/) standard metadata in IPFS network.
*   Deploy smart contract (CELO, ETH, MATIC blockchains).
*   Create listing for selling all NFT (ERC721 and ERC 1155).
*   Cancel listings.
*   Buy NFTs.
*   View all NFT in user wallet (CELO, ETH, MATIC blockchains)
*  View all NFT listings and historical price in chart (all listings: initialized, sold and canceled)

* view all NFT that listed in web app marketplaces.
<p align="right">(<a href="#top">back to top</a>)</p>

## Built With

#### this project built using:

* [React.js](https://reactjs.org/)

* [redux-toolkit](https://redux-toolkit.js.org/)

* [Node.js](https://nodejs.org/en/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

for starting this project you need to sign up in [Tatum.io](https://tatum.io/) and buy a plan or use free Tatum API-Key
### Prerequisites
you should have installed Node.js

## Installation

1. Get a free API Key at [https://tatum.io/](https://tatum.io/)

2. Clone the repo

```sh

git clone https://github.com/shahedmoez/TatumNFTMarketplace.git

```

3. Install NPM packages

```sh

npm install

```

### you can buy base plan Tatum APIs and hide API-KEY by Tatum services.

4. Enter your mainnet API in `src\constance\mainNet.json`

```js

"API_KEY":"ENTER YOUR MAIN NET API";

```

5. Enter your testnet API in `src\constance\testNet.json`

```js

"API_KEY":"ENTER YOUR TEST NET API";

```

6. Create your own Marketplace smart contract in desired blockchains (CELO, ETH, MATIC) for testnet and mainnet.(6 smart contracts)  
you can use postman or Tatum API reference page and create marketplace smart contract by calling this API (Create NFT Marketplace “/v3/blockchain/marketplace/listing”)  
and put smart contract addresses and market fee in json files  
for testnet in this file:  

`src\constance\testNet.json`

for mainnet in this file:

`src\constance\mainNet.json`

```js

"marketplace":[

{

"name" : "ETH",

"address": "YOUR MARKETPLACE ADDRESS IN ETH",

"marketFee":"0.025" //2.5%

},

{

"name" : "MATIC",

"address":"YOUR MARKETPLACE ADDRESS IN MATIC",

"marketFee":"0.025" //2.5%

},

{

"name" : "CELO",

"address":"YOUR MARKETPLACE ADDRESS IN CELO",

"marketFee":"0.025" //2.5%

}

],

```

7. you can change all text in home page such as app name, alert text and … in`src\constance\homePage.json`

```js

{

"marketplaceNmae":"NFT Market",

...

}

```

8. you can change all information in footer section such as phone number, location, links and … in `src\constance\footer.json`

```js

{

"phoneNumber":"+91-9999878398",

"email":" info@marketplace.com",

...

}

```

<p align="right">(<a href="#top">back to top</a>)</p>


## Pages

#### Home page:

#### Explore page :

for showing all NFTs that has listed in marketplace (CELO, ETH, MATIC)
#### Create page:
for mint all kind of NFTs
*   Express NFT (free without fee and without having a NFT smart contract by using Tatum smart contracts in all chain “CELO, ETH, MATIC”).
*   Custom NFT (with user smart contract)
*   Royalty NFT (with fix cashback or presentation cashback)
#### Contract page:
-   for deploy NFT smart contract in all chain (CELO, ETH, MATIC)
#### profile Icon menu:

##### My NFTs:

* in this page user can view all her NFTs in all chain (CELO, ETH, MATIC).

##### Switch network:
*   switching between mainnet and testnet

#### Wallet Icon:
*   connecting to Metamask wallet.
<p align="right">(<a href="#top">back to top</a>)</p>

## Next Update:

*   backend side for app
*   create MongoDB database
* Auction futures
*   creating collection by user
<p align="right">(<a href="#top">back to top</a>)</p>


## Contact

shahedmoez - [shahedmoez](shahedmoez@gmail.com)

Project Link: [https://github.com/shahedmoez/TatumNFTMarketplace](https://github.com/shahedmoez/TatumNFTMarketplace)

<p align="right">(<a href="#top">back to top</a>)</p>
