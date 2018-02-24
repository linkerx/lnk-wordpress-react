var React = require('react');
require('./styles.less');

import {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,

  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,

  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
} from 'react-share';

function ShareButtons (props) {
    return(
        <section id='share-buttons'>
            <FacebookShareButton url={props.url} quote={props.quote} className="share-facebook">
                <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={props.url} quote={props.quote} className="share-twitter">
                <TwitterIcon size={40} round />
            </TwitterShareButton>
            <TelegramShareButton url={props.url} quote={props.quote} className="share-whatsapp">
                <TelegramIcon size={40} round />
            </TelegramShareButton>
            <WhatsappShareButton url={props.url} quote={props.quote} className="share-whatsapp">
                <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <GooglePlusShareButton url={props.url} quote={props.quote} className="share-gplus">
                <GooglePlusIcon size={40} round />
            </GooglePlusShareButton>
            <LinkedinShareButton url={props.url} quote={props.quote} className="share-whatsapp">
                <LinkedinIcon size={40} round />
            </LinkedinShareButton>
        </section>
    )
}

module.exports = ShareButtons;
