class TrophyUser < ApplicationRecord
  belongs_to :user
  belongs_to :trophy
  belongs_to :monster, optional: true
end
