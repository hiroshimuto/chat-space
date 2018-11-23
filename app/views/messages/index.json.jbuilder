json.array! @new_messages do |message|
  json.body     message.body
  json.id           message.id
  json.user_name         message.user.name
  json.image        message.image.url
  json.created_at         message.created_at
end
