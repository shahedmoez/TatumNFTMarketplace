import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setLike, fetchCollection } from './NFTAPI';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import testNet from '../../constance/testNet.json';
import mainNet from '../../constance/mainNet.json';
import walletCollectionNFTs from '../../constance/walletCollectionNFTs.json';

const initialState = {
  network: testNet,
  alert: {
    show: false,
    massage: null,
    type: null,
    showModal: false
  },
  showModalwallet: "",
  explore: {
    Status: "",
    error: "",
    listNFTs: [],
  },
  Collection: {
    Status: "",
    Error: "",
    CollectionFind: "",
  },
  API: {
    ipfs: {
      status: "",
      ipfsHash: "",
      error: ""
    },
    signature: {
      Status: "",
      signatureId: "",
      error: ""
    },
    kms: {
      Status: "",
      kms: "",
      error: ""
    },
    approval: {
      Status: "",
      sigId: "",
      error: ""
    },
    MintNFT: {
      Status: "",
      NFT: "",
      error: ""
    },
    Listing: {
      Status: "",
      sigId: "",
      error: ""
    },
    Buy: {
      Status: "",
      sigId: "",
      error: ""
    },
    CancelList: {
      Status: "",
      sigId: "",
      error: ""
    },
    walletNFTs: {
      Status: "",
      listNFTs: "",
      chain: "",
      error: ""
    },
    allNFT: {
      Status: "",
      listNFTs: [],
      reFormed: "",
      error: ""
    },
    allListMarket: {
      Status: "",
      listing: [],
      error: ""
    },
    NFTshow: {
      Status: "",
      error: "",
      NFT: "",
    },
    contract: {
      Status: "",
      transAction: null,
      error: "",
      hasContract: ""
    }
  },
  wallet: {
    status: "",
    hasMetamask: "",
    conect: null,
    account: null,
    txId: "",
    contractAddress: null,
    walletNFTsCollection: "",
    error: "",
    transActionRequestStatus: ""
  },
};

