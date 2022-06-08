//------------------- this page show NFT by address and tokenId ---------------------
//------------ if user not conected metamask wallet can see buy btn ,... ------------
//--if user has conected wallet and owner of NFT that show can creat listing and...--
//this page shoing all listings of NFT in this marketplace and showing chart of price
 
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { getNFT, alert, selectNFTshow, selectAccont, createListing, walletNFTs, selectAllNFT, selecAPI, getAllNFTMarketPlace, selectWallet, BuyNFT, modalChekWallet, CancelList, selectAlert, selectkms } from "../../features/NFT/NFTSlice"
import "../../Styles/showNFT.css"
import Chart from "../../components/Chart";
import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
export default function ShowNFT() {
    const { tokenId, address, chain } = useParams();
    const dispatch = useDispatch();
    const showNFT = useSelector(selectNFTshow);
    const account = useSelector(selectAccont);
    const allNFTs = useSelector(selectAllNFT);
    const [isListed, setIsListed] = useState(false);
    const [listings, setListings] = useState([]);
    const walletCollection = useSelector(selectWallet).walletNFTsCollection;
    const walletcollecAPI = useSelector(selecAPI).walletNFTs;
    const [isOwner, setIsOwner] = useState(false);
    const [currentPrice, setCurrentPrice] = useState("");
    const [chartData, setChartData] = useState("");
    const showModalAler = useSelector(selectAlert).showModal;
    const [sellProces, setSellProces] = useState(false);
    const [cancelsellProces, setCancelSellProces] = useState(false);
    const [buyProces, setBuyProces] = useState(false);
    const kms = useSelector(selectkms);
    const wallet = useSelector(selectWallet)
    const sellApi = useSelector(selecAPI).Listing;
    const buyApi = useSelector(selecAPI).Buy;
    const cancellApi = useSelector(selecAPI).CancelList;
    const [amount, setAmount] = useState("");
    const [isErc721,setIsErc721] = useState("")
    // this use Effect for getting metadata image and ... of NFT to show on this page
    useEffect(() => {
        dispatch(getNFT({ tokenId: tokenId, address: address, chain: chain }));
        window.scrollTo(0, 0);
    }, []);
    // this useeffect for getting listings and check NFT is on MarketPlace or No
    useEffect(() => {
        if (allNFTs.reFormed === "") {
            dispatch(getAllNFTMarketPlace())
        } else {
            if (allNFTs.reFormed === "idle") {
                var findListed = allNFTs.listNFTs.find((item) => (item.nftAddress.toLowerCase() === address.toLowerCase() && item.tokenId === tokenId && item.chain === chain))
                if (findListed) {
                    setIsListed(true);
                    setListings(findListed.listings);
                    setIsErc721(findListed.isErc721);
                    var findInitializedList = findListed.listings.find((item) => (item.state === "0"))
                    if (findInitializedList) {
                        setCurrentPrice(findInitializedList.price);
                    }
                }
            }
        }
    }, [allNFTs])
    // this useEffect for check is user (that conected by wallet) as owner of NFT or No
    useEffect(() => {
        if (account && walletCollection === "" && walletcollecAPI.Status === "") {
            dispatch(walletNFTs(account));
        } else {
            if (walletCollection.listNFTs !== undefined) {
                var findOwner = walletCollection.listNFTs.find((item) => (item.contractAddress.toLowerCase() === address.toLowerCase() && item.tokenId === tokenId && item.chain === chain))
                if (findOwner) {
                    setIsOwner(true);
                } else {
                    setIsOwner(false);
                }
            }
        }
    }, [account, walletCollection, walletcollecAPI])
    // useefect for reload chart after geting listings data
    useEffect(() => {
        const showChart = () => {
            var label = "Price in:" + showNFT.NFT.chain;
            var labels = [];
            var data = [];
            var sorted =JSON.parse(JSON.stringify(listings)).sort((a,b)=> (a.listingId < b.listingId ? 1 : -1));
            sorted.map((row, index) => {
                labels.push(index);
                data.push(row.price)
            })
            var DataList = {
                labels: labels,
                datasets: [
                    {
                        label: label,
                        data: data,
                        backgroundColor: [
                            "#ffbb11",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0"
                        ]
                    }
                ]
            };
            setChartData(DataList);
        }
        showChart();
    }, [listings])
    const sellNFT = () => {
        var body = {
            chain: showNFT.NFT.chain,
            nftAddress: showNFT.NFT.contractAddress,
            tokenId: showNFT.NFT.tokenId,
            seller: account,
            price: amount,
            isErc721: true,
            feeCurrency: showNFT.NFT.chain
        }
        if (!amount) {
            dispatch(alert({ show: true, massage: "amount of NFT is Empty", time: "3000", type: "danger" }))
        } else {
            dispatch(createListing(body));
            dispatch(alert({ showModal: true }));
            setCancelSellProces(false);
            setBuyProces(false);
            setSellProces(true);
        }
    }
    const buyNFT = (list) => {
        if (!account) {
            dispatch(modalChekWallet());
        }
        if (list) {
            var body = {
                "chain": showNFT.NFT.chain,
                "listingId": list.listingId,
                "amount": list.price ,
                "feeCurrency": "CELO"
            }
            dispatch(BuyNFT(body));
            dispatch(alert({ showModal: true }));
            setCancelSellProces(false);
            setBuyProces(true);
            setSellProces(false);
        } else {
            var activeList = listings.find((item) => (item.state === "0"))
            var body = {
                "chain": showNFT.NFT.chain,
                "listingId": activeList.listingId,
                "amount": activeList.price,
                "feeCurrency": "CELO"
            }
            dispatch(BuyNFT(body));
            dispatch(alert({ showModal: true }));
            setCancelSellProces(false);
            setBuyProces(true);
            setSellProces(false);
        }
    }
    const cancelList = (list) => {
        if (!account) {
            dispatch(modalChekWallet());
        }
        if (list.seller.toLowerCase() === account[0].toLowerCase()) {
            var body = {
                "chain": showNFT.NFT.chain,
                "listingId": list.listingId,
                "feeCurrency": "CELO"
            }
            dispatch(CancelList(body));
            dispatch(alert({ showModal: true }));
            setCancelSellProces(true);
            setBuyProces(false);
            setSellProces(false);
        } else {
            dispatch(alert({ massage: "You are not a seller of this List", type: "danger", show: true, time: "5000" }))
        }
    }
    return (<>
        {allNFTs.reFormed === "loading" && <div className="topLoading"></div>}
        {showNFT.Status === "loading" ? <Loading/>
            : showNFT.Status === "rejected" ? <h1>NFT Showing Error</h1>
                : showNFT.Status === "idle" && <div className="showNFT_continer">
                    <div className="row align-items-start">
                        <div className="col-md-5">
                            <div className="cardNFT">
                                <div >
                                    <span><img src={window.location.origin + "/Images/unitIcon/" + showNFT.NFT.chain + ".png"} alt="" /></span>
                                    <div className="like">
                                        <input type="checkbox" />
                                        <i className="fa-regular fa-heart"></i>
                                    </div>
                                </div>
                                <img src={showNFT.NFT.metadata.image} className="w-100" alt="" />
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">subject</span><h6>Description</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore4">expand_more</span>
                                </div>
                                <div id="tagMore4" className="tagMore collapse show">
                                    <p>Created By <a href="">{showNFT.NFT.owner}</a></p>
                                    <p>{showNFT.NFT.metadata.description}</p>
                                </div>
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">label_important</span><h6>Properties</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore5">expand_more</span>
                                </div>
                                <div id="tagMore5" className="tagMore collapse">
                                    <div className='row'>
                                        {showNFT.NFT.metadata.attributes.map((row, index) =>
                                            (row.trait_type !== "" && !row.value2) &&
                                            <div className='col-sm-3 ProOpt' key={index}>
                                                <div>{row.trait_type}</div>
                                                <div>{row.value}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">star_rate</span><h6>Levels</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore6">expand_more</span>
                                </div>
                                <div id="tagMore6" className="tagMore collapse">
                                    <div className='row '>
                                        {showNFT.NFT.metadata.attributes.map((row, index) =>
                                            (row.trait_type !== "" && row.value2) &&
                                            <div className=' col-sm-6 p-2' key={index}>
                                                <div className='levelOpt'>
                                                    <div className='d-flex justify-content-between'>
                                                        <span>{row.trait_type}</span>
                                                        <span>{row.value} of {row.value2}</span>
                                                    </div>
                                                    <div className='w-100'>
                                                        <progress className='w-100' value={(row.value / row.value2) * 100} max="100"></progress>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">receipt_long</span><h6>Details</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore8">expand_more</span>
                                </div>
                                <div id="tagMore8" className="tagMore collapse show">
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                        <span>Contract Address</span>
                                        <a href={"/ShowNFT/" + showNFT.NFT.chain + "/" + showNFT.NFT.contractAddress + "/" + showNFT.NFT.tokenId}>{showNFT.NFT.contractAddress.substring(0, 4)}...{showNFT.NFT.contractAddress.substring(showNFT.NFT.contractAddress.length - 4, showNFT.NFT.contractAddress.length)}</a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                        <span>Token ID</span>
                                        <a href={showNFT.NFT.url}>{showNFT.NFT.tokenId}</a>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                           <span>Token Standard</span>
                                           {isErc721?<span>Erc721 Tokens</span>:isErc721!==""&&<span>Erc1155 Tokens</span>}
                                       </div>
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                        <span>Blockchain</span>
                                        <span href="">{showNFT.NFT.chain}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mainNft col-md-7">
                            <div className="d-flex justify-content-between w-100 py-2">
                                <span className="d-flex align-items-center headcollect">{showNFT.NFT.metadata.name}<span className="icon ps-1 font-size-large text-primary">verified</span></span>
                                <div className="tools">
                                    <span className="icon">replay</span>
                                    <span className="icon">open_in_new</span>
                                    <span className="icon">share</span>
                                    <span className="icon">more_vert</span>
                                </div>
                            </div>
                            <h1>#{showNFT.NFT.tokenId}</h1>
                            <div className="ovf">
                                <span className="">Owned by <a href="#">{showNFT.owner}</a></span>
                                <span className="d-flex align-items-center"><span className="icon ps-2 pe-1">visibility</span>views</span>
                                <span className="d-flex align-items-center"><span className="icon ps-2 pe-1">favorite</span>views</span>
                            </div>
                            <div className="sellInfo">
                                <div className="d-flex align-items-center justify-content-between p-3">
                                    <h6 className="d-flex align-items-center m-0"><span className="icon pe-2">schedule</span> auctions features add in next Update  </h6>
                                    <span className="icon">info</span>
                                </div>
                                <div className="price">
                                    <p>Current price</p>
                                    {(isListed && currentPrice != "") && <div className="buy">
                                        <span>{currentPrice}<small>{showNFT.NFT.chain}</small></span>
                                        <img src={window.location.origin + "/Images/unitIcon/" + showNFT.NFT.chain + ".png"} alt="" />{showNFT.price}
                                    </div>}
                                    <div className="d-flex align-items-center">
                                        {(isListed && currentPrice !== "" && !isOwner) && <button onClick={() => buyNFT()} className="btn btn-primary d-flex align-items-center me-2"><span className="icon me-2">account_balance_wallet</span>Buy now</button>}
                                        {isOwner && <button className="btn btn-outline-primary d-flex align-items-center me-2 disabled col-sm-4 "><span className="icon me-2">sell</span>auction</button>}
                                        {isOwner && <button className="btn btn-outline-primary d-flex align-items-center me-2 col-sm-4" onClick={() => sellNFT()}><span className="icon me-2" >attach_money</span>Sell NFT</button>}
                                        {isOwner && <><input type="number" min="0.001" className="me-2 col-sm-2 p-2" placeholder="amount" onChange={(e) => setAmount(e.target.value)} /><div className="buy d-flex align-items-center pb-0"><img src={window.location.origin + "/Images/unitIcon/" + showNFT.NFT.chain + ".png"} /></div></>}
                                    </div>
                                </div>
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">insights</span><h6>Price History</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore1">expand_more</span>
                                </div>
                                <div id="tagMore1" className="tagMore collapse show">
                                    <div>
                                        <select className="chartTime col-sm-6">
                                            <option value="All">All time</option>
                                            <option value="7Week">Last week</option>
                                            <option value="1Month">Last month</option>
                                            <option value="3Month">Last 3 months</option>
                                            <option value="1Year">Last year</option>
                                        </select>
                                    </div>
                                    <Chart data={chartData}
                                        options={{
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: " Char Prices"
                                                },
                                                legend: {
                                                    display: true,
                                                    position: "bottom"
                                                }
                                            },
                                            animations: {
                                                radius: {
                                                    duration: 1000,
                                                    easing: 'linear',
                                                    from: 5,
                                                    to: 0,
                                                    loop: true
                                                },
                                                y: {
                                                    easing: 'easeInOutElastic',
                                                    dropped: true
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">sell</span><h6>Listings</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore2">expand_more</span>
                                </div>
                                <div id="tagMore2" className="tagMore collapse">
                                    <div className="listTitle">
                                        <span>Price</span>
                                        <span>Seller</span>
                                        <span>ListingId</span>
                                        <span>Buyer</span>
                                    </div>
                                    <ul className="listContent">
                                        {listings.map((row, index) =>
                                            <li key={index}>
                                                <span><img src={window.location.origin + "/Images/unitIcon/" + showNFT.NFT.chain + ".png"} />{row.price}</span>
                                                <span>{row.seller}</span>
                                                {row.state === "0"
                                                    ? <span className="text-primary">Initialized</span>
                                                    : row.state === "1"
                                                        ? <span className="text-success">Sold</span>
                                                        : row.state === "2"
                                                        && <span className="text-danger">Cancelled</span>
                                                }
                                                {(row.buyer === "0x0000000000000000000000000000000000000000") ? <span>No Buyer</span> : <span>{row.buyer}</span>}
                                                <span >
                                                    {((row.state === "0") && (!isOwner)) && <button onClick={() => buyNFT(row)} className="btn btn-outline-primary">Buy</button>}
                                                    {((row.state === "0") && (isOwner)) && <button onClick={() => cancelList(row)} className="btn btn-outline-danger">Cancel</button>}
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="tagItem">
                                <div className="tagHead">
                                    <div className="d-flex align-items-center"><span className="icon">toc</span><h6>Offers</h6></div>
                                    <span className="icon" data-bs-toggle="collapse" data-bs-target="#tagMore3">expand_more</span>
                                </div>
                                <div id="tagMore3" className="tagMore collapse">
                                    <div className="listTitle">
                                        <span>Price</span>
                                        <span>USD Price</span>
                                        <span>Floor Difference</span>
                                        <span>Expiration</span>
                                        <span>From</span>
                                    </div>
                                    <ul className="listContent">
                                        {/* need backend */}
                                        {/* {showNFT.offers.map((row, index) =>
                                            <li key={index}>
                                                <span><img src={"../../Images/unitIcon/" + row.unit + ".png"} />{row.price}</span>
                                                <span>{row.usd}$</span>
                                                <span>{row.floor}</span>
                                                <span>{row.date}</span>
                                                <span>{row.from}</span>
                                            </li>
                                        )} */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="activity row"></div>
                    <div className="morInCollection row"></div>
                </div>
        }
        {(showModalAler && sellProces) && <Alert info={{ title: "Creat a listing and Sell NFT", steps: [{ name: "Get signtureId to listing", api: sellApi.Status }, { name: "get KMS for create Listing", api: kms.Status }, { name: "conect to Wallet and confirme transaction", api: wallet.transActionRequestStatus }, { name: "conect to Wallet to Aprove listings", api: wallet.transActionRequestStatus }], massage: "Your listing is created successfully your txId is:" + wallet.txId, copy: wallet.txId }} ></Alert>}
        {(showModalAler && cancelsellProces) && <Alert info={{ title: "Cancel listing of NFT", steps: [{ name: "get signtureId for Cancelling", api: cancellApi.Status }, { name: "get KMS for cancelling", api: kms.Status }, { name: "conect to Wallet and confirme transaction", api: wallet.transActionRequestStatus }], massage: "Your listing of this NFT cancelled successfully your txId is:" + wallet.txId, copy: wallet.txId }} ></Alert>}
        {(showModalAler && buyProces) && <Alert info={{ title: "Buy NFT", steps: [{ name: "get signtureId for buy this NFT", api: buyApi.Status }, { name: "get KMS for Buying", api: kms.Status }, { name: "conect to Wallet and confirme transaction", api: wallet.transActionRequestStatus }], massage: "Your buyed this NFT cancelled successfully your txId is:" + wallet.txId, copy: wallet.txId }} ></Alert>}
    </>
    )
}