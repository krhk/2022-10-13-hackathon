function validateContactForm() 
{
  var valid = true;
  $(".info").html("");
  $(".input-field").css('border', '#e0dfdf 1px solid');
  var userName = $("#userName").val();
  var userSurn = $("#userSurn").val();
  var userEmail = $("#userEmail").val();
  var userTel = $("#userTel").val();
  var content = $("#content").val();
  var rentFrom = $("#rentFrom").val();
  var rentTo = $("#rentTo").val();
  if (userName == "") {
    $("#userName-info").html("Povinné pole.");
    $("#userName").css('border', '#e66262 1px solid');
    valid = false;
  }
  if (userSurn == "") {
    $("#userSurn-info").html("Povinné pole.");
    $("#userSurn").css('border', '#e66262 1px solid');
    valid = false;
  }
  if (userEmail == "") {
    $("#userEmail-info").html("Povinné pole.");
    $("#userEmail").css('border', '#e66262 1px solid');
    valid = false;
  }
  if (!userEmail.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/))
  {
    $("#userEmail-info").html("Špatně zadaná adresa.");
    $("#userEmail").css('border', '#e66262 1px solid');
    valid = false;
  }
  if (userTel == "") {
    $("#userTel-info").html("Povinné pole.");
    $("#userTel").css('border', '#e66262 1px solid');
    valid = false;
  }
  if (content == "") {
    $("#userMessage-info").html("Povinné pole.");
    $("#content").css('border', '#e66262 1px solid');
    valid = false;
  }
  if (rentFrom == "") {
    $("#rentFrom").css('border', '#e66262 1px solid');
    valid = false;
  }
  if (rentTo == "") {
    $("#rentTo").css('border', '#e66262 1px solid');
    valid = false;
  } 
  if(txtCaptcha.value != CaptchaInput.value){
    $(".capbox").css('border', '#e66262 0px solid');
    $(".capbox").css('border-width', '2px 2px 2px 20px');
    valid = false;
  }
  return valid;
}
