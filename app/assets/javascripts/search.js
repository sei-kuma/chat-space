$(function() {

  function appendHTML(user) {
    var html = `<div class='chat-group-user clearfix' id='${ user.id }'>
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add", data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    $('#user-search-result').append(html);
  }
  function appendNoUser() {
    var html = `<p class="chat-group-user__name">一致しませんでした</p>`
    $('#user__name-result').append(html)
  }
  function appendGroupUser(user_name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${ user_id }'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $('#chat-group-user').append(html)
  }
    $("#user-search-field").on("keyup", function(){
      var input = $(this).val()
      if (input == "" ) {
      $('#user-search-result').empty()
        return false
      }
    $.ajax ({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json',
    })
    .done(function(data){
      $('#user-search-result').empty();
      if (data.length !== 0 ) {
        data.forEach(function(data){
        appendHTML(data)
        })
      }
      else {
        appendNoUser
      }
    })
    .fail(function(){
      alert('ユーザーの検索に失敗しました。')
    })
    $("#user-search-result").empty()
  })
  $('#user-search-result').on('click', '.user-search-add', function() {
    $('#user-search-field').val('');
    var userId = $(this).data('user-id')
    var userName = $(this).data('user-name')
    appendGroupUser(userName, userId)
    $(this).parent().remove()
  })
  $('#chat-group-user').on('click', '.js-remove-btn', function() {
    $(this).parent().remove()
  })
})