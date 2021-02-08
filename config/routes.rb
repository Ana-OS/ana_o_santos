Rails.application.routes.draw do
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/whack_a_mole' => 'pages#whack_a_mole', :as => 'whack_a_mole'
  get '/connect_4' => 'pages#connect_4', :as => 'connect_4'
  get '/car_game' => 'pages#car_game', :as => 'car_game'
end
