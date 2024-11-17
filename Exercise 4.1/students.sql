CREATE TABLE `courses` (
    `id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(30) NOT NULL,
	`join_year` INT NOT NULL,
	`major_id` INT NOT NULL,
	`personal_num` INT NOT NULL,
	`phone` VARCHAR(20) NOT NULL,
	`address` VARCHAR(50) NOT NULL,
	`cumulative_credit` INT NOT NULL DEFAULT 0,
	`average_rating` DOUBLE NOT NULL DEFAULT 0.0,
	`is_active` TINYINT(1) DEFAULT 1,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;