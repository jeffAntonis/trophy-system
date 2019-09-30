module Api
	module V1
    class DeathController < ApplicationController
      def index
				collectedDeath = Death.order('created_at DESC');
				render json: {status: 'SUCCESS', message:'Mortes carregadas', data:collectedDeath},status: :ok
			end

			def create
				death = Death.create({ user_id: params['user_id'] });
				render json: {status: 'SUCCESS', message:'Morte cadastrada', data:death},status: :ok
				verify;
			end

			def verify
				contDeath = Death.where(user_id: params['user_id']).count
				trophys = Trophy.where(type_trophy: 'death').where('level <= ?', contDeath).where('id NOT iN (?)', TrophyUser.select(:trophy_id).where(user_id: params['user_id']))
				
				if trophys.count > 0					
					trophys.each do |trophy| 
						TrophyUser.create({ user_id: params['user_id'], trophy_id: trophy.id })
					end 
				end
			end

			def getByUser
				collectedDeath = Death.where(user_id: params['id'])
				render json: {status: 'SUCCESS', message:'Mortes carregadas', data:collectedDeath},status: :ok
			end
    end
	end
end