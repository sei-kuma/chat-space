json.id @message.id
json.content  @message.content
json.image  @message.image.url
json.user_name  @message.user.name
json.time simple_time(@message.created_at)
