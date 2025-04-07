INSERT INTO user (firstname, secondname, gender, type, birthdate, phone, email, login, password)
  VALUES
    ('Pierre', 'Dupont', 'M', 'classic', '2000-04-17', '0612345678', 'pierre.dupont@gmail.com', 'pierrot1704', 'mdp1234'),
    ('Paul', 'Dupont', 'M', 'premium', '1985-02-28', '0612345689', 'paul.dupont@gmail.com', 'passionMuscu', 'mdp1234'),
    ('Jacques', 'Martin', 'M', 'coach', '1997-01-25', '0612345698', 'jacques.martin@gmail.com', 'jm1267', 'mdp1234'),
    ('Sarah', 'Dupuit', 'F', 'coach', '2004-12-10', '0612345777', 'sarah2345@gmail.com', 'SarahFitness', 'mdp1234'),
    ('Ginette', 'Lebel', 'F', 'classic', '1969-09-05', '0612345456', 'ginette.lebel@gmail.com', 'GinetteLebel', 'mdp1234');

INSERT INTO card (type, start_date, expiration_date, user_login)
  VALUES
    ('classic', '2025-03-01', '2026-03-01', 'pierrot1704'),
    ('premium', '2024-09-04', '2025-09-04', 'passionMuscu'),
    ('coach', '2024-12-12', '2025-12-12', 'jm1267'),
    ('admin', '2025-01-03', '2025-01-03', 'SarahFitness'),
    ('classic', '2024-11-17', '2025-11-17', 'GinetteLebel');

INSERT INTO product (name, price, stock)
  VALUES
    ('Haltere 2kg', 14.99, 23),
    ('Haltere 1kg', 10.99, 10),
    ('T-shirt gym bleu - S', 12.99, 56),
    ('T-shirt gym bleu - M', 12.99, 42),
    ('T-shirt gym bleu - L', 12.99, 39);

INSERT INTO purchase_order (quantity, created_at, address, user_login, product_id)
  VALUES
    (1, '2025-03-17', '3 rue de la poste 31000 Toulouse', 'pierrot1704', 2),
    (2, '2025-03-29', '19 rue du moulin 31300 Toulouse', 'SarahFitness', 4),
    (1, '2025-04-01', '19 bis avenue de la republique 32000 Auch', 'GinetteLebel', 2);

INSERT INTO club (name, address)
  VALUES
    ('Gym pour tous', '28 rue du dessus 31200 Toulouse'),
    ('BasicSport', '10 avenue du pont 31400 Toulouse'),
    ('NeverQuit', '7 ter impasse des lilas 31000 Toulouse');

INSERT INTO room (type, club_id)
  VALUES
    ('machines', 1),
    ('yoga', 1),
    ('cardio', 1),
    ('machines', 2),
    ('piscine', 2),
    ('machines', 3),
    ('cardio', 3);


INSERT INTO parking (capacity, club_id)
  VALUES
    (20, 1),
    (35, 3);

INSERT INTO course (type, date, start_time, end_time, room_id, coach_login)
  VALUES
    ('cardio fit', '2025-04-10', '15', '16', 3, 'jm1267'),
    ('cardio fit', '2025-04-12', '15', '16', 3, 'jm1267'),
    ('renforcement', '2025-04-20', '15', '16', 1, 'SarahFitness'),
    ('natation', '2025-04-10', '14', '15', 2, 'SarahFitness');

INSERT INTO reservation (status, date, price, card_id, course_id, parking_id)
  VALUES
    ('confirme', '2025-03-10', 5.99, 1, 1, 2),
    ('annule', '2025-03-10', 5.99, 2, 2, 2),
    ('confirme', '2025-04-01', 7.99, 5, 4, NULL);