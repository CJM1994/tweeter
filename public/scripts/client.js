/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const safeText = function (string) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
};

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
      ${safeText(tweetDataObj.content.text)}
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

  for (const Obj of tweetData.reverse()) {
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
        displayError(error);
      });
  };

  const addLatestTweet = function () {
    $.ajax('/tweets', { type: 'GET' })
      .then(function (db) {
        const $latestTweet = createTweetElement(db[db.length - 1]);
        $('#tweet-container').prepend($latestTweet);
      });
  };

  const displayError = function (error) {
    $('#error').empty();
    $('#error').append(`❌ Error: ${error} ❌`);
    $('#error').css('display', 'inline');
  };

  loadTweets();

  // Event-handler will submit form input as ajax request for new tweets
  $('form').on('submit', function (event) {
    event.preventDefault();
    $('#error').css('display', 'none');

    if (!$('form :input').val()) {
      displayError('No Message Entered');
    }
    else if (!$('form :input').val() || $('form :input').val().length > 140) {
      displayError('Message Over Limit');
    }
    else {
      $.ajax('/tweets', {
        type: 'POST',
        data: $(this).serialize()
      })
        .then(addLatestTweet)
        .catch(function (error) {
          displayError(error);
        });
    };
  });

  // Event-handler for form toggle button on top of page
  $('#toggle').on('click', function (event) {

    if ($('.new-tweet').css('display') === 'none') {
      $('.new-tweet').slideDown(400);
    } else {
      $('.new-tweet').slideUp(400);
    }

  });
});