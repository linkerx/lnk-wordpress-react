import React from 'react';

import { 
    FacebookShareButton, 
    TwitterShareButton, 
    WhatsappShareButton,
    TelegramShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    TelegramIcon,
    LinkedinIcon
} from 'react-share';

require('./styles.scss');

function ShareButtons (props) {

    var seoFullUrl = window.location.href;

    return(
        <section id='share-buttons'>
            <FacebookShareButton url={seoFullUrl} quote={props.quote} className="share-facebook">
                <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={seoFullUrl} quote={props.quote} className="share-twitter">
                <TwitterIcon size={40} round />
            </TwitterShareButton>
            <TelegramShareButton url={seoFullUrl} quote={props.quote} className="share-whatsapp">
                <TelegramIcon size={40} round />
            </TelegramShareButton>
            <WhatsappShareButton url={seoFullUrl} quote={props.quote} className="share-whatsapp">
                <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={seoFullUrl} quote={props.quote} className="share-whatsapp">
                <LinkedinIcon size={40} round />
            </LinkedinShareButton>
        </section>
    )
}

export default ShareButtons;
