module Api
	module V1
    class UserController < ApplicationController
      def index
				users = User.order('created_at DESC');
				render json: {status: 'SUCCESS', message:'Usuários carregados', data:users},status: :ok
			end

			def create
				usuario = User.create({ name: params['name'], email: params['email'] });
				render json: {status: 'SUCCESS', message:'Usuário cadastrado', data:usuario},status: :ok;
			end

			def show
				user = User.where(id: params['id']);
				print json: user
				render json: {status: 'SUCCESS', message:'Usuário carragado', data:user},status: :ok
			end
    end
	end
end