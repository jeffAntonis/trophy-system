module Api
	module V1
    class TrophyUserController < ApplicationController
      def index
				trophys = TrophyUser.select(:id, :user_id, :monster_id, 'trophies.name', :type_trophy).joins(:trophy, "LEFT JOIN monsters ON trophy_users.monster_id = monsters.id").where(user_id: params[:id]);
				render json: {status: 'SUCCESS', message:'Trofeus do usuário carregados', data:trophys},status: :ok;
			end
    end
	end
end