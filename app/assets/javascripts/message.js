$(function(){
  function buildHTML(message){
    var imagehtml = (message.image)? `<img class="lower-message__image" src="${message.image}">` : "";
    var html =`
    <div class="chat__message" message-id=${message.id}>
      <li class="user-name">
        <p>${message.user_name}</p>
      </li>
      <li class="send-time">
        <p>${message.created_at}</p>
      </li>
      <li class="send-message">
        <p>${message.body}</p>
        ${imagehtml}
      </li>
    </div>
    `
    $('.chat__messages').append(html);
  }
  $('.new_message').on('submit', function(e){
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
      $('.chat__messages').append(html);
      $('#upload-text').val('')
      $('.chat__messages').animate({scrollTop: $('.chat__messages')[0].scrollHeight}, 'slow' );
      $("#button").removeAttr("disabled");
    })
  });


  // 自動更新
  var interval = setInterval(function() {
    var LastMsgId = $('.chat__message').last().attr('message-id');

    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: window.location.href,
        type: "GET",
        data: { id: LastMsgId },
        dataType: "json"
      })

      .done(function(data){
        data.forEach(function(message){
          buildHTML(message);
        })
        $('.chat__messages').animate({scrollTop: $('.chat__messages')[0].scrollHeight}, 'slow' );
        $('#upload-text').val('')
        $("#button").removeAttr("disabled");
      })

      .fail(function(){
        alert("自動更新に失敗しました")
      })

    } else {
      clearInterval(interval);
    }
  }, 5000 );

});
