-- Adminer 4.2.2 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `munk`;
CREATE TABLE `munk` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_bin NOT NULL,
  `description` varchar(200) COLLATE utf8_bin NOT NULL,
  `price` float unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `munk` (`id`, `title`, `description`, `price`) VALUES
(1,	'Banan Munk',	'Otroligt god munk mjuk som få och gul till färgen',	45),
(2,	'Chocklad Munk',	'En gammal klassiker slå alldrig fel',	40),
(3,	'Bacon Munk',	'Ganska äcklig om jag ska vara ärlig, men kul!',	55);

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_bin NOT NULL,
  `description` varchar(200) COLLATE utf8_bin NOT NULL,
  `content` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `news` (`id`, `title`, `description`, `content`) VALUES
(1,	'Ny munk! Bacon-smak',	'En ny Spexig munk landar i vårt sortiment',	'\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et pulvinar ante, sit amet volutpat est. Mauris neque nulla, mattis sit amet mollis ut, dignissim non lectus. Proin vehicula tellus nisi, ac ullamcorper metus ullamcorper in. Ut iaculis et nunc id pretium. Ut aliquet ac orci a volutpat. Cras nulla nunc, tristique pharetra lacus et, aliquam vestibulum ex. Ut id gravida mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi quis interdum metus.\r\n\r\nAenean non turpis eu odio lobortis porta sed a turpis. Curabitur id dui luctus, semper dui nec, accumsan quam. Integer tristique arcu ac tellus consequat facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi at felis a massa blandit rhoncus. Sed eu rutrum leo, quis aliquam nibh. Maecenas vehicula, sem sed fermentum sollicitudin, dui tortor interdum ante, at iaculis leo augue sed est. Mauris id ullamcorper massa. Vestibulum viverra faucibus nisi. In eget finibus nisi, nec laoreet lorem. Cras blandit diam est, non eleifend arcu venenatis vitae. Aliquam congue, eros sed dapibus tempor, massa ipsum egestas urna, vel malesuada ante dolor vel ipsum. Morbi ac urna tempus, sodales lectus ac, suscipit nisl. Maecenas convallis, augue sit amet feugiat vehicula, diam ipsum condimentum sapien, non tempor ipsum quam vel tortor.\r\n\r\nCras eget augue convallis, congue mauris non, facilisis nisi. Curabitur sagittis eu magna imperdiet condimentum. Nunc tincidunt eros sit amet nisl faucibus, at viverra dolor pellentesque. Vestibulum sagittis, nulla sed finibus porttitor, velit magna posuere nunc, a pellentesque erat enim ac turpis. Suspendisse potenti. Vestibulum pulvinar tortor at mauris porta, et sollicitudin nibh faucibus. Phasellus hendrerit bibendum enim.\r\n\r\nFusce at nisl nisl. Maecenas volutpat nisl eget odio lacinia luctus. Cras tortor erat, convallis nec sodales vitae, sagittis quis leo. Pellentesque venenatis ipsum leo, non pulvinar nisi vulputate in. Mauris mollis a ex id pellentesque. Duis dictum ultricies erat, ut maximus massa sagittis non. Curabitur interdum odio mollis volutpat maximus. Proin sagittis aliquam tellus eget venenatis.\r\n\r\nAenean eget interdum ipsum. Pellentesque commodo felis odio, vel euismod quam viverra id. Sed pharetra dui id augue condimentum vestibulum. Suspendisse tristique velit magna, tempor dapibus mauris convallis nec. Fusce semper molestie pellentesque. Sed consequat pretium porttitor. Nulla finibus mattis eros vitae semper. Proin aliquet diam sed lacus vulputate, non molestie urna varius. Morbi libero nulla, aliquam in vulputate eu, ultricies ac sem. Aenean odio diam, ultrices at velit ac, tempus auctor mauris. Aenean sed est orci. Sed mi lacus, gravida fermentum faucibus eget, condimentum eget lacus.\r\n');

DROP TABLE IF EXISTS `section`;
CREATE TABLE `section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_bin NOT NULL,
  `primaryContent` varchar(50) COLLATE utf8_bin NOT NULL,
  `associatedSingle` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `associatedSingle` (`associatedSingle`),
  CONSTRAINT `section_ibfk_1` FOREIGN KEY (`associatedSingle`) REFERENCES `single` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `section` (`id`, `title`, `primaryContent`, `associatedSingle`) VALUES
(1,	'Våra Munkar',	'munk',	NULL),
(2,	'Om Oss',	'single',	1),
(3,	'Nyheter',	'news',	NULL);

DROP TABLE IF EXISTS `single`;
CREATE TABLE `single` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_bin NOT NULL,
  `description` varchar(200) COLLATE utf8_bin NOT NULL,
  `content` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `single` (`id`, `title`, `description`, `content`) VALUES
(1,	'Om Oss',	'Lite Kort och gott om oss',	'\r\n\r\nVestibulum egestas lacus a rutrum eleifend. Phasellus pellentesque vehicula nibh eget hendrerit. Praesent hendrerit imperdiet ex nec dapibus. Fusce sed congue turpis, iaculis sodales ligula. Maecenas ut maximus nunc. Ut ac sagittis nibh. Sed faucibus purus id tincidunt auctor. Integer vitae mattis nisl.\r\n\r\nMauris metus nibh, congue quis fringilla at, pretium et nisl. Nunc a ornare urna. Proin vel nisl lectus. Nam odio tortor, varius vitae porta rhoncus, bibendum id eros. Phasellus ac faucibus tellus. Ut ut rutrum mi, id elementum elit. Aenean ultrices volutpat fringilla. ');

-- 2016-04-12 13:09:30
