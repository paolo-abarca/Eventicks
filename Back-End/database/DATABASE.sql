-- ********************************* Create Database
DROP DATABASE IF EXISTS eventicks_db;
CREATE DATABASE IF NOT EXISTS eventicks_db;
USE eventicks_db;

-- ********************************* `user`
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user`
(
 `id`              INT NOT NULL AUTO_INCREMENT,
 `created_at`      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at`      TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `name_user`       VARCHAR(50) NOT NULL,
 `last_name`       VARCHAR(50) NOT NULL,
 `email`           VARCHAR(50) NOT NULL,
 `password`        VARCHAR(255) NOT NULL,
 `phone`	   BIGINT NOT NULL,
 `country`         VARCHAR(20) NOT NULL,
 `city`            VARCHAR(50) NOT NULL,
 `gender`          VARCHAR(10) NOT NULL,
 `photo_user`      VARCHAR(255) NULL,
 `document_type`   VARCHAR(40) NULL,
 `number_document` BIGINT NULL,

PRIMARY KEY (`id`)
);

-- ********************************* `category`
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category`
(
 `id`   INT NOT NULL AUTO_INCREMENT,
 `name_category` VARCHAR(100) NOT NULL,

PRIMARY KEY (`id`)
);

-- ********************************* `event`
DROP TABLE IF EXISTS `event`;
CREATE TABLE IF NOT EXISTS `event`
(
 `id`          INT NOT NULL AUTO_INCREMENT,
 `created_at`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at`  TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `id_user`     INT NOT NULL,
 `name_event`  VARCHAR(100) NOT NULL,
 `id_category` INT NOT NULL,
 `description` TEXT NOT NULL,
 `information` TEXT NULL,
 `photo_event` VARCHAR(255) NOT NULL,
 `video`       VARCHAR(255) NULL,
 `date_start`  DATE NOT NULL,
 `start_time`  TIME NOT NULL,
 `date_end`    DATE NOT NULL,
 `end_time`    TIME NOT NULL,
 `visibility`  VARCHAR(10) NOT NULL,
 `restriction` INT NOT NULL,
 `city`        VARCHAR(50) NOT NULL,
 `address`     VARCHAR(50) NOT NULL,
 `reference`   VARCHAR(255) NULL,

PRIMARY KEY (`id`),
KEY `id_category` (`id_category`),
CONSTRAINT `event_fk1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`),
KEY `id_user` (`id_user`),
CONSTRAINT `event_fk5` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

-- ********************************* `ticket`
DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket`
(
 `id`            INT NOT NULL AUTO_INCREMENT,
 `created_at`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at`    TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `currency`      VARCHAR(10) NOT NULL,
 `type`          VARCHAR(20) NOT NULL,
 `amount_ticket` INT NOT NULL,
 `price`         DECIMAL(10,2) NOT NULL,
 `id_event`      INT NOT NULL,

PRIMARY KEY (`id`),
KEY `id_event` (`id_event`),
CONSTRAINT `ticket_fk2` FOREIGN KEY (`id_event`) REFERENCES `event` (`id`) ON DELETE CASCADE
);

