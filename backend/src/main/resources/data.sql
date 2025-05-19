INSERT INTO user (firstname, secondname, gender, type, birthdate, phone, email, username, password, card_start, card_end)
  VALUES
    ('Pierre', 'Dupont', 'M', 'classic', '2000-04-17', '0612345678', 'pierre.dupont@gmail.com', 'pierrot1704', 'mdp1234', '2024-07-10', '2025-07-10'),
    ('Paul', 'Dupont', 'M', 'premium', '1985-02-28', '0612345689', 'paul.dupont@gmail.com', 'passionMuscu', 'mdp1234', '2025-01-10', '2026-01-10'),
    ('Jacques', 'Martin', 'M', 'coach', '1997-01-25', '0612345698', 'jacques.martin@gmail.com', 'jm1267', 'mdp1234', '2024-07-08', '2025-07-08'),
    ('Sarah', 'Dupuit', 'F', 'coach', '2004-12-10', '0612345777', 'sarah2345@gmail.com', 'SarahFitness', 'mdp1234', '2025-03-22', '2026-03-22'),
    ('Ginette', 'Lebel', 'F', 'classic', '1969-09-05', '0612345456', 'ginette.lebel@gmail.com', 'GinetteLebel', 'mdp1234', '2025-04-10', '2026-04-10');

INSERT INTO product (name, price, stock, description)
  VALUES
    ('Dumbbells 1kg', 10.99, 60, "Set of two professional dumbbells. \nWeight: 1kg \nColour: red"),
    ('Dumbbells 2kg', 14.99, 60, "Set of two professional dumbbells. \nWeight: 2kg \nColour: red"),
    ('Blue T-shirt - S', 29.99, 60, "T-shirt size S. \nMaterial: 100% cotton \nColor: blue"),
    ('Blue T-shirt - M', 29.99, 60, "T-shirt size M. \nMaterial: 100% cotton \nColor: blue"),
    ('Blue T-shirt - L', 29.99, 60, "T-shirt size L. \nMaterial: 100% cotton \nColor: blue"),
    ('Tung Tung Tung Sahur T-shirt - S', 39.99, 35, "HaGymont x Tung Tung Tung Sahur collaboration \nsize: S \nMaterial: 100% cotton \nColor: black"),
    ('Tung Tung Tung Sahur T-shirt - M', 39.99, 35, "HaGymont x Tung Tung Tung Sahur collaboration  \nsize: M \nMaterial: 100% cotton \nColor: black"),
    ('Tung Tung Tung Sahur T-shirt - L', 39.99, 35, "HaGymont x Tung Tung Tung Sahur collaboration  \nsize: L \nMaterial: 100% cotton \nColor: black");
  

INSERT INTO order_basket (username, address, created_at, status)
  VALUES
    ('pierrot1704', '3 rue de la poste 31000 Toulouse', '2025-03-17', 'shipped'),
    ('SarahFitness', '19 rue du moulin 31300 Toulouse', '2025-03-29', 'completed'),
    ('GinetteLebel', '19 bis avenue de la republique 32000 Auch', '2025-04-01', 'pending');

INSERT INTO purchase_order (product_id, order_id, quantity)
  VALUES
    (1, 1, 2),
    (2, 3, 1),
    (1, 2, 1);


INSERT INTO club (name, address, parking_capacity) VALUES
('Gym for all', '28 rue du dessus 31200 Toulouse', 45),
('BasicSport', '10 avenue du pont 31400 Toulouse', NULL),
('NeverQuit', '7 ter impasse des lilas 31000 Toulouse', 66),

('ParisFit', '15 rue de Rivoli 75004 Paris', 50),
('Louvre Gym', '3 boulevard de Sébastopol 75001 Paris', 40),
('ZenBody Paris', '22 avenue des Champs-Élysées 75008 Paris', NULL),

('Nice Move', '12 promenade des Anglais 06000 Nice', 25),
('Azure Pulse', '8 rue Masséna 06000 Nice', 168),
('Velvet Iron', '4 avenue Jean Médecin 06100 Nice', 60), 


('LA Powerhouse', '102 Sunset Blvd, Los Angeles CA 90026', 100),
('West Coast Gym', '55 Hollywood Blvd, Los Angeles CA 90028', 80),
('BeachFit LA', '200 Ocean Ave, Santa Monica CA 90401', 200);

INSERT INTO room (type, club_id)
  VALUES
    ('machines', 1),
    ('yoga', 1),
    ('cardio', 1),
    ('machines', 2),
    ('piscine', 2),
    ('machines', 3),
    ('cardio', 3);


INSERT INTO course (category, start_time, end_time, room_id, coach_username, capacity, price)
  VALUES
    ('cardio_fit', '2025-04-10 15:00', '2025-04-10 16:00', 3, 'jm1267', 10, 5.99),
    ('cardio_fit', '2025-04-12 15:00', '2025-04-12 16:00', 3, 'jm1267', 10, 5.99),
    ('renforcement', '2025-04-20 15:00', '2025-04-20 16:00', 1, 'SarahFitness', 15, 6.99),
    ('natation', '2025-04-10 14:30', '2025-04-10 15:30', 2, 'SarahFitness', 5, 7.99);

INSERT INTO reservation (status, date, user_id, course_id, num_parking_spaces)
  VALUES
    ('confirme', '2025-03-10', 'pierrot1704', 1, 1),
    ('annule', '2025-03-10', 'passionMuscu', 2, 0),
    ('confirme', '2025-04-01', 'GinetteLebel', 4, 0);
