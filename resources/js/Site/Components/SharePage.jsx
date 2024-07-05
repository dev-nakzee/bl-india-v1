import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  MailruShareButton,
  LivejournalShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  HatenaShareButton,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  WeiboIcon,
  PocketIcon,
  InstapaperIcon,
  HatenaIcon,
  EmailIcon,
} from 'react-share';

const SharePage = ({ color = 'default' }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const shareUrl = window.location.href;
  const title = document.title;
  const description = document.querySelector("meta[name='description']")?.getAttribute('content') || '';
  const image = document.querySelector("meta[property='og:image']")?.getAttribute('content') || '';

  return (
    <>
      <IconButton
        aria-label="share"
        onClick={handleClick}
        color={color}
      >
        <ShareIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FacebookMessengerShareButton url={shareUrl} appId="YOUR_APP_ID">
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TelegramShareButton url={shareUrl} title={title}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LinkedinShareButton url={shareUrl} title={title} summary={description} source={shareUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PinterestShareButton url={shareUrl} media={image}>
            <PinterestIcon size={32} round />
          </PinterestShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <VKShareButton url={shareUrl} image={image}>
            <VKIcon size={32} round />
          </VKShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <OKShareButton url={shareUrl} title={title}>
            <OKIcon size={32} round />
          </OKShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <RedditShareButton url={shareUrl} title={title}>
            <RedditIcon size={32} round />
          </RedditShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TumblrShareButton url={shareUrl} title={title} caption={description}>
            <TumblrIcon size={32} round />
          </TumblrShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <MailruShareButton url={shareUrl} title={title}>
            <MailruIcon size={32} round />
          </MailruShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LivejournalShareButton url={shareUrl} title={title}>
            <LivejournalIcon size={32} round />
          </LivejournalShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ViberShareButton url={shareUrl} title={title}>
            <ViberIcon size={32} round />
          </ViberShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <WorkplaceShareButton url={shareUrl} quote={title}>
            <WorkplaceIcon size={32} round />
          </WorkplaceShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LineShareButton url={shareUrl} title={title}>
            <LineIcon size={32} round />
          </LineShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <WeiboShareButton url={shareUrl} title={title} image={image}>
            <WeiboIcon size={32} round />
          </WeiboShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PocketShareButton url={shareUrl} title={title}>
            <PocketIcon size={32} round />
          </PocketShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <InstapaperShareButton url={shareUrl} title={title} description={description}>
            <InstapaperIcon size={32} round />
          </InstapaperShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <HatenaShareButton url={shareUrl} title={title}>
            <HatenaIcon size={32} round />
          </HatenaShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <EmailShareButton url={shareUrl} subject={title} body={description}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SharePage;
