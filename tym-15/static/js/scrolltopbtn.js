tlacitko = document.getElementById("buttonTopScroll");
function topFunction() {
  document.body.scrollTop = 0; //safari
  document.documentElement.scrollTop = 0; //chrome,ie,ff..
}

$(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 130) {
        $("#buttonTopScroll").css("display", "block");
    } else {
        $("#buttonTopScroll").css("display", "none");
    }
  });