
CREATE TABLE `Images` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`description` VARCHAR(300) NOT NULL,
	`image` VARCHAR(300) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY(id)
)
COLLATE='latin1_swedish_ci'
;