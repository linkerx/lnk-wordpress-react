var React = require('react');

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
        <div>
        <FacebookShareButton url={props.url} quote={props.quote} className="Demo__some-network__share-button">
            <FacebookIcon size={32} round />
        </FacebookShareButton>
        <FacebookShareButton url={props.url} quote={props.quote} className="Demo__some-network__share-button">
            <FacebookIcon size={32} round />
        </FacebookShareButton>
        </div>
    )
}

module.exports = ShareButtons;
