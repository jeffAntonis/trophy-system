Rails.application.routes.draw do
  namespace 'api' do
  	namespace 'v1' do
			resources :user
			resources :monster
			resources :collected_coin
			resources :death
			resources :killed_monster

			
			get '/trophy_user/:id', to: 'trophy_user#index'
  	end
	end
end
