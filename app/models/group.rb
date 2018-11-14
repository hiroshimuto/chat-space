class Group < ApplicationRecord
  has_many :members
  has_many :user through: :members
  validates :name, presence: true
end
