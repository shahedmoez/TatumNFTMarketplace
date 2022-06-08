//--------- this function for set all Alert notification---------
//------------- tow model designed in this function -------------
//------- alert full with of the page that load in App.js -------
//--- modal for set action and call APIs showing step by step ---

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/Alert.css";
import { alert, selectAlert } from "../features/NFT/NFTSlice";
export default function Alert(props) {
    const massage = props.info.massage;
    const type = props.info.type
    const [stepType, setStepType] = useState("primary");
    const [stepCount, setStepcount] = useState(0);
    const showmodal = useSelector(selectAlert).showModal
    var time = 2000;
    if (props.info.time) time = props.info.time;
    const dispatch = useDispatch()
    useEffect(() => {
        (!props.info.modal && !props.info.steps) &&
            setTimeout(() => {
                dispatch(alert({ show: false }));
            }, time)
    }, [props])
    return (
        <>
                {(!props.info.modal && !props.info.steps) && <div className={"alertStyle alert alert-" + type} role="alert">
                    {massage}{props.info.loading && <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
                </div>
            }
            {(props.info.steps && showmodal) &&
                <div className="alertModal">
                    <div className={"alertBody alert alert-" + stepType}>
                        {props.info.title &&
                            <h5 className="alertTitle">
                                {props.info.title}
                            </h5>
                        }
                        <div className="row ">
                            {props.info.steps.map((row, index) =>
                                <div key={index} className="col-sm-12  d-flex align-items-center py-3">
                                    <span className="apiName">{row.name}</span>
                                    {(stepCount < index) && <span className="circle"></span>}
                                    {(stepCount == index) &&
                                        <span className="inProgress">
                                            {(row.api === "loading") && <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
                                            {(row.api === "idle") && <img src={window.location.origin + "/Images/icon/success.png"} alt="" onLoad={() => setStepcount(stepCount + 1)} />}
                                            {(row.api === "rejected") && <img src={window.location.origin + "/Images/icon/fail.png"} alt="" onLoad={() => { setStepType("danger"); setStepcount(props.info.steps.length + 2) }} />}
                                        </span>}
                                    {((stepCount > index)&&(row.api==="idle")) &&  <span className="inProgress"><img src={window.location.origin + "/Images/icon/success.png"} alt="" /></span>}
                                    {((stepCount > index)&&(row.api==="rejected")) &&  <span className="inProgress"><img src={window.location.origin + "/Images/icon/fail.png"} alt="" /></span>}
                                </div>
                            )}
                        </div>
                        {(stepCount == props.info.steps.length)&&
                         <div className="d-flex justify-contetnt-center align-items-center ">
                            {massage&& <p className="alertModalMassage"><strong>{massage}</strong></p>}
                         </div>
                        }
                        {(stepCount >= props.info.steps.length)
                            ? <div className="alertModalFooter">
                                <button className={"mx-2 btn btn-outline-" + stepType} onClick={() => { dispatch(alert({showModal:false})); setStepcount(0) ;setStepType("primary") }}>OK</button>
                                {((stepCount == props.info.steps.length)&&(props.info.copy))&& <button className={"mx-2 btn btn-outline-" + stepType} onClick={() => navigator.clipboard.writeText(props.info.copy)}>Copy Info</button>}
                            </div>
                            :<div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={(stepCount/props.info.steps.length)*100} aria-valuemin="0" aria-valuemax="100" style={{width:(stepCount/props.info.steps.length)*100+"%"}}></div>
                          </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}