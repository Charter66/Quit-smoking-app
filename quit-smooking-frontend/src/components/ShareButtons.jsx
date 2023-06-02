import React from 'react';
import { css } from '@emotion/react';

import { FacebookShareButton, TwitterShareButton } from 'react-custom-share';


const ShareButtons = ({ title, url }) => {
  const shareUrl = url; // The URL to be shared
  const shareTitle = title; // The title or caption of the shared content

  return (
    <div>
      <FacebookShareButton url={shareUrl} quote={shareTitle}>
        <button>Share on Facebook</button>
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={shareTitle}>
        <button>Share on Twitter</button>
      </TwitterShareButton>
    </div>
  );
};

export default ShareButtons;
