module Api
	module V1
    class CollectedCoinController < ApplicationController
      def index
				collectedCoin = CollectedCoin.order('created_at DESC');
				render json: {status: 'SUCCESS', message:'Moedas carregadas', data:collectedCoin},status: :ok
			end

			def create
				coin = CollectedCoin.create({ user_id: params['user_id'], value: params['value'] });
				render json: {status: 'SUCCESS', message:'Moeda cadastrada', data:coin},status: :ok;
				verify;
			end

			def verify
				contCoin = CollectedCoin.where(user_id: params['user_id']).count
				trophys = Trophy.where(type_trophy: 'coin').where('level <= ?', contCoin).where('id NOT iN (?)', TrophyUser.select(:trophy_id).where(user_id: params['user_id']))
				if trophys.count > 0					
					trophys.each do |trophy| 
						TrophyUser.create({ user_id: params['user_id'], trophy_id: trophy.id })
					end 
				end
			end
    end
	end
end