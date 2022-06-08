//----- you can change all text and link and other thisg in this component in footer,json -----

import '../Styles/Footer.css';
import footer from '../constance/footer.json'
export default function Footer() {

  return (
    <>
      <footer className="footer">
        <div className="container bottom_border">
          <div className="row">
            <div className=" col-sm-4 col-md col-sm-4  col-12 col">
              <h5 className="headin5_amrc col_white_amrc pt2">Find us</h5>
              <p className="mb10">{footer.findUsText}</p>
              <p><img className='iconTel' src='Images/icon/nav.png' alt='' />{footer.location}</p>
              <p><img className='iconTel' src='Images/icon/phone.png' alt='' />{footer.phoneNumber}</p>
              <p><img className='iconTel' src='Images/icon/mail.png' alt='' />{footer.email}</p>
            </div>
            <div className=" col-sm-4 col-md  col-6 col">
              <h5 className="headin5_amrc col_white_amrc pt2">Quick links</h5>
              <ul className="footer_ul_amrc">
                {footer.quickLinks1.map((row, index) =>
                  <li key={index}><a href={row.url}>{row.name}</a></li>
                )}
              </ul>
            </div>
            <div className=" col-sm-4 col-md  col-6 col">
              <h5 className="headin5_amrc col_white_amrc pt2">Quick links</h5>
              <ul className="footer_ul_amrc">
                {footer.quickLinks2.map((row, index) =>
                  <li key={index}><a href={row.url}>{row.name}</a></li>
                )}
              </ul>
            </div>
            <div className=" col-sm-4 col-md  col-12 col">
              <h5 className="headin5_amrc col_white_amrc pt2">Follow us</h5>
              <ul className="footer_ul2_amrc">
                {footer.followUs.map((row, index) =>
                  <li key={index}><p><img className='iconInP' src='Images/icon/twitter.png' alt='' />{row.name}<a href={row.url}>{row.url}</a></p></li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <p className="text-center mt-3">{footer.copyright.text}<a href={footer.copyright.url}>{footer.copyright.designer}</a></p>
          <ul className="social_footer_ul">
            <li><a href={footer.facebook}><img className='iconSosial' src='Images/icon/facebook.png' /> </a></li>
            <li><a href={footer.twitter}><img className='iconSosial' src='Images/icon/twitter.png' /> </a></li>
            <li><a href={footer.linkedin}><img className='iconSosial' src='Images/icon/linkedin.png' /> </a></li>
            <li><a href={footer.instagram}><img className='iconSosial' src='Images/icon/instagram.png' /> </a></li>
          </ul>
        </div>
      </footer>
    </>
  )
}