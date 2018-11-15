class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  validates :name, presence: true
  has_many :messages

  # ビューのif文を書くと煩雑になるため、モデルにインスタンスメソッドを定義することでシンプルにする。
  def show_last_message
    # 最後の投稿されたメッセージ.lastメソッドで代入をし、presentメソッドで判断
    if (last_message = messages.last).present?
      # 三項演算子で出し分ける
      last_message.body? ? last_message.body : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
