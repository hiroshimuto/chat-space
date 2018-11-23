json.messages @messages.each do |message|
  json.name message.user.name
  json.body     message.body
  json.image    message.image
  json.id       message.id
  json.group_id  message.group_id
  json.user_id  message.user_id
end
