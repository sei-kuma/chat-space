## users

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|
|pass|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: :members
- has_many :members

## groups

|Column|Type|Options|
|------|----|-------|
|group_name|string|index: true, null: false|

### Association
- has_many :messages
- has_many :users, through: :members
- has_many :members

## members

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messages

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
