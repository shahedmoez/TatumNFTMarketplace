//------ Navbar Components ------
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import { modalChekWallet, selectNetwork, switchNetwork } from '../features/NFT/NFTSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function Navbar() {
    const dispatch = useDispatch();
    const network = useSelector(selectNetwork).name;
    const activTab = (e) => {
        var elements = document.querySelectorAll('.nav-item>a')
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('itemActiv');
        }
        e.target.classList.add("itemActiv");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light nav_Custom">
                <div className="container-fluid w-100">
                    <div className="navbar-brand position-relative">
                        <img src='Images/Brand/NFTMArket.png' alt="" width="30" className="d-inline-block align-text-top me-2" />
                        NFT Market
                        {network === "testNet" && <small className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>({network})</small>}
                        {network === "mainNet" && <small className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary'>({network})</small>}
                    </div>
                    <form className="form_search_custom out">
                        <input className="form-control search_custom" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                    <div className='accont'>
                        <li className='nav-item dropdown out px-1'>
                            <span className='icon dropdown-toggle ' id="navbarDropdown" role="button">account_circle</span>
                            <ul className="dropdown-menu px-3" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to={"/Collection/walletNFTs"}>My NFTs</Link></li>
                                <li><a className="dropdown-item" onClick={() => dispatch(modalChekWallet())}>Connect to Wallet</a></li>
                                <li>
                                   {network === "testNet" &&<a className="dropdown-item text-primary" onClick={() => dispatch(switchNetwork("mainNet"))}>switch to mainNet</a>}
                                   {network === "mainNet" &&<a className="dropdown-item text-danger" onClick={() => dispatch(switchNetwork("testNet"))}>switch to testNet</a>}
                                </li>
                            </ul>
                        </li>
                        <li className='nav-item out px-1' onClick={() => dispatch(modalChekWallet())} title="Connect to wallet">
                            <span className='icon'>account_balance_wallet</span>
                        </li>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse flex-row-reverse" id="navbarSupportedContent">
                        <form className="form_search_custom in">
                            <input className="form-control search_custom" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <div className='accantIn'>
                                <li className='nav-item dropdown out px-1'>
                                    <span className='icon dropdown-toggle nav-link' id="navbarDropdown" role="button">account_circle</span>
                                    <ul className="dropdown-menu px-3" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to={"/Collection/walletNFTs"}>My NFTs</Link></li>
                                        <li><a className="dropdown-item" href="/">Connect to Wallet</a></li>
                                    </ul>
                                </li>
                                <li className='nav-item out px-1'>
                                    <span className='icon'>account_balance_wallet</span>
                                </li>
                            </div>
                            <li className="nav-item" onClick={(e) => activTab(e)}>
                                <Link className='nav-link itemActiv' to={'/'}>Home</Link>
                            </li>
                            <li className="nav-item" onClick={(e) => activTab(e)}>
                                <Link className='nav-link ' to={'/Explore'}>Explore</Link>
                            </li>
                            <li className="nav-item" onClick={(e) => activTab(e)}>
                                <Link className='nav-link' to={"/Create"}>CreateNFT</Link>
                            </li>
                            <li className="nav-item" onClick={(e) => activTab(e)}>
                                <Link className='nav-link' to={"/Contract"}>DeployContract</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}