$(function(){
  var search_result = $("#user-search-result")
  var addUser_result = $(".chat-group-users")

//インクリメンタルサーチにともなうユーザーリストの追加
  function appendUser(user) {
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>`
    search_result.append(html);
  }
//該当ユーザーがいなかった時の関数
  function appendNoUser(user) {
    var html = `
      <p class="chat-group-user__name">${user}</p>`
    search_result.append(html);
  }
//ユーザーリストから追加を押したらリストから消えて、チャットメンバーに追加する関数
  function appendMember(user_id, user_name) {
    var html = `
      <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
        <input name='group[user_ids][]' type='hidden' value='${user_id}'>
        <p class='chat-group-user__name'>${user_name}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
    addUser_result.append(html);
  }

//ユーザーリストから追加ボタンを押した時のイベント発火
  $(search_result).on("click", ".chat-group-user__btn--add",function(){
    var user_id = $(this).data("user-id");
    var user_name = $(this).data("user-name");
    appendMember(user_id, user_name);
    $(this).parent().remove();
  });

//追加されたユーザーの削除ボタンを押した時のイベント発火
  $(addUser_result).on("click", ".chat-group-user__btn--remove",function(){
    $(this).parent().remove();
  });


//インクリメンタルサーチのイベント発火と非同期通信
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users){
      $(search_result).empty();
      if (input.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('error');
    })
  });
});

