//-------------- this is home page --------------
//---you can change all text in homepage.json ---

import Card1 from "../../components/Card1";
import SwiperSlider from "../../components/Swiper"
import '../../Styles/Home.css'
import auction from '../../constance/auction.json'
import news from '../../constance/news.json'
import topTrend from '../../constance/topTrend.json'
import homePage from '../../constance/homePage.json'
import { useEffect, useState } from "react";
export default function Home() {
  const [showWelcom,setShowWelcom] = useState(true);
  const event = new Event('resize');
  window.addEventListener('resize', function (event) {
    var imgWith = document.getElementById('logoPath').naturalWidth;
    var imgheigth = document.getElementById('logoPath').naturalHeight;
    var parentWidth = document.getElementsByClassName('logoFix')[0].offsetWidth;
    var parentpadding = parseFloat(getComputedStyle(document.getElementsByClassName('logoFix')[0]).getPropertyValue('padding-left'));
    var Scale = (parentWidth - (parentpadding * 2)) / imgWith;
    document.querySelector(':root').style.setProperty('--Scale', Scale);
    document.getElementsByClassName('logoFix')[0].style.height = Scale * imgheigth + "px";
  });


  const ShowToggle = (e, id) => {
    var elm = document.getElementById(id);
    if (e.target.textContent === "Show All") {
      e.target.textContent = "Less";
      elm.classList.add("showMore");
    }
    else {
      e.target.textContent = "Show All"
      elm.classList.remove("showMore");
    }
  }
  const goToTop = (e) => {
    var parentOffset = e.target.parentElement.offsetTop;
    document.documentElement.scrollTop = parentOffset - 120;
  }
  useEffect(()=>{
    if(localStorage.dontShowWellcomMassage === "true"){
      setShowWelcom(false)
    }
  },[showWelcom])
  const setDontshow = (e)=>{
      localStorage.dontShowWellcomMassage = e.target.checked ;
  }
  return (
    <>
      <header onLoad={() => { window.dispatchEvent(event); }} className="row justify-content-evenly align-items-center w-100 mx-auto overflow-hidden">
        <div className="col-xl-7 row justify-content-center align-items-center">
          <div className="logoFix col-sm-6">
            <div style={{ 'transformOrigin': 'top left' }} className="Logo d-flex position-relative">
              <img id="logoPath" src="./Images/Brand/NFTMArket.png" alt="" />
              <div className="wrapper">
                <div className="obj">
                  <img src="./Images/star.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <h1 className="BarandHeader">{homePage.marketplaceNmae}</h1>
            <h2 className="detaleBrand">{homePage.discribtion}</h2>
          </div>
        </div>
        <div className="col-xl-4 pt-3 pb-3 row align-items-center ">
          <SwiperSlider></SwiperSlider>
        </div>
      </header>
      <main className="py-5 row  w-100 mx-auto justify-content-center">
        <div className="col-sm-11">
          <section >
            <div className="d-flex justify-content-between">
              <h5>Auction <small className="update">(Auction copmleted in next update)</small></h5>
              <button className="btn showBtn" onClick={(e) => ShowToggle(e, "auctionCard")}>Show All</button>
            </div>
            <div id="auctionCard" className="row justify-content-around mx-auto">
              {auction.list.map((row, index) =>
                <div key={index} className="col-xl-3 col-lg-4 col-md-5 col-sm-6 py-2">
                  <Card1 info={row}></Card1>
                </div>
              )}
              <button onClick={(e) => goToTop(e)} className="btn showBtn text-end">Co to Top</button>
            </div>
          </section>
          <section >
            <div className="d-flex justify-content-between">
              <h5>Market's news<small className="update">(copmleted in next update)</small> </h5>
              <button className="btn showBtn" onClick={(e) => ShowToggle(e, "MarketNews")}>Show All</button>
            </div>
            <div id="MarketNews" className="row  mx-auto py-2">
              {news.list.map((row, index) =>
                <div key={index} className="col-xl-3 col-lg-4 col-md-5 col-sm-6 py-2 ">
                  <div className="News">
                    <div>
                      <img src={row.image} alt="" />
                    </div>
                    <h1>{row.title}</h1>
                    <button className="btn"><a href={"/news" + row.title}>Read More</a></button>
                  </div>
                </div>
              )}
              <button onClick={(e) => goToTop(e)} className="btn showBtn text-end">Co to Top</button>
            </div>
          </section>
          <section >
            <div className="d-flex justify-content-between">
              <h5>Top collections over last 7 days</h5>
              <button className="btn showBtn" onClick={(e) => ShowToggle(e, "topCollections")}>Show All</button>
            </div>
            <div id="topCollections" className="row  mx-auto py-2">
              {topTrend.list.map((row, index) =>
                <div key={index} className="col-xl-3 col-lg-4 col-md-5 col-sm-6 py-2 ">
                  <div className="trend">
                    <div>
                      <img src={row.image} alt="" />
                    </div>
                    <div>
                      <h1>{row.name}</h1>
                      <h6>price: {row.price} <img alt='' className='unit' src={'Images/unitIcon/' + row.unit + '.png'} /></h6>
                      <button className="btn"><a href={"/ShowNFT/"+row.chain+"/"+row.address+"/"+row.tokenId}>Detailes</a></button>
                    </div>
                  </div>
                </div>
              )}
              <button onClick={(e) => goToTop(e)} className="btn showBtn text-end">Co to Top</button>
            </div>
          </section>
        </div>
      </main>
      {/* modal for welcom allert */}
      {showWelcom &&<div className="modal" id="ModalWelcom"shown-bs-modal="true"	 data-bs-backdrop="false" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-modal="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="ModalwelcomLabel">{homePage.wellcomeAlert.title}</h5>
              <button type="button" className="btn-close" onClick={()=>setShowWelcom(false)}></button>
            </div>
            <div className="modal-body modal-dialog-scrollable">
              <h6>{homePage.wellcomeAlert.massage}</h6>
              <p className="text-danger text-center m-0">{homePage.wellcomeAlert.alertMasage}</p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-start pb-2">
              <div className="wellcomDontShow">
                <input type="checkbox" onChange={(e)=>setDontshow(e)}/>
                <small>{homePage.wellcomeAlert.dontshowMessage}</small>
              </div>
              <button type="button" onClick={()=>setShowWelcom(false)} className="btn btn-outline-primary mt-2 mx-auto" >OK</button>
            </div>
          </div>
        </div>
      </div>}
    </>
  )
}