export const requestMetamask = createAsyncThunk(
  'Wallet/Metamask',
  async () => {
    const response = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return response;
  }
);
export const uploadIPFS = createAsyncThunk(
  'IPFS/PostIPFS',
  async (file, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post('https://api-eu1.tatum.io/v3/ipfs',
      formData,
      {
        headers: {
          'content-type': 'multipart/form-data',
          'x-api-key': apikey,
        }
      });

    return response.data;
  },
);
export const getNFT = createAsyncThunk(
  'NFT/metadata',
  async (props, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    var Url;
    const urlMetadata = await axios.get('https://api-eu1.tatum.io/v3/nft/metadata/' + props.chain + '/' + props.address + '/' + props.tokenId,
      {
        headers: {
          'x-api-key': apikey
        }
      });
    if (urlMetadata.data.data.startsWith("ipfs://")) {
      Url = urlMetadata.data.data.replace("ipfs://", "https://ipfs.io/ipfs/")
    } else {
      Url = urlMetadata.data.data;
    }
    const res = await axios.get(Url);
    var Metadata = JSON.parse(JSON.stringify(res.data))
    // var Metadata = item[i].metadata[j].metadata;
    if (Metadata != null && Metadata != undefined) {
      if (Metadata.image.startsWith("ipfs://")) {
        Metadata.image = Metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");
      }
    }
    var nft = {
      contractAddress: props.address,
      tokenId: props.tokenId,
      url: Url,
      metadata: Metadata,
      chain: props.chain
    }
    return nft;
  }
);
export const getCollectionByContractAddress = createAsyncThunk(
  'Collection/fetchCollection',
  async (name) => {
    const response = await fetchCollection(name);
    return response.data;
  }
);
export const getAllListingOfMarket = createAsyncThunk(
  'Market/AllListing',
  async (props, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    const response = await axios.get('https://api-eu1.tatum.io/v3/blockchain/marketplace/listing/' + props.chain + '/' + props.address + '/' + props.type,
      {
        headers: {
          'x-api-key': apikey
        }
      });

    return response.data;
  },
);
export const getNFTbyListingId = createAsyncThunk(
  'Market/NFTbyListing',
  async (props, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    const response = await axios.get('https://api-eu1.tatum.io/v3/blockchain/marketplace/listing/' + props.chain + '/' + props.marketAddress + '/' + 'listing/' + props.listing,
      {
        headers: {
          'x-api-key': apikey
        }
      });

    return response.data;
  },
);
export const getWalletNFTs = createAsyncThunk(
  'Wallet/NFTs',
  async (props, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    const response = await axios.get('https://api-eu1.tatum.io/v3/nft/address/balance/' + props.chain + '/' + props.account[0],
      {
        headers: {
          'x-api-key': apikey
        }
      });

    return response.data;
  },
);
export const likeNFT = createAsyncThunk(
  'LIKE/NFT',
  async (id, address) => {
    const response = await setLike(id, address);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const getSignatureIdToListing = createAsyncThunk(
  'Listing/getsignId',
  async (props, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    var body = {
      chain: props.chain,
      contractAddress: props.contractAddress,
      nftAddress: props.nftAddress,
      seller: props.seller[0],
      listingId: props.signatureId,
      tokenId: props.tokenId,
      price: props.price,
      isErc721: props.isErc721,
      signatureId: props.signatureId
    }
    if (props.chain === "CELO") { body.feeCurrency = props.feeCurrency }
    const response = await axios.post('https://api-eu1.tatum.io/v3/blockchain/marketplace/listing/sell',
      body,
      {
        headers: {
          'x-api-key': apikey
        }
      });
    return response.data;
  },
);
export const getSignatureIdToBuyNFT = createAsyncThunk(
  'Buy/getsignId',
  async (props, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    var body = {
      chain: props.chain,
      contractAddress: props.contractAddress,
      listingId: props.listingId,
      amount: props.amount,
      signatureId: props.signatureId
    }
    if (props.chain === "CELO") { body.feeCurrency = props.feeCurrency }
    const response = await axios.post('https://api-eu1.tatum.io/v3/blockchain/marketplace/listing/buy',
      body,
      {
        headers: {
          'x-api-key': apikey
        }
      });
    return response.data;
  },
);
export const getSignatureIdToCancelList = createAsyncThunk(
  'CancelList/getsignId',
  async (props, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    var body = {
      chain: props.chain,
      listingId: props.listingId,
      signatureId: props.signatureId,
      contractAddress: props.contractAddress
    }
    if (props.chain === "CELO") { body.feeCurrency = props.feeCurrency }
    const response = await axios.post('https://api-eu1.tatum.io/v3/blockchain/marketplace/listing/cancel',
      body,
      {
        headers: {
          'x-api-key': apikey
        }
      });
    return response.data;
  },
);
export const approval = createAsyncThunk(
  'Listing/approve',
  async (props, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    var body = {
      chain: props.chain,
      contractAddress: props.nftAddress,
      spender: props.contractAddress,
      isErc721: props.isErc721,
      tokenId: props.tokenId,
      signatureId: props.signatureId,
    }
    if (props.chain === "CELO") { body.feeCurrency = props.feeCurrency }
    const response = await axios.post('https://api-eu1.tatum.io/v3/blockchain/auction/approve',
      body,
      {
        headers: {
          'x-api-key': apikey
        }
      });
    return response.data;
  },
);
export const getSignatureIdToDeployContract = createAsyncThunk(
  'deploy/getsignId',
  async (props, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    var body = {
      "name": props.name,
      "chain": props.chain,
      "symbol": props.symbol,
      "signatureId": props.uuid,
      "provenance": props.provenance,
      "cashback": props.cashback,
    }
    if (props.fee !== "")
      body = {
        "name": props.name,
        "chain": props.chain,
        "symbol": props.symbol,
        "signatureId": props.uuid,
        "provenance": props.provenance,
        "cashback": props.cashback,
        "feeCurrency": props.feeCurrency
      }
    const response = await axios.post('https://api-eu1.tatum.io/v3/nft/deploy/',
      body,
      {
        headers: {
          'x-api-key': apikey
        }
      });
    return response.data;
  },
);
export const MintNFT = createAsyncThunk(
  'Mint/getsignId',
  async (props, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    var body = {
      "chain": props.Chain,
      "to": props.To,
      "url": props.Url,
    }
    if (props.ContractAddress !== "") {
      body.contractAddress = props.ContractAddress;
      body.signatureId = props.SignatureId
      body.tokenId = props.TokenId
      if (props.Chain === "CELO") { body.feeCurrency = props.FeeCurrency; };
      if (props.Provenance) { body.provenance = true; body.cashbackValues = [props.CashbackValues * 100]; body.fixedValues = [props.FixedValues]; body.authorAddresses = [props.To] };
    };
    const response = await axios.post('https://api-eu1.tatum.io/v3/nft/mint',
      body,
      {
        headers: {
          'x-api-key': apikey
        }
      });
    return response.data;
  },
);
export const getKms = createAsyncThunk(
  'kms/getKms',
  async (sigId, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    const response = await axios.get('https://api-eu1.tatum.io/v3/kms/' + sigId, {
      headers: {
        'x-api-key': apikey
      }
    });
    return response.data;
  }
);
export const getContractAddress = createAsyncThunk(
  'Contract/Get',
  async (props, { getState }) => {
    const apikey = getState().NFT.network.API_KEY
    const response = await axios.get('https://api-eu1.tatum.io/v3/nft/transaction/' + props.chain + '/' + props.txId, {
      headers: {
        'x-api-key': apikey
      }
    });
    return response.data;
  },
);
export const NFTSlice = createSlice({
  name: 'NFT',
  initialState,
  reducers: {
    switchNetwork: (state, action) => {
      if (action.payload === "testNet") state.network = testNet;
      if (action.payload === "mainNet") state.network = mainNet;
    },
    setAccount: (state, action) => {
      state.account = action.payload
    },
    modalChekWallet: (state) => {
      state.showModalwallet = !state.showModalwallet
    },
    alert: (state, action) => {
      state.alert = action.payload;
    },
    checkMetamask: (state) => {
      if (window.ethereum) {
        state.wallet.hasMetamask = true;
      }
      else { state.wallet.hasMetamask = false; }
    },
    setTxId: (state, action) => {
      state.wallet.txId = action.payload;
    },
    createNFTsCollectionForWallet: (state, action) => {
      walletCollectionNFTs.listNFTs = action.payload
      state.wallet.walletNFTsCollection = walletCollectionNFTs;
    },
    reFormAllNFTs: (state, action) => {
      if (action.payload) {
        state.API.allNFT.reFormed = "idle";
        state.API.allNFT.listNFTs = action.payload;
      } else {
        state.API.allNFT.reFormed = "loading";
      }
    },
    explore: (state, action) => {
      if (!action.payload) {
        state.explore.Status = "loading";
      } else {
        state.explore.Status = "idle";
        state.explore.listNFTs = [...action.payload];
      }
    },
    transActionRequest: (state, action) => {
      state.wallet.transActionRequestStatus = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(requestMetamask.pending, (state) => {
        state.wallet.status = 'loading';
        state.wallet.error = "";
        state.wallet.conect = null;
      })
      .addCase(requestMetamask.fulfilled, (state, action) => {
        state.wallet.status = 'idle';
        state.wallet.account = action.payload;
        state.wallet.conect = true;
        state.wallet.error = "";
      })
      .addCase(requestMetamask.rejected, (state, action) => {
        state.wallet.status = 'rejected';
        state.wallet.conect = false;
        state.wallet.error = "conect to wallet has error:" + action.error.message;
      });
    builder
      .addCase(uploadIPFS.pending, (state) => {
        state.API.ipfs.status = 'loading';
        state.API.ipfs.error = "";
        state.API.ipfs.ipfsHash = "";
      })
      .addCase(uploadIPFS.fulfilled, (state, action) => {
        state.API.ipfs.status = 'idle';
        state.API.ipfs.ipfsHash = action.payload.ipfsHash;
        state.API.ipfs.error = "";
      })
      .addCase(uploadIPFS.rejected, (state, action) => {
        state.API.ipfs.status = 'rejected';
        state.API.ipfs.error = action.error.message;
      });
    builder
      .addCase(getNFT.pending, (state) => {
        state.API.NFTshow.Status = 'loading';
      })
      .addCase(getNFT.fulfilled, (state, action) => {
        state.API.NFTshow.Status = 'idle';
        state.API.NFTshow.NFT = action.payload;
      })
      .addCase(getNFT.rejected, (state) => {
        state.API.NFTshow.Status = 'rejected';
        state.API.NFTshow.error = "NFT Fetching error";
      });
    builder
      .addCase(getWalletNFTs.pending, (state) => {
        state.API.walletNFTs.Status = 'loading';
      })
      .addCase(getWalletNFTs.fulfilled, (state, action) => {
        state.API.walletNFTs.Status = 'idle';
        state.API.walletNFTs.listNFTs = action.payload;
        state.API.walletNFTs.chain = action.meta.arg.chain;
      })
      .addCase(getWalletNFTs.rejected, (state) => {
        state.API.walletNFTs.Status = 'rejected';
        state.API.walletNFTs.error = "NFT Fetching error";
      });
    builder
      .addCase(getNFTbyListingId.pending, (state) => {
        state.API.allNFT.Status = 'loading';
        state.API.allNFT.error = '';
      })
      .addCase(getNFTbyListingId.fulfilled, (state, action) => {
        state.API.allNFT.Status = 'idle';
        var nft = action.payload;
        nft.chain = action.meta.arg.chain;
        state.API.allNFT.listNFTs.push(nft);
      })
      .addCase(getNFTbyListingId.rejected, (state) => {
        state.API.allNFT.Status = 'rejected';
        state.API.allNFT.error = "NFT Fetching error";
      });
    builder
      .addCase(getCollectionByContractAddress.pending, (state) => {
        state.Collection.Status = 'loading';
      })
      .addCase(getCollectionByContractAddress.fulfilled, (state, action) => {
        state.Collection.Status = 'idle';
        state.Collection.CollectionFind = action.payload;
      })
      .addCase(getCollectionByContractAddress.rejected, (state) => {
        state.Collection.Status = 'rejected';
        state.Collection.Error = "Collection Fetching error";
      });
    builder
      .addCase(getSignatureIdToDeployContract.pending, (state) => {
        state.API.signature.Status = 'loading';
        state.API.signature.signatureId = "";
        state.wallet.contractAddress = null;
        state.API.contract.hasContract = "";
        state.wallet.txId = "";
      })
      .addCase(getSignatureIdToDeployContract.fulfilled, (state, action) => {
        state.API.signature.Status = 'idle';
        state.API.signature.signatureId = action.payload.signatureId;
      })
      .addCase(getSignatureIdToDeployContract.rejected, (state, action) => {
        state.API.signature.Status = 'rejected';
        state.API.signature.error = action.payload;
      });
    builder
      .addCase(getKms.pending, (state) => {
        state.API.kms.Status = 'loading';
      })
      .addCase(getKms.fulfilled, (state, action) => {
        state.API.kms.Status = 'idle';
        state.API.kms.kms = action.payload;
      })
      .addCase(getKms.rejected, (state, action) => {
        state.API.kms.Status = 'rejected';
        state.API.kms.error = action.payload;
      });
    builder
      .addCase(getAllListingOfMarket.pending, (state) => {
        state.API.allListMarket.Status = 'loading';
      })
      .addCase(getAllListingOfMarket.fulfilled, (state, action) => {
        state.API.allListMarket.Status = 'idle';
        var list = {
          chain: action.meta.arg.chain,
          marketAddress: action.meta.arg.address,
          type: action.meta.arg.type,
          listing: action.payload
        }
        state.API.allListMarket.listing.push(list);
      })
      .addCase(getAllListingOfMarket.rejected, (state, action) => {
        state.API.allListMarket.Status = 'rejected';
        state.API.allListMarket.error = action.payload;
      });
    builder
      .addCase(getSignatureIdToListing.pending, (state) => {
        state.API.Listing.Status = 'loading';
        state.API.Listing.sigId = '';
        state.API.Listing.error = '';
        state.API.signature.signatureId = '';
      })
      .addCase(getSignatureIdToListing.fulfilled, (state, action) => {
        state.API.Listing.Status = 'idle';
        state.API.Listing.sigId = action.payload.signatureId;
        state.API.signature.signatureId = action.payload.signatureId;
      })
      .addCase(getSignatureIdToListing.rejected, (state, action) => {
        state.API.Listing.Status = 'rejected';
        state.API.Listing.error = action.payload;
      });
    builder
      .addCase(getSignatureIdToBuyNFT.pending, (state) => {
        state.API.Buy.Status = 'loading';
        state.API.Buy.sigId = '';
        state.API.Buy.error = '';
        state.API.signature.signatureId = '';
      })
      .addCase(getSignatureIdToBuyNFT.fulfilled, (state, action) => {
        state.API.Buy.Status = 'idle';
        state.API.Buy.sigId = action.payload.signatureId;
        state.API.signature.signatureId = action.payload.signatureId;
      })
      .addCase(getSignatureIdToBuyNFT.rejected, (state, action) => {
        state.API.Buy.Status = 'rejected';
        state.API.Buy.error = action.payload;
      });
    builder
      .addCase(getSignatureIdToCancelList.pending, (state) => {
        state.API.CancelList.Status = 'loading';
        state.API.CancelList.sigId = '';
        state.API.CancelList.error = '';
        state.API.signature.signatureId = '';
      })
      .addCase(getSignatureIdToCancelList.fulfilled, (state, action) => {
        state.API.CancelList.Status = 'idle';
        state.API.CancelList.sigId = action.payload.signatureId;
        state.API.signature.signatureId = action.payload.signatureId;
      })
      .addCase(getSignatureIdToCancelList.rejected, (state, action) => {
        state.API.CancelList.Status = 'rejected';
        state.API.CancelList.error = action.payload;
      });
    builder
      .addCase(approval.pending, (state) => {
        state.API.approval.Status = 'loading';
        state.API.approval.sigId = '';
        state.API.signature.signatureId = '';
        state.API.signature.error = '';
      })
      .addCase(approval.fulfilled, (state, action) => {
        state.API.approval.Status = 'idle';
        state.API.approval.sigId = action.payload.signatureId;
        state.API.signature.signatureId = action.payload.signatureId;
      })
      .addCase(approval.rejected, (state, action) => {
        state.API.approval.Status = 'rejected';
        state.API.approval.error = action.payload;
      });
    builder
      .addCase(MintNFT.pending, (state) => {
        state.API.MintNFT.Status = 'loading';
        state.API.signature.error = "";
        state.API.signature.Status = "loading";
        state.API.signature.signatureId = "";
      })
      .addCase(MintNFT.fulfilled, (state, action) => {
        state.API.MintNFT.Status = 'idle';
        if (action.payload.signatureId) {
          state.API.signature.signatureId = action.payload.signatureId;
          state.API.MintNFT.signatureId = action.payload.signatureId;
          state.API.signature.Status = "idle"
        } else {
          state.API.MintNFT.NFT = action.payload;
        }
      })
      .addCase(MintNFT.rejected, (state, action) => {
        state.API.MintNFT.Status = 'rejected';
        state.API.MintNFT.error = action.payload;
        state.API.signature.error = "geting signatureId has error";
        state.API.signature.Status = "rejected";
      });
    builder
      .addCase(getContractAddress.pending, (state) => {
        state.API.contract.Status = 'loading';
        state.API.contract.transAction = '';
        state.API.contract.error = "";
        state.API.contract.hasContract = "";
        state.wallet.contractAddress = null;
      })
      .addCase(getContractAddress.fulfilled, (state, action) => {
        state.API.contract.Status = 'idle';
        state.API.contract.transAction = action.payload;
        if (action.payload.status && action.payload.contractAddress) {
          state.API.contract.hasContract = "idle";
          state.wallet.contractAddress = action.payload.contractAddress;
        } else {
          if (action.payload.status) {
            state.API.contract.hasContract = "rejected";
          } else { state.API.contract.hasContract = "pending"; }
        }
      })
      .addCase(getContractAddress.rejected, (state, action) => {
        state.API.contract.Status = 'rejected';
        state.API.contract.error = action.error;
        // state.alert = { show: true, massage: "Error in rading TransAction", type: "danger" }
      });
  },
});

export const { setAccount, modalChekWallet, checkMetamask, alert, setTxId, createNFTsCollectionForWallet, reFormAllNFTs, explore, transActionRequest, switchNetwork } = NFTSlice.actions;


export const selectsignatureId = (state) => state.NFT.API.signature.signatureId;
export const selectkms = (state) => state.NFT.API.kms;
export const selecAPI = (state) => state.NFT.API;
export const selectAccont = (state) => state.NFT.wallet.account;
export const selectWallet = (state) => state.NFT.wallet;
export const selectSmartContract = (state) => state.NFT.wallet.contractAddress;
export const selectTxId = (state) => state.NFT.wallet.txId;
export const selectNFTshow = (state) => state.NFT.API.NFTshow;
export const selectExplore = (state) => state.NFT.explore;
export const selectCollection = (state) => state.NFT.Collection;
export const selectState = (state) => state.NFT;
export const selectshowModalwallet = (state) => state.NFT.showModalwallet;
export const selectIPFS = (state) => state.NFT.API.ipfs;
export const selectMintNFT = (state) => state.NFT.API.MintNFT;
export const selectAlert = (state) => state.NFT.alert;
export const selectNetwork = (state) => state.NFT.network;
export const selectAllListMarket = (state) => state.NFT.API.allListMarket;
export const selectAllNFT = (state) => state.NFT.API.allNFT;


export const MetamaskSwitchNetwork = (Chain) => async (dispatch, getState) => {
  const curentNet = window.ethereum.networkVersion;
  const BlockChaine = selectNetwork(getState());
  var actionNet = BlockChaine.list.find((item) => item.simbol === Chain).chainDecimalId;
  var netParams = BlockChaine.list.find((item) => item.simbol === Chain).params;
  if (actionNet !== curentNet) {
    await dispatch(alert({ show: true, massage: "Your NetWork is not match please conferm metamask to switch network to: " + netParams[0].chainName, type: "primary", time: "8000" }));
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: netParams[0].chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: netParams
        });
      }
    }
  }
}
export const deploySmartContract = (Name, Symbol, Chain, FeeCurrency, Provenance, Cashback) => async (dispatch, getState) => {
  const Uuid = uuidv4();
  await dispatch(getSignatureIdToDeployContract({ uuid: Uuid, name: Name, symbol: Symbol, chain: Chain, feeCurrency: FeeCurrency, provenance: Provenance, cashback: Cashback }))
  await dispatch(kmsRequest({ chain: Chain }));
}
export const createListing = (props) => async (dispatch, getState) => {
  const Uuid = uuidv4();
  var isSeller
  if (selectWallet(getState()).walletNFTsCollection.listNFTs === undefined || selectWallet(getState()).walletNFTsCollection.listNFTs.length < 1) {
    await dispatch(walletNFTs(props.seller));
  }
  if (selectWallet(getState()).walletNFTsCollection.listNFTs.length >= 1) {
    var sellerNFTs = selectWallet(getState()).walletNFTsCollection.listNFTs;
    var isSeller = sellerNFTs.find((item) => (item.contractAddress === props.nftAddress && item.tokenId === props.tokenId))
    if (isSeller) {
      props.contractAddress = selectNetwork(getState()).marketplace.find((item) => item.name === props.chain).address;
      props.listingId = Uuid;
      props.signatureId = Uuid;
      await dispatch(getSignatureIdToListing(props));
      await dispatch(kmsRequest({ chain: props.chain }));
      await dispatch(approval(props));
      await dispatch(kmsRequest({ chain: props.chain }));
    }
  }
}
export const BuyNFT = (props) => async (dispatch, getState) => {
  const Uuid = uuidv4();
  props.contractAddress = selectNetwork(getState()).marketplace.find((item) => item.name === props.chain).address;
  props.signatureId = Uuid;
  const marketFee = Number(selectNetwork(getState()).marketplace.find((i) => i.name === props.chain).marketFee);
  var amount = Number(props.amount);
  props.amount = (amount + (amount * marketFee)).toString();
  await dispatch(getSignatureIdToBuyNFT(props));
  await dispatch(kmsRequest({ chain: props.chain }));
}
export const CancelList = (props) => async (dispatch, getState) => {
  const Uuid = uuidv4();
  props.signatureId = Uuid;
  props.contractAddress = selectNetwork(getState()).marketplace.find((item) => item.name === props.chain).address;
  await dispatch(getSignatureIdToCancelList(props));
  await dispatch(kmsRequest({ chain: props.chain }));
}
export const kmsRequest = (props) => async (dispatch, getState) => {
  const sigId = selectsignatureId(getState());
  await dispatch(getKms(sigId));
  const data = selectkms(getState()).kms;
  const txConfig = JSON.parse(data.serializedTransaction);
  txConfig.from = selectAccont(getState())[0];
  txConfig.gasPrice = txConfig.gasPrice ? parseInt(txConfig.gasPrice).toString(16) : undefined;
  var ERR = false;
  await dispatch(transActionRequest("loading"))
  try {
    await dispatch(MetamaskSwitchNetwork(props.chain));
  } catch (error) {
    ERR = true;
    await dispatch(transActionRequest("rejected"))
    await dispatch(alert({ show: true, massage: "Switching Network to: " + props.chain + " has Error", type: "danger", modal: true }));
  }
  if (!ERR) {
    try {
      const TxId = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txConfig],
      });
      await dispatch(setTxId(TxId));
      await dispatch(transActionRequest("idle"));
    } catch (err) {
      await dispatch(transActionRequest("rejected"));
    }

  }
}
export const conectWallet = () => async (dispatch, getState) => {
  await dispatch(checkMetamask());
  const hasMetamask = selectWallet(getState()).hasMetamask;
  hasMetamask === true && dispatch(requestMetamask());
}
export const creatNFT = (props) => async (dispatch, getState) => {
  const Uuid = uuidv4();
  const img = props.Metadata.image;
  await dispatch(uploadIPFS(img));
  props.Metadata.image = "ipfs://" + selectIPFS(getState()).ipfsHash;
  const json = JSON.stringify(props.Metadata);
  const file = new Blob([json], { type: 'text/json' });
  await dispatch(uploadIPFS(file));
  const URL = "ipfs://" + selectIPFS(getState()).ipfsHash;
  var account = selectAccont(getState())[0];
  var uniq = new Date().getTime().toString();
  var NFTdata = {
    "Chain": props.Chain,
    "To": account,
    "ContractAddress": props.ContractAddress,
    "Url": URL,
    "Provenance": props.Provenance,
    "CashbackValues": props.CashbackValues,
    "FixedValues": props.FixedValues,
    "FeeCurrency": props.FeeCurrency,
    "SignatureId": Uuid,
    "TokenId": uniq
  }
  await dispatch(MintNFT(NFTdata));
  if (props.ContractAddress !== "") {
    await dispatch(kmsRequest({ chain: props.Chain }));
  }

}
export const walletNFTs = (Account) => async (dispatch, getState) => {
  var NFTs = [];
  const sorterNFT = (item, Chain) => {
    for (let i = 0; i < item.length; i++) {
      var ContractAddress = item[i].contractAddress
      for (let j = 0; j < item[i].balances.length; j++) {
        var TokenId = item[i].metadata[j].tokenId;
        if (item[i].metadata[j].url.startsWith("ipfs://")) {
          var Url = item[i].metadata[j].url.replace("ipfs://", "https://ipfs.io/ipfs/")
        } else {
          var Url = item[i].metadata[j].url;
        }
        var Metadata = JSON.parse(JSON.stringify(item[i].metadata[j].metadata))
        // var Metadata = item[i].metadata[j].metadata;
        if (Metadata != null && Metadata != undefined) {
          if (Metadata.image.startsWith("ipfs://")) {
            Metadata.image = Metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");
          }
        }
        var nft = {
          contractAddress: ContractAddress,
          tokenId: TokenId,
          url: Url,
          metadata: Metadata,
          chain: Chain
        }
        NFTs.push(nft);
      }
    }
  }
  await dispatch(getWalletNFTs({ account: Account, chain: "ETH" }));
  var ETHnFT = selecAPI(getState()).walletNFTs.listNFTs;
  sorterNFT(ETHnFT, "ETH");
  await dispatch(getWalletNFTs({ account: Account, chain: "MATIC" }));
  var MATICnFT = selecAPI(getState()).walletNFTs.listNFTs;
  sorterNFT(MATICnFT, "MATIC")
  await dispatch(getWalletNFTs({ account: Account, chain: "CELO" }));
  var CELOnFT = selecAPI(getState()).walletNFTs.listNFTs;
  sorterNFT(CELOnFT, "CELO");
  await dispatch(createNFTsCollectionForWallet(NFTs));
}
export const getAllNFTMarketPlace = () => async (dispatch, getState) => {
  await dispatch(reFormAllNFTs());
  var marketAddress = selectNetwork(getState()).marketplace;
  for (let i of marketAddress) {
    await dispatch(getAllListingOfMarket({ chain: i.name, address: i.address, type: "INITIATED" }));
    await dispatch(getAllListingOfMarket({ chain: i.name, address: i.address, type: "SOLD" }));
    await dispatch(getAllListingOfMarket({ chain: i.name, address: i.address, type: "CANCELLED" }));
  }
  var allList = selectAllListMarket(getState()).listing;
  for (let i of allList) {
    if (i.listing.length > 0)
      for (let j of i.listing) {
        await dispatch(getNFTbyListingId({ chain: i.chain, marketAddress: i.marketAddress, listing: j }))
      }
  }
  await dispatch(groupByNFT());
}
export const groupByNFT = () => async (dispatch, getState) => {
  var allNFTs = selectAllNFT(getState()).listNFTs;
  var groupedNFT = [];
  for (let i of allNFTs) {
    if (groupedNFT.length > 0) {
      var finded = groupedNFT.find((item) => (item.nftAddress === i.nftAddress && item.tokenId === i.tokenId));
      var index = groupedNFT.indexOf(finded);
    }
    if (finded) {
      var findedNewlisting = {
        idList: allNFTs.indexOf(i),
        listingId: i.listingId,
        buyer: i.buyer,
        erc20Address: i.erc20Address,
        price: i.price,
        seller: i.seller,
        state: i.state
      }
      groupedNFT[index].listings.push(findedNewlisting);
    } else {
      var newStyleNFT = {
        chain: i.chain,
        nftAddress: i.nftAddress,
        tokenId: i.tokenId,
        isErc721: i.isErc721,
        amount: i.amount,
        listings: [
          {
            idList: allNFTs.indexOf(i),
            listingId: i.listingId,
            buyer: i.buyer,
            erc20Address: i.erc20Address,
            price: i.price,
            seller: i.seller,
            state: i.state
          }
        ]
      }
      groupedNFT.push(newStyleNFT);
    }
  }
  for (let j = 0; j < groupedNFT.length; j++) {
    groupedNFT[j].listings = groupedNFT[j].listings.sort((a, b) => (a.listingId > b.listingId ? 1 : -1));
  }
  await dispatch(reFormAllNFTs(groupedNFT));
}
export const exploreAllNFT = (page) => async (dispatch, getState) => {
  var allNFTs = selectAllNFT(getState()).listNFTs;
  var lengthAllNFTs = allNFTs.length;
  if ((page - 1) * 12 < lengthAllNFTs) {
    await dispatch(explore());
    var explorNFT = [];
    for (let i = ((page - 1) * 12); i < (page * 12); i++) {
      if (i < lengthAllNFTs) {
        await dispatch(getNFT({ tokenId: allNFTs[i].tokenId, address: allNFTs[i].nftAddress, chain: allNFTs[i].chain }))
        var metadata = selectNFTshow(getState()).NFT;
        var Price = allNFTs[i].listings.find((item) => (item.state === "0")).price
        var nft = { ...metadata, price: Price }
        explorNFT.push(nft);
      }
    }
    await dispatch(explore(explorNFT));
  }
}
export default NFTSlice.reducer;
