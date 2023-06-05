import React from "react";

function ShareButtons() {
  return (
    <div>
      <div className="sharing-buttons flex flex-wrap">
        <a
          className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-1 rounded-full text-white border-white-600 bg-white-600 hover:bg-white-700 hover:border-white-700"
          target="_blank"
          rel="noopener"
          href="https://facebook.com/sharer/sharer.php?u="
          aria-label="Share on Facebook"
        >
          <svg
            aria-hidden="true"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="w-4 h-4"
          >
            <title>Facebook</title>
            <path d="M379 22v75h-44c-36 0-42 17-42 41v54h84l-12 85h-72v217h-88V277h-72v-85h72v-62c0-72 45-112 109-112 31 0 58 3 65 4z"></path>
          </svg>
        </a>
        <a
          className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-1 rounded-full text-white border-white-600 bg-white-600 hover:bg-white-700 hover:border-white-700"
          target="_blank"
          rel="noopener"
          href="https://twitter.com/intent/tweet?url=&amp;text="
          aria-label="Share on Twitter"
        >
          <svg
            aria-hidden="true"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="w-4 h-4"
          >
            <title>Twitter</title>
            <path d="m459 152 1 13c0 139-106 299-299 299-59 0-115-17-161-47a217 217 0 0 0 156-44c-47-1-85-31-98-72l19 1c10 0 19-1 28-3-48-10-84-52-84-103v-2c14 8 30 13 47 14A105 105 0 0 1 36 67c51 64 129 106 216 110-2-8-2-16-2-24a105 105 0 0 1 181-72c24-4 47-13 67-25-8 24-25 45-46 58 21-3 41-8 60-17-14 21-32 40-53 55z"></path>
          </svg>
        </a>
        <a
          className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-1 rounded-full text-white border-white-600 bg-white-600 hover:bg-white-700 hover:border-white-700"
          target="_blank"
          rel="noopener"
          href="https://www.linkedin.com/shareArticle?mini=true&amp;url=&amp;title=&amp;summary=&amp;source="
          aria-label="Share on Linkedin"
        >
          <svg
            aria-hidden="true"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="w-4 h-4"
          >
            <title>Linkedin</title>
            <path d="M136 183v283H42V183h94zm6-88c1 27-20 49-53 49-32 0-52-22-52-49 0-28 21-49 53-49s52 21 52 49zm333 208v163h-94V314c0-38-13-64-47-64-26 0-42 18-49 35-2 6-3 14-3 23v158h-94V183h94v41c12-20 34-48 85-48 62 0 108 41 108 127z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default ShareButtons;
