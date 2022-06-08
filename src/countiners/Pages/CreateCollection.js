//-------- in this page user can creat colection in marketplace-------
//-- this page notshowing and need to runing backend in next update --

import { useState } from 'react';
import '../../Styles/Create.css';
import category from '../../constance/category.json'
import { useSelector } from 'react-redux';
import { selectNetwork } from '../../features/NFT/NFTSlice';
export default function CreateCollection() {
    const BlockChaine = useSelector(selectNetwork);
    const [img, setImg] = useState([{ Logo: "", Featur: "", Banner: "" }]);
    const [nameNFT, setNameNFT] = useState();
    const [categ,setCateg] = useState("");
    const [block,setblock] = useState("");
    // for show img in form
    const onImageChange = (e) => {
        const [file] = e.target.files;
        const name = e.target.name;
        const imgList = [...img];
        imgList[0][name] = URL.createObjectURL(file);
        setImg(imgList , block);
    };
    return (
        <>
            <div className="Create">
                <h1>Create New Collection</h1>
                <form className="creatForm">
                    <p className="detaileForm">
                        <i >*</i> Required fields
                    </p>
                    <div className="formSection">
                        <label className="lable">
                            Logo image<i> *</i>
                        </label>
                        <span className="detaileForm">
                            This image will also be used for navigation. 350 x 350 recommended.
                        </span>
                        <div className='inputImage'>
                            <input id="media" onChange={(e) => onImageChange(e)} name="Logo" accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf" type="file" autoComplete="off" tabIndex="-1" required="required" />
                            <div className='LogoBordered'>
                                {img[0]["Logo"] === "" ? <span className="icon">image</span>
                                    : <img src={img[0]["Logo"]} alt="" />
                                }

                            </div>
                        </div>
                    </div>
                    <div className="formSection">
                        <label className="lable">
                            Featured image
                        </label>
                        <span className="detaileForm">
                            This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of OpenSea. 600 x 400 recommended.
                        </span>
                        <div className='inputImage'>
                            <input id="media" onChange={(e) => onImageChange(e)} name="Featur" accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf" type="file" autoComplete="off" tabIndex="-1" required="" />
                            <div className='bredered'>
                                {img[0]["Featur"] === "" ? <span className="icon">image</span>
                                    : <img src={img[0]["Featur"]} alt="" />
                                }

                            </div>
                        </div>
                    </div>
                    <div className="formSection">
                        <label className="lable">
                            Banner image
                        </label>
                        <span className="detaileForm">
                            This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 400 recommended.
                        </span>
                        <div className='inputImage'>
                            <input id="media" onChange={(e) => onImageChange(e)} name="Banner" accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf" type="file" autoComplete="off" tabIndex="-1" required="" />
                            <div className='BanerBorderd'>
                                {img[0]["Banner"] === "" ? <span className="icon">image</span>
                                    : <img src={img[0]["Banner"]} alt="" />
                                }

                            </div>
                        </div>
                    </div>
                    <div className='formSection'>
                        <label className="lable">Name<i> *</i></label>
                        <input value={nameNFT} onChange={(e) => setNameNFT(e.target.value)} autoCapitalize="off" autoComplete="off" autoCorrect="off" className="formInput" data-testid="Input" id="name" name="name" placeholder="Example: Treasures of Diamond" required="required" spellCheck="false" type="text" />
                    </div>
                    <div className="formSection">
                        <label className="lable">URL</label>
                        <span className="detaileForm"> Customize your URL on NFT Market. Must only contain lowercase letters, numbers, and hyphens.</span>
                        <div className='urlCollection'>
                            <span>https://NFTMarket/collection/</span>
                            <input autoCapitalize="off" autoComplete="off" autoCorrect="off" className="formInput" data-testid="Input" id="external_link" name="external_link" placeholder="Treasures-of-Diamond" spellCheck="false" type="text" />
                        </div>
                    </div>
                    <div className="formSection">
                        <label className="lable">Description</label>
                        <span className="detaileForm">Markdown syntax is supported. 0 of 1000 characters used.</span>
                        <textarea id="description" name="description" placeholder="Provide a detailed description of your item." rows="4" className="formInput">
                        </textarea>
                    </div>
                    <div className="formSection">
                        <label className="lable">Category</label>
                        <p className="propertyDetails">Adding a category will help make your item discoverable on NFT Market.</p>
                        <div className='row'>
                            {category.list.map((row, index) =>
                                <div key={index} className='col-lg-3 col-sm-4 col-6 p-2 position-relative'>
                                    <input name='category' type='radio' onChange={(e)=>{e.target.checked === true  && setCateg(row.Name) }}/>
                                    <div className='category'>
                                        <span>
                                            <img src={row.image} alt='' />
                                        </span>
                                        <div>{row.Name}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="formSection">
                        <label className="lable">Blockchain</label>
                        <p className="propertyDetails">Choos your space</p>
                        <div className='row'>
                            {BlockChaine.list.map((row, index) =>
                                <div key={index} className='col-lg-3 col-sm-4 col-6 p-2 position-relative'>
                                    <input name='blockChaine' type='radio' onChange={(e)=>{e.target.checked === true  && setblock(row.Name) }}/>
                                    <div className='category'>
                                        <span>
                                            <img src={row.image} alt='' />
                                        </span>
                                        <div>{row.Name}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="formSection">
                        <div className='d-flex justify-content-between px-4'>
                            <button type="submit" onClick={() => { document.getElementsByClassName('creatForm')[0].classList.add('Invalid') }} className="btn btn-primary" disabled="">Create</button>
                            <button type="reset" className="btn btn-outline-danger" disabled="disable">Delete Item</button>
                        </div>
                    </div>
                </form >
            </div >
        </>
    )
}