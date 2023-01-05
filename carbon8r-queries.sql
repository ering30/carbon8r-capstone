use carbon8r;

create table users(
  user_id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL, 
  user_password VARCHAR(20) NOT NULL,
  username VARCHAR(20) NOT NULL,
  userAdmin INT NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id)
);

INSERT INTO users (email, user_password, username, userAdmin)
VALUES ('admin@gmail.com', '1234', 'admin', 1);

create table journeys(
  journey_id INT AUTO_INCREMENT, 
  nickname VARCHAR(50) DEFAULT 'My Trip',
  user_id INT NOT NULL, 
  origin VARCHAR(50),
  origin_name VARCHAR(200), 
  destination VARCHAR(50),
  destination_name VARCHAR(200),
  g_CO2 INT NOT NULL, 
  tot_distance INT, 
  vehicle_type VARCHAR(20) NOT NULL, 
  PRIMARY KEY (journey_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

SELECT * FROM users;
SELECT * FROM journeys;
