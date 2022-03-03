/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1646017258735
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1646103658735
  }
]

const createTweetElement = function (tweetData) {

  let tweetElement = `
  <article class="tweet">
  <header>
    <div>
      <img src="${tweetData.user.avatars}">
      ${tweetData.user.name}
    </div>
    <p>
      ${tweetData.user.handle}
    </p>
  </header>
  <p>
    ${tweetData.content.text}
  </p>
  <footer>
    <div class="divider"></div>
    <div class="footer-content">
      <p>10 days ago</p>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </div>
  </footer>
  </article>
  `

  return tweetElement;
};

const $tweet = createTweetElement(tweetData[0]);
console.log($tweet);
$('#tweet-container').append($tweet);