$(document).ready(function () {
  console.log('DOM Loaded...');

  /*
  * Update character counter for tweet input
  */
  $('#tweet-text').on('focus keydown', function () {

    const remainingChars = 140 - this.value.length;
    const display = this.parentElement.childNodes[3].childNodes[3];
    display.value = remainingChars;

    if (remainingChars < 0) {
      display.classList.add('tweet-text-negative');
    } else {
      display.classList.remove('tweet-text-negative');
    };

  });

});