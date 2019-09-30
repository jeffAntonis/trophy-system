module Api
	module V1
    class KilledMonsterController < ApplicationController
      def index
				collectedKilledMonster = KilledMonster.order('created_at DESC');
				render json: {status: 'SUCCESS', message:'Mortes de monstros carregados', data:collectedKilledMonster},status: :ok
			end

			def create
				killed = KilledMonster.create({ user_id: params['user_id'], monster_id: params['monster_id'] });
				render json: {status: 'SUCCESS', message:'Morte de monstro cadastrada', data:killed},status: :ok
				verify;
			end

			def verify
				contKilled = KilledMonster.where(user_id: params['user_id'], monster_id: params['monster_id']).count
				trophys = Trophy.where(type_trophy: 'killed_monster').where('level <= ?', contKilled).where('id NOT iN (?)', TrophyUser.select(:trophy_id).where(user_id: params['user_id'], monster_id: params['monster_id']))
				if trophys.count > 0					
					trophys.each do |trophy| 
						TrophyUser.create({ user_id: params['user_id'], trophy_id: trophy.id, monster_id: params['monster_id'] })
					end 
				end
			end
    end
	end
end