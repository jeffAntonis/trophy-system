module Api
	module V1
    class MonsterController < ApplicationController
      def index
				collectionMonster = Monster.order('created_at DESC');
				render json: {status: 'SUCCESS', message:'Monstros carregados', data:collectionMonster},status: :ok
			end

			def create
				monster = Monster.create({ name: params['name'] });
				render json: {status: 'SUCCESS', message:'Monstro cadastrado', data:monster},status: :ok;
			end
    end
	end
end