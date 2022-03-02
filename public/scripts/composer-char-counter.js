$(document).ready(function () {
  console.log('DOM Loaded...');

  /*
  * Update character counter for tweet input
  */
  $('#tweet-text').on('input', function () {

    const remainingChars = 140 - this.value.length;
    $(this).siblings('div').children('.counter').text(remainingChars);

    if (remainingChars < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'inherit');
    };

  });

});