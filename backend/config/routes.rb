Rails.application.routes.draw do
  namespace 'api' do
  	namespace 'v1' do
			resources :user
			resources :monster
			resources :collected_coin
			resources :death
			resources :killed_monster

			
			get '/trophy_user/:id', to: 'trophy_user#index'
			get '/death/getByUser/:id', to: 'death#getByUser'
			get '/collected_coin/getByUser/:id', to: 'collected_coin#getByUser'
			get '/killed_monster/getByUser/:id', to: 'killed_monster#getByUser'
  	end
	end
end
