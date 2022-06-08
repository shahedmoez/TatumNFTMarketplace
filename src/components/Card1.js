//--------------- this function is used in home page ---------------
//------- showing NFT with image, price, name, colection,... -------
//-- this used a props that pased in home page from allNFT.json ----
import '../Styles/Card1.css'
export default function Card1(props) {
    return (
        <div className="containerCard1">
            <style>{"#C" + props.info.idnft + ":before{background-image:url(" + props.info.image + ");background-position: center;filter: blur(18px);}"}</style>
            <style>{"#C" + props.info.idnft + ":after{content:'" + props.info.name + "' !important; position: absolute;top: 30%;left: -20%;font-size: 12em;font-weight: 800;font-style: italic;color: rgba(255, 255, 25, 0.05);}"}</style>
            <div id={"C"+props.info.idnft} className="card">
                <div className="imgBx">
                    <img src={props.info.image} alt="" />
                </div>
                <div className="contentBx">
                    <h2>{props.info.name}</h2>
                    <div className="size">
                        <h3>Colection :{props.info.collection}</h3>
                    </div>
                    <div className="colorCard1">
                        <h3>Price:{props.info.price}<img alt='' className='unit' src={'Images/unitIcon/' + props.info.unit + '.png'} /></h3>
                    </div>
                    <div className='details'>{props.info.details}</div>
                    <a href={"/ShowNFT/"+props.info.chain+"/"+props.info.address+"/"+props.info.tokenId}>More Info</a>
                </div>
            </div>
        </div>
    )
}