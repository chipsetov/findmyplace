INSERT INTO Ban_Status (id, name, description) VALUES (1, 'NOT_BAN', 'user not banned');
INSERT INTO Ban_Status (id, name, description) VALUES (2, 'BAN', 'user was banned');

-- user
INSERT INTO Users ( f_name, l_name, phone, email, nick_name, role, password, status, registration_date, last_update_date)
VALUES ( 'Vasya', 'Pupkin', '0935588774', 'user@gmail.com', 'user', 'ROLE_USER'
        '$2a$10$DramkVeQZgQBpPf9KyE5Au5jWF.iRJD3wbRmCPDgw5nAviWMMpg2y', 1, '12.08.2018 12:00:01',
        '07.09.2018 : 10:10:10');
--admin
INSERT INTO Users ( f_name, l_name, phone, email, nick_name, ,role, password, status, registration_date, last_update_date)
VALUES ( 'John', 'Conor', '88003553555', 'admin@gmail.com', 'admin','ROLE_ADMIN'
        '$2a$10$LxTMU51ynTUJpDyUZdfShuuOXVJJFiwnOmAmnQ3UXR4V68YN0Q2QS', 1, '12.06.2018 12:00:01',
        '02.09.2018 : 10:10:10');
--owner
INSERT INTO Users ( f_name, l_name, phone, email, nick_name, ,role, password, status, registration_date, last_update_date)
VALUES ( 'Sara', 'Conor', '88004557564', 'owner@gmail.com', 'owner','ROLE_OWNER'
        '$2a$10$iv9c8suPgZ71dQAw25i3/eA639RTtHVX59fThBNfYybvhWnSMdl9a', 1,
        '12.08.2012 12:00:01', '01.06.2018 : 10:10:10');
--manager
INSERT INTO Users ( f_name, l_name, phone, email, nick_name, ,role, password, status, registration_date, last_update_date)
VALUES ( 'Arnold', 'Shwartzneger', '1111', 'manager@gmail.com', 'manager','ROLE_MANAGER'
        '$2a$10$2J8YaN9kMcpwvaMtE7qJTOnYwusXKwk8HVao3GlsTRRt4NSdkJRKq', 1,
        '12.08.2018 12:00:01','07.09.2018 : 10:10:10');

INSERT INTO Places (id, name, address, description, count_free_places, open, close, place_type, owner_id, latitude, longitude)
    VALUES (1, 'Челентано', 'Rivne 1', 'best pizza', 5, '09:00:00', '23:00:00', 'CAFE', 4, 50.6220633, 26.2489738);

INSERT INTO Places (id, name, address, description, count_free_places, open, close, place_type, owner_id, latitude, longitude)
    VALUES (2, 'Манхетен', 'Rivne 2', 'best hotel', 10, '00:00:01', '23:59:00', 'HOTEL', 4, 50.6203452, 26.2486262);

INSERT INTO Places (id, name, address, description, count_free_places, open, close, place_type, owner_id, latitude, longitude)
    VALUES (3, 'Стоянка МИР', 'Rivne 3', 'best parking', 6, '09:00:00', '23:00:00', 'PARKING', 4, 50.6203138, 26.2503237);

INSERT INTO Places (id, name, address, description, count_free_places, open, close, place_type, owner_id, latitude, longitude)
    VALUES (4, 'МакДональдз', 'Rivne 4', 'best restaurant', 15, '09:00:00', '23:00:00', 'RESTAURANT', 4, 50.6189508, 26.2488015);

INSERT INTO Feedbacks (id, user_id, place_id, comment, mark)
    VALUES (1, 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' ||
     'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation' ||
      ' ullamco laboris nisi ut aliquip ex ea commodo consequat.', 10);

INSERT INTO Feedbacks (id, user_id, place_id, comment, mark)
    VALUES (2, 2, 1, 'Very bad place', 2);

INSERT INTO Feedbacks (id, user_id, place_id, comment, mark)
    VALUES (3, 3, 2, 'Nice place', 9);

INSERT INTO Feedbacks (id, user_id, place_id, comment, mark)
    VALUES (4, 4, 3, 'I like it', 8);

    INSERT INTO Feedbacks (id, user_id, place_id, comment, mark)
    VALUES (1, 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' ||
     'incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation' ||
      ' ullamco laboris nisi ut aliquip ex ea commodo consequat.', 10);

INSERT INTO Feedbacks (id, user_id, place_id, comment, mark)
    VALUES (2, 2, 1, 'Very bad place', 2);

INSERT INTO Feedbacks (id, user_id, place_id, comment, mark)
    VALUES (3, 3, 2, 'Nice place', 9);

INSERT INTO Feedbacks (id, user_id, place_id, comment, mark)
    VALUES (4, 4, 3, 'I like it', 8);


