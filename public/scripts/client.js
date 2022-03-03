/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Takes tweet data from an object in the db and parses into html
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

// Renders and parses all tweets in the DB array
const renderTweets = function (tweetData) {

  for (const Obj of tweetData) {
    const renderTweet = createTweetElement(Obj);
    $('#tweet-container').append(renderTweet);
  }

};

// Start of function calls
$(document).ready(function () {

  // Sends get request to /tweets and displays them on page
  const loadTweets = function () {
    $.ajax('/tweets', { type: 'GET' })
      .then(function (db) {
        renderTweets(db);
      })
      .catch(function (error) {
        console.log('error', error);
        alert(`error: ${error}`);
      });
  };

  loadTweets();

  // Event-handler will submit form input as ajax request for new tweets
  $('form').on('submit', function (event) {
    event.preventDefault();

    if (!$('form :input').val()) {
      alert('Warning: No Message Entered');
    }
    else if (!$('form :input').val() || $('form :input').val().length > 140) {
      alert('Warning: Message Over Limit');
    }
    else {
      $.ajax('/tweets', {
        type: 'POST',
        data: $(this).serialize()
      });
    };
  });

});