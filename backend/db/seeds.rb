# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

KilledMonster.delete_all
CollectedCoin.delete_all
Death.delete_all
TrophyUser.delete_all
Trophy.delete_all
User.delete_all
Monster.delete_all

User.create({ name: 'Jefferson', email: 'antunis56@gmail.com' })
Monster.create({ name: 'Leão' })
Monster.create({ name: 'Tigre' })

#MOEDAS
Trophy.create({ name: 'Nível 1', description: 'Nível um de coleta de moedas', type_trophy: 'coin', level: 1 });
Trophy.create({ name: 'Nível 2', description: 'Nível dois de coleta de moedas', type_trophy: 'coin', level: 100 });
Trophy.create({ name: 'Nível 3', description: 'Nível tres de coleta de moedas', type_trophy: 'coin', level: 1000 });
Trophy.create({ name: 'Nível 4', description: 'Nível quatro de coleta de moedas', type_trophy: 'coin', level: 10000 });
Trophy.create({ name: 'Nível 5', description: 'Nível cinco de coleta de moedas', type_trophy: 'coin', level: 100000 });

#DEATHS
Trophy.create({ name: 'Nível 1', description: 'Nível um de mortes', type_trophy: 'death', level: 1 });
Trophy.create({ name: 'Nível 2', description: 'Nível dois de mortes', type_trophy: 'death', level: 10 });
Trophy.create({ name: 'Nível 3', description: 'Nível tres de mortes', type_trophy: 'death', level: 25 });
Trophy.create({ name: 'Nível 4', description: 'Nível quatro de mortes', type_trophy: 'death', level: 50 });
Trophy.create({ name: 'Nível 5', description: 'Nível cinco de mortes', type_trophy: 'death', level: 100 });

#MONSTERS
Trophy.create({ name: 'Nível 1', description: 'Nível um de mortes', type_trophy: 'killed_monster', level: 1 });
Trophy.create({ name: 'Nível 2', description: 'Nível dois de mortes', type_trophy: 'killed_monster', level: 100 });
Trophy.create({ name: 'Nível 3', description: 'Nível tres de mortes', type_trophy: 'killed_monster', level: 1000 });
Trophy.create({ name: 'Nível 4', description: 'Nível quatro de mortes', type_trophy: 'killed_monster', level: 10000 });
Trophy.create({ name: 'Nível 5', description: 'Nível cinco de mortes', type_trophy: 'killed_monster', level: 100000 });

