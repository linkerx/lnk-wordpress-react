var React = require('react');
var Share = require('react-share');

var FacebookShareButton = Share.FacebookShareButton;
var TwitterShareButton = Share.TwitterShareButton;
var GooglePlusShareButton = Share.GooglePlusShareButton;
var WhatsappShareButton = Share.WhatsappShareButton;
var TelegramShareButton = Share.TelegramShareButton;
var LinkedinShareButton = Share.LinkedinShareButton;

var FacebookIcon = Share.FacebookIcon;
var TwitterIcon = Share.TwitterIcon;
var GooglePlusIcon = Share.GooglePlusIcon;
var WhatsappIcon = Share.WhatsappIcon;
var TelegramIcon = Share.TelegramIcon;
var LinkedinIcon = Share.LinkedinIcon;

require('./styles.less');



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
            <GooglePlusShareButton url={seoFullUrl} quote={props.quote} className="share-gplus">
                <GooglePlusIcon size={40} round />
            </GooglePlusShareButton>
            <LinkedinShareButton url={seoFullUrl} quote={props.quote} className="share-whatsapp">
                <LinkedinIcon size={40} round />
            </LinkedinShareButton>
        </section>
    )
}

module.exports = ShareButtons;