-- ********************************* `user_ticket`
DROP TABLE IF EXISTS `user_ticket`;
CREATE TABLE IF NOT EXISTS `user_ticket`
(
 `id`        INT NOT NULL AUTO_INCREMENT,
 `id_user`   INT NOT NULL,
 `id_ticket` INT NOT NULL,
 `amount`    INT NOT NULL,

PRIMARY KEY (`id`),
KEY `id_user` (`id_user`),
CONSTRAINT `user-ticket_fk3` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE,
KEY `id_ticket` (`id_ticket`),
CONSTRAINT `user-ticket_fk4` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id`) ON DELETE CASCADE
);

-- ********************************* 'PROCEDURES'

-- ********************************* 'PROCEDURE CREATE NEW USER'

DROP PROCEDURE IF EXISTS sp_add_user;
DELIMITER $$
CREATE PROCEDURE sp_add_user(
    IN name_user VARCHAR(50),
    IN last_name VARCHAR(50),
    IN email VARCHAR(50),
    IN password VARCHAR(50),
    IN phone BIGINT,
    IN country VARCHAR(20),
    IN city VARCHAR(50),
    IN gender VARCHAR(10)
)
BEGIN
    INSERT INTO user (name_user,last_name,email,password,phone,country,city,gender)
    VALUES (name_user,last_name,email,password,phone,country,city,gender);
END $$
DELIMITER ;

-- ********************************* 'PROCEDURE UPDATE USER'

DROP PROCEDURE IF EXISTS sp_update_user;
DELIMITER $$
CREATE PROCEDURE sp_update_user(
    IN p_id INT,
    IN p_name_user VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_email VARCHAR(50),
    IN p_phone BIGINT,
    IN p_country VARCHAR(20),
    IN p_city VARCHAR(50),
    IN p_gender VARCHAR(10),
    IN p_photo_user VARCHAR(255),
    IN p_document_type VARCHAR(40),
    IN p_number_document BIGINT
)
BEGIN
    UPDATE user
    SET
    name_user = p_name_user,
    last_name = p_last_name,
    email = p_email,
    phone = p_phone,
    country = p_country,
    city = p_city,
    gender = p_gender,
    photo_user = p_photo_user,
    document_type = p_document_type,
    number_document = p_number_document
    WHERE id = p_id;
END $$
DELIMITER ;

-- ********************************* 'PROCEDURE CREATE NEW EVENT'

DROP PROCEDURE IF EXISTS sp_add_event;
DELIMITER $$
CREATE PROCEDURE sp_add_event(
    IN id_user INT,
    IN name_event VARCHAR(100),
    IN id_category INT,
    IN description TEXT,
    IN information TEXT,
    IN photo_event VARCHAR(255),
    IN video VARCHAR(255),
    IN date_start DATE,
    IN start_time TIME,
    IN date_end DATE,
    IN end_time TIME,
    IN visibility VARCHAR(10),
    IN restriction INT,
    IN city VARCHAR(50),
    IN address VARCHAR(50),
    IN reference VARCHAR(255)
)
BEGIN
        INSERT INTO event (id_user,name_event,id_category,description,information,photo_event,video,date_start,start_time,date_end,end_time,visibility,restriction,city,address,reference)
    VALUES (id_user,name_event,id_category,description,information,photo_event,video,date_start,start_time,date_end,end_time,visibility,restriction,city,address,reference);

    SELECT LAST_INSERT_ID();
END $$
DELIMITER ;

-- ********************************* 'PROCEDURE UPDATE EVENT'

DROP PROCEDURE IF EXISTS sp_update_event;
DELIMITER $$
CREATE PROCEDURE sp_update_event(
    IN p_id INT,
    IN p_name_event VARCHAR(50),
    IN p_id_category INT,
    IN p_description TEXT,
    IN p_information TEXT,
    IN p_photo_event VARCHAR(255),
    IN p_video VARCHAR(255),
    IN p_date_start DATE,
    IN p_start_time TIME,
    IN p_date_end DATE,
    IN p_end_time TIME,
    IN p_visibility VARCHAR(10),
    IN p_restriction INT,
    IN p_city VARCHAR(50),
    IN p_address VARCHAR(50),
    IN p_reference VARCHAR(255)
)
BEGIN
    UPDATE event
    SET
    name_event = p_name_event,
    id_category = p_id_category,
    description = p_description,
    information = p_information,
    photo_event = p_photo_event,
    video = p_video,
    date_start = p_date_start,
    start_time = p_start_time,
    date_end = p_date_end,
    end_time = p_end_time,
    visibility = p_visibility,
    restriction = p_restriction,
    city = p_city,
    address = p_address,
    reference = p_reference
    WHERE id = p_id;
END $$
DELIMITER ;

-- ********************************* 'PROCEDURE UPDATE PASSWORD'

DROP PROCEDURE IF EXISTS sp_update_password;
DELIMITER $$
CREATE PROCEDURE sp_update_password(
    IN p_id INT,
    IN p_password VARCHAR(255)
)
BEGIN
    UPDATE user
    SET
    password = p_password
    WHERE id = p_id;
END $$
DELIMITER ;

-- ********************************* 'PROCEDURE CREATE NEW TICKET'

DROP PROCEDURE IF EXISTS sp_add_ticket;
DELIMITER $$
CREATE PROCEDURE sp_add_ticket(
    IN currency VARCHAR(10),
    IN type VARCHAR(20),
    IN amount_ticket INT,
    IN price DECIMAL(10,2),
    IN id_event INT
)
BEGIN
    INSERT INTO ticket (currency,type,amount_ticket,price,id_event)
    VALUES (currency,type,amount_ticket,price,id_event);
END $$
DELIMITER ;

-- ********************************* 'PROCEDURE UPDATE TICKET'

DROP PROCEDURE IF EXISTS sp_update_ticket;
DELIMITER $$
CREATE PROCEDURE sp_update_ticket(
    IN p_id INT,
    IN p_currency VARCHAR(10),
    IN p_type VARCHAR(20),
    IN p_amount_ticket INT,
    IN p_price DECIMAL(10,2)
)
BEGIN
    UPDATE ticket
    SET
    currency = p_currency,
    type = p_type,
    amount_ticket = p_amount_ticket,
    price = p_price
    WHERE id = p_id;
END $$
DELIMITER ;

-- ********************************* 'PROCEDURE CREATE NEW USER_TICKET'

DROP PROCEDURE IF EXISTS sp_add_user_ticket;
DELIMITER $$
CREATE PROCEDURE sp_add_user_ticket(
    IN id_user INT,
    IN id_ticket INT,
    IN amount INT
)
BEGIN
    INSERT INTO user_ticket (id_user,id_ticket,amount)
    VALUES (id_user,id_ticket,amount);
    UPDATE ticket
    SET amount_ticket = amount_ticket - amount
    WHERE id = id_ticket;
END $$
DELIMITER ;

-- ********************************* 'DATOS NECESARIOS PARA INICIAR'
INSERT INTO category (`name_category`) VALUES ('Viajes & Aventuras'), ('Tiendas'), ('Tecnología'), ('Teatro'), ('Stand Up'), ('Servicios Comunitarios'), ('Seminarios y Conferencias'), ('Salud y Bienestar'), ('Niños'), ('Fiestas'), ('Festivales'), ('Entretenimiento'), ('Donación'), ('Deportes'), ('Cursos y Talleres'), ('Conciertos'), ('Comida & Bebidas'), ('Cine'), ('Arte & Cultura');
