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

const createTweetElement = function (tweetDataObj) {

  let tweetElement = `
    <article class="tweet">
    <header>
      <div>
        <img src="${tweetDataObj.user.avatars}">
        ${tweetDataObj.user.name}
      </div>
      <p>
        ${tweetDataObj.user.handle}
      </p>
    </header>
    <p>
      ${tweetDataObj.content.text}
    </p>
    <footer>
      <div class="divider"></div>
      <div class="footer-content">
        <p>${timeago.format(tweetDataObj.created_at)}</p>
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

const renderTweets = function (tweetData) {

  for (const Obj of tweetData) {
    const renderTweet = createTweetElement(Obj);
    $('#tweet-container').append(renderTweet);
  }

};

$(document).ready(function () {
  renderTweets(tweetData);
})