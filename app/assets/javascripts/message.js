$(document).on('turbolinks:load',function(){
$(function(){
  function buildHTML(message){
    var img = "";
    if (message.image){
      img = `<img src=${message.image} class: 'lower-message__image'>`
    }
    var html = `<div class="message" message-id = "${message.id}">
                  <ul class="upper-message">
                    <li class="upper-message__user-name">
                      ${message.user_name}
                    </li>
                    <li class="upper-message__date">
                      ${message.time}
                    </li>
                  </ul>
                  <ul class="lower-message">
                      <li class="lower-message__content">
                        ${message.content}
                      </li>
                        ${img}
                  </ul>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight})
      $('.form__submit').prop("disabled", false)
      $('.new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
  })

  function getMessage() {
    var newMessageId = $('.message').last().attr('message-id')
    console.log(newMessageId)
    $.ajax ({
      type: 'GET',
      url: location.href,
      data: { id: newMessageId },
      dataType: 'json'
    })
    .done(function(data){
      data.forEach(function(message) {
        var html = buildHTML(message)
        $('.messages').append(html)
      })
      if (data.length > 0) {
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight})
      }
    })
  }
  var pathname = location.pathname.match(/messages/)
  var reg = RegExp(pathname);
  if(reg.test("messages")){
    setInterval(getMessage, 1000)
  }
})
  return false;
})
