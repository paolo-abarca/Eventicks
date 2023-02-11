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
 `name`            VARCHAR(50) NOT NULL,
 `last_name`       VARCHAR(50) NOT NULL,
 `email`           VARCHAR(50) NOT NULL,
 `password`        VARCHAR(50) NOT NULL,
 `phone`	   INT NOT NULL,
 `country`         VARCHAR(20) NOT NULL,
 `city`            VARCHAR(50) NOT NULL,
 `gender`          VARCHAR(10) NOT NULL,
 `photo`           VARCHAR(255) NULL,
 `document_type`   VARCHAR(40) NULL,
 `number_document` BIGINT NULL,

PRIMARY KEY (`id`)
);

-- ********************************* `category`
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category`
(
 `id`   INT NOT NULL AUTO_INCREMENT,
 `name` VARCHAR(100) NOT NULL,

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
 `name`        VARCHAR(100) NOT NULL,
 `id_category` INT NOT NULL,
 `description` TEXT NOT NULL,
 `information` TEXT NULL,
 `photo`       VARCHAR(255) NOT NULL,
 `video`       VARCHAR(255) NULL,
 `date_start`  DATE NOT NULL,
 `start_time`  TIME NOT NULL,
 `end_time`    TIME NULL,
 `date_end`    DATE NOT NULL,
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
 `id`         INT NOT NULL AUTO_INCREMENT,
 `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `currency`    VARCHAR(10) NOT NULL,
 `type`       VARCHAR(20) NOT NULL,
 `amount`     INT NOT NULL,
 `price`      DECIMAL(10,2) NOT NULL,
 `id_event`   INT NOT NULL,

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
    IN name    VARCHAR(50),
    IN last_name VARCHAR(50),
    IN email VARCHAR(50),
    IN password VARCHAR(50),
    IN phone INT,
    IN country VARCHAR(20),
    IN city VARCHAR(50),
    IN gender VARCHAR(10)
)
BEGIN
    INSERT INTO user (name,last_name,email,password,phone,country,city,gender)
    VALUES (name,last_name,email,password,phone,country,city,gender);
END $$
DELIMITER ;

-- ********************************* 'PROCEDURE UPDATE NEW USER'

DROP PROCEDURE IF EXISTS sp_update_user;
DELIMITER $$
CREATE PROCEDURE sp_update_user(
    IN p_id INT,
    IN p_name    VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_email VARCHAR(50),
    IN p_password VARCHAR(50),
    IN p_phone INT,
    IN p_country VARCHAR(20),
    IN p_city VARCHAR(50),
    IN p_gender VARCHAR(10),
    IN p_photo VARCHAR(255),
    IN p_document_type VARCHAR(40),
    IN p_number_document BIGINT
)
BEGIN
    UPDATE user
    SET
    name = p_name,
    last_name = p_last_name,
    email = p_email,
    password = p_password,
    phone = p_phone,
    country = p_country,
    city = p_city,
    gender = p_gender,
    photo = p_photo,
    document_type = p_document_type,
    number_document = p_number_document
    WHERE id = p_id;
END $$
DELIMITER ;

-- ********************************* 'DATOS NECESARIOS PARA INICIAR'
INSERT INTO category (`name`) VALUES ('Arte & Cultura'), ('Cine'), ('Comida & Bebidas'), ('Conciertos'), ('Cursos y talleres'), ('Deportes'), ('Donación'), ('Entretenimiento'), ('Festivales'), ('Fiestas'), ('Niños'), ('Salud y bienestar'), ('Seminarios y conferencias'), ('Servicios comunitarios'), ('Stand up'), ('Teatro'), ('Tecnologia'), ('Tiendas'), ('Viajes & Aventuras');
