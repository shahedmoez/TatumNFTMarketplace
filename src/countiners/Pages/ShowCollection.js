//---------------- this function showing colection with NFTs ----------------
//------- includeed Explore function in this function to showing NFTs -------

import Chart from "../../components/Chart";
import "../../Styles/showCollection.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCollectionByContractAddress, walletNFTs, selectAccont, modalChekWallet, selecAPI, selectWallet } from "../../features/NFT/NFTSlice";
import { useEffect, useState } from "react";
import Explore from "./Explore";
import Loading from "../../components/Loading";
export default function ShowCollection() {
    const { nameCollection } = useParams();
    const walletCollection = useSelector(selectWallet).walletNFTsCollection;
    const walletcollecAPI = useSelector(selecAPI).walletNFTs;
    const [colection, setColection] = useState("");
    const [colectionAPI, setColectionAPI] = useState("");
    const dispatch = useDispatch();
    const account = useSelector(selectAccont);
    useEffect(() => {
        if (nameCollection === "walletNFTs") {
            if (account && walletCollection === "" && walletcollecAPI.Status === "") {
                dispatch(walletNFTs(account));
            } else {
                if (!account) dispatch(modalChekWallet())
            }
            setColection(walletCollection);
            setColectionAPI(walletcollecAPI);
        } else {
            dispatch(getCollectionByContractAddress(nameCollection));
        }

    }, [account, walletCollection, walletcollecAPI]);
    // for tab cheng 
    const activeClass = (e, activClas, idtarget) => {
        var elements = document.getElementsByClassName(activClas);
        var content = document.getElementsByClassName("show_content")
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove(activClas);;
        }
        for (var j = 0; j < content.length; j++) {
            content[j].classList.remove("show_content");;
        }

        e.target.classList.add(activClas);
        document.getElementById(idtarget).classList.add("show_content");
    };
    return (
        <>
            {colectionAPI.Status === "loading"
                ? <Loading/>
                : colectionAPI.Status === "rejected"
                    ? <h1>Collection Loading has Error</h1>
                    : ((colectionAPI.Status === "idle") && (colection)) ?
                        <div className="collectionShowCountainer">
                            <div className="collShowHead">
                                <img src={"../../" + colection.bannerImage} className="banner" alt="" />
                                <img src={"../../" + colection.logoImage} className="logoImgae" alt="" />
                            </div>
                            <div className="watchList">
                                <div>
                                    <input type="checkbox" />
                                    <span> watchList</span>
                                </div>
                                <div>
                                    <a className="icon" href={colection.website}>language</a>
                                    <a className="icon">share</a>
                                </div>
                            </div>
                            <div className="colltext">
                                <h1>{colection.name}{colection.verify && <span className="icon">verified</span>}</h1>
                                <h5>created by<a href="">{colection.careator}</a>{colection.careatorVerify && <span className="icon">verified</span>}</h5>
                                <div className="collDetails">
                                    <div>
                                        <span>{Object.keys(colection.listNFTs).length}</span>
                                        <small>items</small>
                                    </div>
                                    <div>
                                        <span>{colection.owners.length}</span>
                                        <small>owners</small>
                                    </div>
                                    <div>
                                        <span><img src={"../../Images/unitIcon/" + colection.unit + ".png"} className="unit" alt="" />{colection.floorPrice}</span>
                                        <small>floor price</small>
                                    </div>
                                    <div>
                                        <span><img src={"../../Images/unitIcon/" + colection.unit + ".png"} className="unit" alt="" />{colection.volumeTraded}</span>
                                        <small>volume traded</small>
                                    </div>
                                </div>
                                <div className="collAbout">
                                    <input type="checkbox" />
                                    <p>{colection.details}</p>
                                    <span className="icon">expand_more</span>
                                </div>
                            </div>
                            <div className="tabColl">
                                <div className="tab_active " onClick={(e) => activeClass(e, "tab_active", "itemShow")}><span className="icon">grid_on</span>Items</div>
                                <div className="" onClick={(e) => activeClass(e, "tab_active", "chartShow")}><span className="icon">insights</span>Activity</div>
                            </div>
                            <main>
                                <div id="itemShow" className="show_content">
                                    <Explore collection={colection} preFix="../"></Explore>
                                </div>
                                <div id="chartShow" className="activity">
                                    <Chart></Chart>
                                    <div className="listings"></div>
                                </div>
                            </main>
                        </div>
                        :
                        <>
                            <h1>Collection Not find</h1>
                        </>
            }
        </>
    )
}