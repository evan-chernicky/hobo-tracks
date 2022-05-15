# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Creating users..."
50.times do
    User.create(username: Faker::Artist.name, password: Faker::Artist.name, first_name: Faker::Name.male_first_name, bio: Faker::Quote.matz)
    User.create(username: Faker::Artist.name, password: Faker::Artist.name, first_name: Faker::Name.female_first_name, bio: Faker::Quote.matz)
end
