INSERT INTO Roles(id, name, description) VALUES (1, 'ROLE_USER', 'default user access');
INSERT INTO Roles(id, name, description) VALUES (2, 'ROLE_ADMIN', 'admin access');
INSERT INTO Roles(id, name, description) VALUES (3, 'ROLE_MANAGER', 'place manager access');
INSERT INTO Roles(id, name, description) VALUES (4, 'ROLE_OWNER', 'place owner access');

INSERT INTO Ban_Status(id, name, description) VALUES (1, 'NOT_BAN', 'user not banned');
INSERT INTO Ban_Status(id, name, description) VALUES (2, 'BAN', 'user was banned');

INSERT INTO users_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO users_roles (user_id, role_id) VALUES (2, 1);
INSERT INTO users_roles (user_id, role_id) VALUES (2, 2);
INSERT INTO users_roles (user_id, role_id) VALUES (3, 1);
INSERT INTO users_roles (user_id, role_id) VALUES (3, 3);
INSERT INTO users_roles (user_id, role_id) VALUES (3, 4);
INSERT INTO users_roles (user_id, role_id) VALUES (4, 3);
INSERT INTO users_roles (user_id, role_id) VALUES (4, 1);

INSERT INTO Users (id, f_name, l_name, phone, email, nick_name, password, status, registration_date, last_update_date)
VALUES (1, 'Vasya', 'Pupkin', '0935588774', 'vpupkin@gmail.com', 'vpupkin', '12345', 1, '12.08.2018 12:00:01', '07.09.2018 : 10:10:10');

INSERT INTO Users (id, f_name, l_name, phone, email, nick_name, password, status, registration_date, last_update_date)
VALUES (2, 'John', 'Conor', '88003553555', 'admin@gmail.com', 'admin', 'qwerty', 1, '12.06.2018 12:00:01', '02.09.2018 : 10:10:10');

INSERT INTO Users (id, f_name, l_name, phone, email, nick_name, password, status, registration_date, last_update_date)
VALUES (3, 'Sara', 'Conor', '88004557564', 'saraloveterminator@gmail.com', 'saraConor', 'skynetsuck', 1, '12.08.2012 12:00:01', '01.06.2018 : 10:10:10');

INSERT INTO Users (id, f_name, l_name, phone, email, nick_name, password, status, registration_date, last_update_date)
VALUES (4, 'Arnold', 'Shwartzneger', '1111111111', 'terminator@gmail.com', 'T1000', 'saveworld', 2, '12.08.2018 12:00:01', '07.09.2018 : 10:10:10');

