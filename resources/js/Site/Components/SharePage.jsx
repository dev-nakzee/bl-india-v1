import React from 'react';
import { IconButton, Menu, MenuItem, Box } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RedditIcon from '@mui/icons-material/Reddit';
import EmailIcon from '@mui/icons-material/Email';
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  ViberShareButton,
  EmailShareButton,
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
        className="top-social-icons" 
      >
        <ShareIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 300, // Adjust height if necessary
            width: 'auto',
            // padding: '10px',
            backgroundColor: 'rgba(13, 98, 154, 0.8)', // Semi-transparent background
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
          }}
        >
          <MenuItem onClick={handleClose}>
            <FacebookShareButton url={shareUrl} quote={title}>
              <IconButton>
                <FacebookIcon sx={{ color: 'white' }} />
              </IconButton>
            </FacebookShareButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <TwitterShareButton url={shareUrl} title={title}>
              <IconButton>
                <TwitterIcon sx={{ color: 'white' }} />
              </IconButton>
            </TwitterShareButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <TelegramShareButton url={shareUrl} title={title}>
              <IconButton>
                <TelegramIcon sx={{ color: 'white' }} />
              </IconButton>
            </TelegramShareButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
              <IconButton>
                <WhatsAppIcon sx={{ color: 'white' }} />
              </IconButton>
            </WhatsappShareButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <LinkedinShareButton url={shareUrl} title={title} summary={description} source={shareUrl}>
              <IconButton>
                <LinkedinIcon sx={{ color: 'white' }} />
              </IconButton>
            </LinkedinShareButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <PinterestShareButton url={shareUrl} media={image}>
              <IconButton>
                <PinterestIcon sx={{ color: 'white' }} />
              </IconButton>
            </PinterestShareButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <RedditShareButton url={shareUrl} title={title}>
              <IconButton>
                <RedditIcon sx={{ color: 'white' }} />
              </IconButton>
            </RedditShareButton>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <EmailShareButton url={shareUrl} subject={title} body={description}>
              <IconButton>
                <EmailIcon sx={{ color: 'white' }} />
              </IconButton>
            </EmailShareButton>
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
};

export default SharePage;
