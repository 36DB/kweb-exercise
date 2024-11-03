CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`userid` VARCHAR(20) NOT NULL,
	`userpw` VARCHAR(20) NOT NULL,
	`nickname` VARCHAR(20) NOT NULL,
	`pfplink` VARCHAR(50) NOT NULL,
	`profile_message` VARCHAR(50) NOT NULL,
	`is_resigned` TINYINT(1) DEFAULT 0,
	`join_date` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `channels` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(20) NOT NULL,
	`creator` INT NOT NULL,
	`link` VARCHAR(50) NOT NULL,
	`maximum_capacity` INT NOT NULL,
	`is_resigned` TINYINT(1) DEFAULT 0,
	`create_date` TIMESTAMP NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`creator`)
	REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `chats` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`chat_content` VARCHAR(100) NOT NULL,
	`chat_sender` INT NOT NULL,
	`channel` INT NOT NULL,
	`create_date` TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
	FOREIGN KEY(`chat_sender`)
	REFERENCES `users`(`id`) ON DELETE CASCADE,
	FOREIGN KEY(`channel`)
	REFERENCES `channels`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `follows` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`follower` INT NOT NULL,
	`followee` INT NOT NULL,
	`follow_date` TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`follower`)
	REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`followee`)
	REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `blocks` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`blocker` INT NOT NULL,
	`blocked` INT NOT NULL,
	`block_date` TIMESTAMP NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`blocker`)
	REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`blocked`)
	REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;