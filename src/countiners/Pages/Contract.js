//--------------------- this page creating user Smartcontract ------------------------
//-- in this page user can creat NFT smartcontracts in 3 blockchain (CELO,ETH,Matic)--
//----------------------- and supported Royalti smartcontract-------------------------

import "../../Styles/Contract.css"
import FeeCurrency from '../../constance/feeCurrency.json';
import { alert, selectSmartContract, deploySmartContract, selectTxId, getContractAddress, selectAccont, modalChekWallet, selecAPI, setTxId, selectkms, selectNetwork } from '../../features/NFT/NFTSlice';
import { useEffect, useState } from 'react';
import '../../Styles/Create.css';
import { useDispatch, useSelector } from 'react-redux';
export default function Contract() {
  const BlockChaine = useSelector(selectNetwork);
  const dispatch = useDispatch();
  const [inputTxId, setInputTxId] = useState("");
  const smartContract = useSelector(selectSmartContract);
  const TXID = useSelector(selectTxId);
  const [deployChaine, setDeployChaine] = useState("");
  const [deployName, setDeployName] = useState("");
  const [deploySymbol, setDeploySymbol] = useState("");
  const accont = useSelector(selectAccont);
  const hasContract = useSelector(selecAPI).contract.hasContract;
  const kmsStatus = useSelector(selectkms).Status;
  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(0);
  const [intervalName, setintervalName] = useState(0);
  const [isCELO, setIsCELO] = useState(false);
  const [feeCurrency, setFeeCurrency] = useState("");
  const [percentage, setPercentage] = useState(false);
  const [fixCashback, setFixCashback] = useState(false);
  const [royalti, setRoyalti] = useState(false);
  // for Deplloy new smart Contract
  const deployNew = () => {
    if (deployChaine === "" || deployName === "" || deployChaine === "" || (deployChaine === "CELO" && feeCurrency === "") || (royalti && (!fixCashback && !percentage))) {
      dispatch(alert({ massage: "Fill all Required Items", type: "danger", show: true }));
      document.getElementById('deploy').classList.add('Invalid');
    } else {
      if (!accont) {
        dispatch(alert({ massage: "Conect To Metamask Wallet and try again", type: "primary", show: true }));
        dispatch(modalChekWallet());
      } else {
        dispatch(deploySmartContract(deployName, deploySymbol, deployChaine, feeCurrency, percentage, fixCashback));
      }
    }
  }
  // for check and get transaction and contract address
  const checkContract = () => {
    if (deployChaine === "" || inputTxId === "") {
      dispatch(alert({ massage: "Fill all Required Items", type: "danger", show: true }));
      document.getElementById('checkTxId').classList.add('Invalid');
    } else {
      dispatch(setTxId(inputTxId))
      dispatch(getContractAddress({ chain: deployChaine, txId: inputTxId }))
    }
  }
  // for check and get and contract address interval
  const checkinterval = () => {
    if (hasContract === "pending" || hasContract === null || hasContract === "") {
      dispatch(getContractAddress({ chain: deployChaine, txId: TXID }))
      setCounter(counter + 1);
    }
  }
  // for call chek api evry minuts 
  useEffect(() => {
    const timerCheckContract = () => {
      if (intervalName) clearInterval(intervalName);
      if ((hasContract === "pending" || hasContract === null || hasContract === "") && TXID) {
        var tempTime = 30;
        const interval = setInterval(() => {
          if (tempTime > 0) {
            setTimer(tempTime);
            tempTime--
          } else {
            checkinterval();
            return clearInterval(interval);
          };
        }, 1000);
        setintervalName(interval);
      }
    }
    if (counter < 10) timerCheckContract();
  }, [counter, TXID, hasContract]);
  useEffect(() => {
    (kmsStatus === "loading") && dispatch(alert({ massage: "Conferm transaction in metamask window", type: "primary", show: true, time: 3000 }));
    (kmsStatus === "rejected") && dispatch(alert({ massage: "transaction not completed", type: "danger", show: true, time: 3000 }));
  }, [kmsStatus])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <div className="Contract">
        <h1 className="modal-title" id="ManageDeployLabel">Deploy Smart Contract</h1>
        <div className="contractIMG">
          <img src="Images/smartContract.png" />
        </div>
        <div>
          {((hasContract === "pending")) &&
            <div className="pending alert alert-primary">
              the Status of trans action in pending ... reChek after {timer} secende
            </div>
          }
          {((kmsStatus === "idle" && TXID !== "" && hasContract === "")) &&
            <div className="pending alert alert-primary">
              the Status of trans action in pending ... reChek after {timer} secende
            </div>
          }
          {(hasContract === "rejected") &&
            <div className="pending alert alert-danger">
              this txId not has any smartContact
            </div>
          }
          {(hasContract === "idle") &&
            <div className="pending alert alert-success showTxId">
              your smartcontarct addres is: <a className="d-flex justify-content-center align-items-center" href={BlockChaine.list.find((item) => item.simbol === deployChaine).params.blockExplorerUrls + "/address/" + smartContract}>{smartContract.substring(0, 10)}...{smartContract.substring(smartContract.length - 10, smartContract.length)}<span className="icon">open_in_new</span></a>
              <span className='icon' onClick={() => navigator.clipboard.writeText(smartContract)}>copy</span>
            </div>
          }

          {(TXID && kmsStatus === "idle" && inputTxId === "") &&
            <div className="pending alert alert-success showTxId">
              your txId is:<a className="d-flex justify-content-center align-items-center" href={BlockChaine.list.find((item) => item.simbol === deployChaine).params.blockExplorerUrls + "/tx/" + TXID}>{TXID.substring(0, 10)}...{TXID.substring(TXID.length - 10, TXID.length)}<span className="icon">open_in_new</span></a>
              <span className='icon' onClick={() => navigator.clipboard.writeText(TXID)}>copy</span>
            </div>
          }
        </div>
        <p className='m-0'>to Deploy NFT SmartContract Click on "Deplloy New" and waite to conferm or save your txId to chek it later in this page or in <a href='https://etherscan.io/'>etherscan.io</a>. </p>
        <div className="row">
          <div className="col-sm-6">
            <h5>Deploy Smart Contract</h5>
            <p>Enter Name and Symbol and select Chain for space of  your smart contract</p>
            <div id="deploy" className="formSection formModal">
              <label className="lable">Choos your Chain</label>
              <div className='row px-2'>
                {BlockChaine.list.map((row, index) =>
                  <div key={index} className='col-sm-6 col-md-4  p-1 position-relative'>
                    <input name='blockChaine' required type='radio' onChange={(e) => { e.target.checked === true ? setDeployChaine(row.simbol) : setDeployChaine(""); (e.target.checked === true && row.simbol === "CELO") ? setIsCELO(true) : setIsCELO(false) }} />
                    <div className='category catModal'>
                      <span>
                        <img src={row.image} alt='' />
                      </span>
                      <div>{row.Name}</div>
                    </div>
                  </div>
                )}
              </div>
              {isCELO && <div className='row px-2'>
                <label className="lable">
                  CELO blackchain need to select feeCurrency:
                </label>
                {FeeCurrency.list.map((row, index) =>
                  <div key={index} className='col-sm-6 col-md-4  p-1 position-relative'>
                    <input name='feeCurrency' required type='radio' onChange={(e) => { e.target.checked === true ? setFeeCurrency(row.simbol) : setFeeCurrency("") }} />
                    <div className='category catModal'>
                      <span>
                        <img src={row.image} alt='' />
                      </span>
                      <div>{row.Name}</div>
                    </div>
                  </div>
                )}
              </div>}
              <div className='royaltyDeploy '>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <label className="lable">
                    Create a Royalty:<a href="/blog/RoyaltyNFTs"> more info</a>
                  </label>
                  <div className="check">
                    <input type="checkbox" onChange={(e) => { if (e.target.checked) { setRoyalti(true) } else { setRoyalti(false); setPercentage(false); setFixCashback(false) } }} />
                    <div className='back'></div>
                    <div className='circle'></div>
                  </div>
                </div>
                {royalti &&
                  <div className="d-flex align-items-center">
                    <div className="col-sm-6 p-1 position-relative">
                      <input name='royalty' required type='radio' checked={percentage} onChange={(e) => { setPercentage(true); setFixCashback(false); }} />
                      <div className='category catModal'>
                        <div>Percentage cashback</div>
                      </div>
                    </div>
                    <div className="col-sm-6 p-1 position-relative">
                      <input name='royalty' required type='radio' checked={fixCashback} onChange={(e) => { setFixCashback(true); setPercentage(false) }} />
                      <div className='category catModal'>
                        <div>Fix cashback</div>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div className='row py-2'>
                <div className='col-sm-6'>
                  <label className="lable">Name:</label>
                  <input className='formInput p-2' placeholder="Name" type="text" required value={deployName} onChange={(e) => setDeployName(e.target.value)} />
                </div>
                <div className='col-sm-6'>
                  <label className="lable">Symbol:</label>
                  <input className='formInput p-2' placeholder="Symbol" type="text" required value={deploySymbol} onChange={(e) => setDeploySymbol(e.target.value)} />
                </div>
              </div>
              <div className='d-flex justify-content-center align-items-center my-2'>
                <button className='btn btn-primary col-sm-6 addCollection' onClick={() => deployNew()}>Deploy New Contract</button>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <h5>Check txId</h5>
            <p>Paste txId to check it. if transaction confermed Contract addres is show in this section</p>
            <div id="checkTxId" className='getContractAddress'>
              <label className="lable">Get Contract Address by txId</label>
              <input type="text" className='formInput' required value={inputTxId} onChange={(e) => setInputTxId(e.target.value)} placeholder="Enter Your TxId" />
              <div className="formSection">
                <label className="lable">Choos your Chain</label>
                <div className='row px-2'>
                  {BlockChaine.list.map((row, index) =>
                    <div key={index} className='col-sm-6 col-md-4  p-1 position-relative'>
                      <input name='blockChainetx' required type='radio' onChange={(e) => { e.target.checked === true ? setDeployChaine(row.simbol) : setDeployChaine("") }} />
                      <div className='category catModal'>
                        <span>
                          <img src={row.image} alt='' />
                        </span>
                        <div>{row.Name}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button className='btn btn-outline-primary my-0 mx-auto d-block' onClick={() => checkContract()} >get Contract Address</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}