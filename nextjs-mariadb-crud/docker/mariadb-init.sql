-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: vyxtest
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `CompanyName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measurement`
--

DROP TABLE IF EXISTS `measurement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measurement` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `MeasurementType` enum('Shirt','Trouser') NOT NULL,
  `Unit` enum('Cm','Inch') NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measurement`
--

LOCK TABLES `measurement` WRITE;
/*!40000 ALTER TABLE `measurement` DISABLE KEYS */;
/*!40000 ALTER TABLE `measurement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measurementimage`
--

DROP TABLE IF EXISTS `measurementimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measurementimage` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `S3Url` varchar(500) DEFAULT NULL,
  `MeasurementId` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measurementimage`
--

LOCK TABLES `measurementimage` WRITE;
/*!40000 ALTER TABLE `measurementimage` DISABLE KEYS */;
/*!40000 ALTER TABLE `measurementimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetail` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `OrderId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `Price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `Quantity` tinyint(4) NOT NULL DEFAULT 1,
  `SuitType` enum('2piece','3piece') DEFAULT NULL,
  `TrouserId` int(11) DEFAULT NULL,
  `TailoredFit` enum('SlimFit','ComfortFit') DEFAULT NULL,
  `FabricId` int(11) DEFAULT NULL,
  `LiningId` int(11) DEFAULT NULL,
  `ButtonId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `OrderId` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerId` int(11) NOT NULL,
  `MeasurementId` int(11) NOT NULL,
  `SalesOrderNumber` varchar(50) NOT NULL,
  `Sequence` tinyint(4) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT current_timestamp(),
  `Note` text DEFAULT NULL,
  `TotalAmount` decimal(10,6) NOT NULL DEFAULT 0.000000,
  `Country` varchar(100) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `State` varchar(100) DEFAULT NULL,
  `ZipCode` varchar(20) DEFAULT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `ShippingMethod` enum('Standard','Express') NOT NULL,
  `DifferentAddress` tinyint(1) DEFAULT 0,
  `PaymentStatus` enum('failed','success','none') NOT NULL,
  `StripeId` varchar(1000) DEFAULT NULL,
  `Lang` varchar(10) DEFAULT NULL,
  `CurrencyCode` varchar(10) DEFAULT NULL,
  `CurrencyRate` decimal(10,6) DEFAULT 1.000000,
  PRIMARY KEY (`OrderId`),
  UNIQUE KEY `SalesOrderNumber` (`SalesOrderNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `S3Url` varchar(500) DEFAULT NULL,
  `ProductType` enum('DesignOfSuit','Jacket','Trouser','Shirt','TailoredFit','FabricOptions','Button','Lining','SuitType','TrouserType') NOT NULL,
  `Code` varchar(100) DEFAULT NULL,
  `Price` decimal(10,6) NOT NULL DEFAULT 0.000000,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Code` (`Code`)
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'TheAristocrat','Effortlessly blending heritage and modernity.','DesignOfSuit_TheLuminary_002.JPG','DesignOfSuit','DesignOfSuit_TheAristocrat_001.JPG',200.000000),(2,'TheAristocrat','Effortlessly blending heritage and modernity.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheAristocrat/DesignOfSuit_TheAristocrat_002.JPG','DesignOfSuit','DesignOfSuit_TheAristocrat_002.JPG',201.000000),(3,'TheAristocrat','Effortlessly blending heritage and modernity.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheAristocrat/DesignOfSuit_TheAristocrat_003.JPG','DesignOfSuit','DesignOfSuit_TheAristocrat_003.JPG',202.000000),(4,'TheAristocrat','Effortlessly blending heritage and modernity.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheAristocrat/DesignOfSuit_TheAristocrat_004.JPG','DesignOfSuit','DesignOfSuit_TheAristocrat_004.JPG',203.000000),(5,'TheAristocrat','Effortlessly blending heritage and modernity.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheAristocrat/DesignOfSuit_TheAristocrat_005.JPG','DesignOfSuit','DesignOfSuit_TheAristocrat_005.JPG',204.000000),(6,'TheAristocrat','Effortlessly blending heritage and modernity.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheAristocrat/DesignOfSuit_TheAristocrat_006.JPG','DesignOfSuit','DesignOfSuit_TheAristocrat_006.JPG',205.000000),(7,'TheClassicVirtuoso','Timeless elegance with a contemporary twist','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheClassicVirtuoso/DesignOfSuit_TheClassicVirtuoso_001.JPG','DesignOfSuit','DesignOfSuit_TheClassicVirtuoso_001.JPG',206.000000),(8,'TheClassicVirtuoso','Timeless elegance with a contemporary twist','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheClassicVirtuoso/DesignOfSuit_TheClassicVirtuoso_002.JPG','DesignOfSuit','DesignOfSuit_TheClassicVirtuoso_002.JPG',207.000000),(9,'TheClassicVirtuoso','Timeless elegance with a contemporary twist','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheClassicVirtuoso/DesignOfSuit_TheClassicVirtuoso_003.JPG','DesignOfSuit','DesignOfSuit_TheClassicVirtuoso_003.JPG',208.000000),(10,'TheClassicVirtuoso','Timeless elegance with a contemporary twist','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheClassicVirtuoso/DesignOfSuit_TheClassicVirtuoso_004.JPG','DesignOfSuit','DesignOfSuit_TheClassicVirtuoso_004.JPG',209.000000),(11,'TheClassicVirtuoso','Timeless elegance with a contemporary twist','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheClassicVirtuoso/DesignOfSuit_TheClassicVirtuoso_005.JPG','DesignOfSuit','DesignOfSuit_TheClassicVirtuoso_005.JPG',210.000000),(12,'TheClassicVirtuoso','Timeless elegance with a contemporary twist','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheClassicVirtuoso/DesignOfSuit_TheClassicVirtuoso_006.JPG','DesignOfSuit','DesignOfSuit_TheClassicVirtuoso_006.JPG',211.000000),(13,'TheClassicVirtuoso','Timeless elegance with a contemporary twist','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheClassicVirtuoso/DesignOfSuit_TheClassicVirtuoso_007.JPG','DesignOfSuit','DesignOfSuit_TheClassicVirtuoso_007.JPG',212.000000),(14,'TheCosmopolitan','Refined simplicity for global professionals.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheCosmopolitan/DesignOfSuit_TheCosmopolitan_001.JPG','DesignOfSuit','DesignOfSuit_TheCosmopolitan_001.JPG',213.000000),(15,'TheCosmopolitan','Refined simplicity for global professionals.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheCosmopolitan/DesignOfSuit_TheCosmopolitan_002.JPG','DesignOfSuit','DesignOfSuit_TheCosmopolitan_002.JPG',214.000000),(16,'TheCosmopolitan','Refined simplicity for global professionals.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheCosmopolitan/DesignOfSuit_TheCosmopolitan_003.JPG','DesignOfSuit','DesignOfSuit_TheCosmopolitan_003.JPG',215.000000),(17,'TheCosmopolitan','Refined simplicity for global professionals.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheCosmopolitan/DesignOfSuit_TheCosmopolitan_004.JPG','DesignOfSuit','DesignOfSuit_TheCosmopolitan_004.JPG',216.000000),(18,'TheCosmopolitan','Refined simplicity for global professionals.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheCosmopolitan/DesignOfSuit_TheCosmopolitan_005.JPG','DesignOfSuit','DesignOfSuit_TheCosmopolitan_005.JPG',217.000000),(19,'TheCosmopolitan','Refined simplicity for global professionals.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheCosmopolitan/DesignOfSuit_TheCosmopolitan_006.JPG','DesignOfSuit','DesignOfSuit_TheCosmopolitan_006.JPG',218.000000),(20,'TheCosmopolitan','Refined simplicity for global professionals.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheCosmopolitan/DesignOfSuit_TheCosmopolitan_007.JPG','DesignOfSuit','DesignOfSuit_TheCosmopolitan_007.JPG',219.000000),(21,'TheCosmopolitan','Refined simplicity for global professionals.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheCosmopolitan/DesignOfSuit_TheCosmopolitan_008.JPG','DesignOfSuit','DesignOfSuit_TheCosmopolitan_008.JPG',220.000000),(22,'TheLuminary','Radiating confidence and distinction for trailblazers.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheLuminary/DesignOfSuit_TheLuminary_001.JPG','DesignOfSuit','DesignOfSuit_TheLuminary_001.JPG',221.000000),(23,'TheLuminary','Radiating confidence and distinction for trailblazers.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheLuminary/DesignOfSuit_TheLuminary_002.JPG','DesignOfSuit','DesignOfSuit_TheLuminary_002.JPG',222.000000),(24,'TheLuminary','Radiating confidence and distinction for trailblazers.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheLuminary/DesignOfSuit_TheLuminary_003.JPG','DesignOfSuit','DesignOfSuit_TheLuminary_003.JPG',223.000000),(25,'TheLuminary','Radiating confidence and distinction for trailblazers.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheLuminary/DesignOfSuit_TheLuminary_004.JPG','DesignOfSuit','DesignOfSuit_TheLuminary_004.JPG',224.000000),(26,'TheLuminary','Radiating confidence and distinction for trailblazers.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheLuminary/DesignOfSuit_TheLuminary_005.JPG','DesignOfSuit','DesignOfSuit_TheLuminary_005.JPG',225.000000),(27,'TheLuminary','Radiating confidence and distinction for trailblazers.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheLuminary/DesignOfSuit_TheLuminary_006.JPG','DesignOfSuit','DesignOfSuit_TheLuminary_006.JPG',226.000000),(28,'TheMaverick','Unique cuts and textures for the daring individual.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheMaverick/DesignOfSuit_TheMaverick_001.JPG','DesignOfSuit','DesignOfSuit_TheMaverick_001.JPG',227.000000),(29,'TheMaverick','Unique cuts and textures for the daring individual.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheMaverick/DesignOfSuit_TheMaverick_002.JPG','DesignOfSuit','DesignOfSuit_TheMaverick_002.JPG',228.000000),(30,'TheMaverick','Unique cuts and textures for the daring individual.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheMaverick/DesignOfSuit_TheMaverick_003.JPG','DesignOfSuit','DesignOfSuit_TheMaverick_003.JPG',229.000000),(31,'TheMaverick','Unique cuts and textures for the daring individual.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheMaverick/DesignOfSuit_TheMaverick_004.JPG','DesignOfSuit','DesignOfSuit_TheMaverick_004.JPG',230.000000),(32,'TheMaverick','Unique cuts and textures for the daring individual.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheMaverick/DesignOfSuit_TheMaverick_005.JPG','DesignOfSuit','DesignOfSuit_TheMaverick_005.JPG',231.000000),(33,'TheMaverick','Unique cuts and textures for the daring individual.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheMaverick/DesignOfSuit_TheMaverick_006.JPG','DesignOfSuit','DesignOfSuit_TheMaverick_006.JPG',232.000000),(34,'TheNobleSovereign','Sophistication tailored for formal excellence.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheNobleSovereign/DesignOfSuit_TheNobleSovereign_001.JPG','DesignOfSuit','DesignOfSuit_TheNobleSovereign_001.JPG',233.000000),(35,'TheNobleSovereign','Sophistication tailored for formal excellence.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheNobleSovereign/DesignOfSuit_TheNobleSovereign_002.JPG','DesignOfSuit','DesignOfSuit_TheNobleSovereign_002.JPG',234.000000),(36,'TheNobleSovereign','Sophistication tailored for formal excellence.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheNobleSovereign/DesignOfSuit_TheNobleSovereign_003.JPG','DesignOfSuit','DesignOfSuit_TheNobleSovereign_003.JPG',235.000000),(37,'TheNobleSovereign','Sophistication tailored for formal excellence.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheNobleSovereign/DesignOfSuit_TheNobleSovereign_004.JPG','DesignOfSuit','DesignOfSuit_TheNobleSovereign_004.JPG',236.000000),(38,'TheNobleSovereign','Sophistication tailored for formal excellence.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheNobleSovereign/DesignOfSuit_TheNobleSovereign_005.JPG','DesignOfSuit','DesignOfSuit_TheNobleSovereign_005.JPG',237.000000),(39,'TheNobleSovereign','Sophistication tailored for formal excellence.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheNobleSovereign/DesignOfSuit_TheNobleSovereign_006.JPG','DesignOfSuit','DesignOfSuit_TheNobleSovereign_006.JPG',238.000000),(40,'TheVanguard','Bold, modern, and sharp for industry leaders.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheVanguard/DesignOfSuit_TheVanguard_001.JPG','DesignOfSuit','DesignOfSuit_TheVanguard_001.JPG',239.000000),(41,'TheVanguard','Bold, modern, and sharp for industry leaders.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheVanguard/DesignOfSuit_TheVanguard_002.JPG','DesignOfSuit','DesignOfSuit_TheVanguard_002.JPG',240.000000),(42,'TheVanguard','Bold, modern, and sharp for industry leaders.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheVanguard/DesignOfSuit_TheVanguard_003.JPG','DesignOfSuit','DesignOfSuit_TheVanguard_003.JPG',241.000000),(43,'TheVanguard','Bold, modern, and sharp for industry leaders.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheVanguard/DesignOfSuit_TheVanguard_004.JPG','DesignOfSuit','DesignOfSuit_TheVanguard_004.JPG',242.000000),(44,'TheVanguard','Bold, modern, and sharp for industry leaders.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheVanguard/DesignOfSuit_TheVanguard_005.JPG','DesignOfSuit','DesignOfSuit_TheVanguard_005.JPG',243.000000),(45,'TheVanguard','Bold, modern, and sharp for industry leaders.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheVanguard/DesignOfSuit_TheVanguard_006.JPG','DesignOfSuit','DesignOfSuit_TheVanguard_006.JPG',244.000000),(46,'TheVanguard','Bold, modern, and sharp for industry leaders.','https://d1wuhi05elo03b.cloudfront.net/DesignOfSuit/TheVanguard/DesignOfSuit_TheVanguard_007.JPG','DesignOfSuit','DesignOfSuit_TheVanguard_007.JPG',245.000000),(47,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_001.png','FabricOptions','D725',252.000000),(48,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_002.png','FabricOptions','K725',253.000000),(49,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_003.png','FabricOptions','C725',254.000000),(50,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_004.png','FabricOptions','B509',255.000000),(51,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_005.png','FabricOptions','C509',256.000000),(52,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_006.png','FabricOptions','A509',257.000000),(53,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_007.png','FabricOptions','B476',258.000000),(54,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_008.png','FabricOptions','C476',259.000000),(55,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_009.png','FabricOptions','D502',260.000000),(56,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_010.png','FabricOptions','A502',261.000000),(57,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_011.png','FabricOptions','B502',262.000000),(58,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_012.png','FabricOptions','A476',263.000000),(59,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_013.png','FabricOptions','FBW8',264.000000),(60,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_014.png','FabricOptions','FWB1',265.000000),(61,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_015.png','FabricOptions','FWB3',266.000000),(62,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_016.png','FabricOptions','FWB5',267.000000),(63,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_017.png','FabricOptions','FWB6',268.000000),(64,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_018.png','FabricOptions','FWB7',269.000000),(65,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_019.png','FabricOptions','FWB9',270.000000),(66,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_020.png','FabricOptions','FWB10',271.000000),(67,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_021.png','FabricOptions','FWB11',272.000000),(68,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_022.png','FabricOptions','FWB12',273.000000),(69,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_023.png','FabricOptions','FWB13',274.000000),(70,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_024.png','FabricOptions','FWB312',275.000000),(71,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_025.png','FabricOptions','FWB320',276.000000),(72,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_026.png','FabricOptions','FWB321',277.000000),(73,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_027.png','FabricOptions','FWB322',278.000000),(74,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_028.png','FabricOptions','K728',279.000000),(75,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_029.png','FabricOptions','A728',280.000000),(76,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_030.png','FabricOptions','D728',281.000000),(77,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_031.png','FabricOptions','C728',282.000000),(78,'CashmereBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/CashmereBlend/FabricOptions_CashmereBlend_032.png','FabricOptions','B728',283.000000),(79,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_001.jpg','FabricOptions','BEDA_M102_200GSM',284.000000),(80,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_002.jpg','FabricOptions','BEDA_M106_200GSM',285.000000),(81,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_003.jpg','FabricOptions','BEDO_M100_200GSM',286.000000),(82,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_004.jpg','FabricOptions','BEHONGNHAT_M103_200GSM',287.000000),(83,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_005.jpg','FabricOptions','DO_M105_200GSM',288.000000),(84,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_006.jpg','FabricOptions','GACH_M136_200GSM',289.000000),(85,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_007.jpg','FabricOptions','INDIGO_M146_200GSM',290.000000),(86,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_008.jpg','FabricOptions','INDIGO_M77_200GSM',291.000000),(87,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_009.jpg','FabricOptions','KEM_M101_200GSM',292.000000),(88,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_010.jpg','FabricOptions','KEM_M104_200GSM',293.000000),(89,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_011.jpg','FabricOptions','KEM_M151_200GSM',294.000000),(90,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_012.jpg','FabricOptions','KEM_M154_200GSM',295.000000),(91,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_013.jpg','FabricOptions','MAUBO_M156_200GSM',296.000000),(92,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_014.jpg','FabricOptions','METALGREY_M137_200GSM',297.000000),(93,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_015.jpg','FabricOptions','NAUGO_M144_200GSM',298.000000),(94,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_016.jpg','FabricOptions','NAUHATOCCHO_M134_200GSM',299.000000),(95,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_017.jpg','FabricOptions','REUNHAT_M153_200GSM',300.000000),(96,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_018.jpg','FabricOptions','REU_M155_200GSM',301.000000),(97,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_019.jpg','FabricOptions','TIMANHXANH_M122_200GSM',302.000000),(98,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_020.jpg','FabricOptions','XAMCHIANHNAU_M117_200GSM',303.000000),(99,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_021.jpg','FabricOptions','XAMCHI_M159_200GSM',304.000000),(100,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_022.jpg','FabricOptions','XAMXANH_M118_200GSM',305.000000),(101,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_023.jpg','FabricOptions','XANHBIENNHAT_M116_200GSM',306.000000),(102,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_024.jpg','FabricOptions','XAMCHAM_M147_200GSM',307.000000),(103,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_025.jpg','FabricOptions','XANHCOVITDAM_M119_200GSM',308.000000),(104,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_026.jpg','FabricOptions','XANHDA_M124_200GSM',309.000000),(105,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_027.jpg','FabricOptions','XANHDA_M161_200GSM',310.000000),(106,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_028.jpg','FabricOptions','XANHDAUNHAT_M150_200GSM',311.000000),(107,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_029.jpg','FabricOptions','XANHNGODAM_M162_200GSM',312.000000),(108,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_030.jpg','FabricOptions','XANHREU_M145_200GSM',313.000000),(109,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_031.jpg','FabricOptions','XANHREU_M152_200GSM',314.000000),(110,'Line','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Line/FabricOptions_Line_032.jpg','FabricOptions','XANH_M120_200GSM',315.000000),(111,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_001.png','FabricOptions','DT789-2',316.000000),(112,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_002.png','FabricOptions','DT789-16',317.000000),(113,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_003.png','FabricOptions','DT789-10',318.000000),(114,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_004.png','FabricOptions','DT789-7',319.000000),(115,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_005.png','FabricOptions','DT789-1',320.000000),(116,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_006.png','FabricOptions','DT789-6',321.000000),(117,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_007.png','FabricOptions','DT789-5',322.000000),(118,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_008.png','FabricOptions','DT789-9',323.000000),(119,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_009.png','FabricOptions','DT789-15',324.000000),(120,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_010.png','FabricOptions','DT789-14',325.000000),(121,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_011.png','FabricOptions','DT789-13',326.000000),(122,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_012.png','FabricOptions','DT789-17',327.000000),(123,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_013.png','FabricOptions','DT789-3',328.000000),(124,'MerinoWoolBlend','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/MerinoWoolBlend/FabricOptions_MerinoWoolBlend_014.png','FabricOptions','DT789-8',329.000000),(125,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_001.png','FabricOptions','SUNSHINE-160#',330.000000),(126,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_002.png','FabricOptions','SUNSHINE-161#',331.000000),(127,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_003.png','FabricOptions','SUNSHINE-162#',332.000000),(128,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_004.png','FabricOptions','SUNSHINE-166#',333.000000),(129,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_005.png','FabricOptions','SUNSHINE-165#',334.000000),(130,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_006.png','FabricOptions','SUNSHINE-163#',335.000000),(131,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_007.png','FabricOptions','SUNSHINE-270-10#',336.000000),(132,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_008.png','FabricOptions','SUNSHINE-270-9#',337.000000),(133,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_009.png','FabricOptions','SUNSHINE-270-8#',338.000000),(134,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_010.png','FabricOptions','SUNSHINE-270-13#',339.000000),(135,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_011.png','FabricOptions','SUNSHINE-270-12#',340.000000),(136,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_012.png','FabricOptions','SUNSHINE-270-11#',341.000000),(137,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_013.png','FabricOptions','SUNSHINE-270-15#',342.000000),(138,'Super150sWool','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/Super150sWool/FabricOptions_Super150sWool_014.png','FabricOptions','SUNSHINE-270-14#',343.000000),(139,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_001.JPG','FabricOptions','VP-01',344.000000),(140,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_002.JPG','FabricOptions','VP-10',345.000000),(141,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_003.JPG','FabricOptions','VP-11',346.000000),(142,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_004.JPG','FabricOptions','VP-12',347.000000),(143,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_005.JPG','FabricOptions','VP-13',348.000000),(144,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_006.JPG','FabricOptions','VP-14',349.000000),(145,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_007.JPG','FabricOptions','VP-15',350.000000),(146,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_008.JPG','FabricOptions','VP-16',351.000000),(147,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_009.JPG','FabricOptions','VP-17',352.000000),(148,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_010.JPG','FabricOptions','VP-18',353.000000),(149,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_011.JPG','FabricOptions','VP-19',354.000000),(150,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_012.JPG','FabricOptions','VP-02',355.000000),(151,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_013.JPG','FabricOptions','VP-20',356.000000),(152,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_014.JPG','FabricOptions','VP-21',357.000000),(153,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_015.JPG','FabricOptions','VP-22',358.000000),(154,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_016.JPG','FabricOptions','VP-23',359.000000),(155,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_017.JPG','FabricOptions','VP-24',360.000000),(156,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_018.JPG','FabricOptions','VP-25',361.000000),(157,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_019.JPG','FabricOptions','VP-26',362.000000),(158,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_020.JPG','FabricOptions','VP-27',363.000000),(159,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_021.JPG','FabricOptions','VP-28',364.000000),(160,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_022.JPG','FabricOptions','VP-03',365.000000),(161,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_023.JPG','FabricOptions','VP-04',366.000000),(162,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_024.JPG','FabricOptions','VP-05',367.000000),(163,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_025.JPG','FabricOptions','VP-06',368.000000),(164,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_026.JPG','FabricOptions','VP-07',369.000000),(165,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_027.JPG','FabricOptions','VP-08',370.000000),(166,'WoolAndVlvet','','https://d1wuhi05elo03b.cloudfront.net/FabricOptions/WoolAndVlvet/FabricOptions_WoolAndVlvet_028.JPG','FabricOptions','VP-09',371.000000),(167,'ThreePieceSuit','','https://d1wuhi05elo03b.cloudfront.net/SuitType/ThreePieceSuit/SuitType_ThreePieceSuit_001.JPG','SuitType','SuitType_ThreePieceSuit_001.JPG',372.000000),(168,'ThreePieceSuit','','https://d1wuhi05elo03b.cloudfront.net/SuitType/ThreePieceSuit/SuitType_ThreePieceSuit_002.JPG','SuitType','SuitType_ThreePieceSuit_002.JPG',373.000000),(169,'ThreePieceSuit','','https://d1wuhi05elo03b.cloudfront.net/SuitType/ThreePieceSuit/SuitType_ThreePieceSuit_003.JPG','SuitType','SuitType_ThreePieceSuit_003.JPG',374.000000),(170,'TwoPieceSuit','','https://d1wuhi05elo03b.cloudfront.net/SuitType/TwoPieceSuit/SuitType_TwoPieceSuit_001.JPG','SuitType','SuitType_TwoPieceSuit_001.JPG',375.000000),(171,'TwoPieceSuit','','https://d1wuhi05elo03b.cloudfront.net/SuitType/TwoPieceSuit/SuitType_TwoPieceSuit_002.JPG','SuitType','SuitType_TwoPieceSuit_002.JPG',376.000000),(172,'TwoPieceSuit','','https://d1wuhi05elo03b.cloudfront.net/SuitType/TwoPieceSuit/SuitType_TwoPieceSuit_003.JPG','SuitType','SuitType_TwoPieceSuit_003.JPG',377.000000),(173,'DoubleButtonDoublePlated','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/DoubleButtonDoublePlated/TrouserType_DoubleButtonDoublePlated_001.JPG','TrouserType','TrouserType_DoubleButtonDoublePlated_001.JPG',378.000000),(174,'DoubleButtonDoublePlated','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/DoubleButtonDoublePlated/TrouserType_DoubleButtonDoublePlated_002.JPG','TrouserType','TrouserType_DoubleButtonDoublePlated_002.JPG',379.000000),(175,'DoubleButtonDoublePlated','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/DoubleButtonDoublePlated/TrouserType_DoubleButtonDoublePlated_003.JPG','TrouserType','TrouserType_DoubleButtonDoublePlated_003.JPG',380.000000),(176,'DoubleButtonDoublePlated','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/DoubleButtonDoublePlated/TrouserType_DoubleButtonDoublePlated_004.JPG','TrouserType','TrouserType_DoubleButtonDoublePlated_004.JPG',381.000000),(177,'DoubleButtonPlateLessDisconnectedSideLoop','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/DoubleButtonPlateLessDisconnectedSideLoop/TrouserType_DoubleButtonPlateLessDisconnectedSideLoop_001.JPG','TrouserType','TrouserType_DoubleButtonPlateLessDisconnectedSideLoop_001.JPG',382.000000),(178,'DoubleButtonPlateLessDisconnectedSideLoop','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/DoubleButtonPlateLessDisconnectedSideLoop/TrouserType_DoubleButtonPlateLessDisconnectedSideLoop_002.JPG','TrouserType','TrouserType_DoubleButtonPlateLessDisconnectedSideLoop_002.JPG',383.000000),(179,'DoubleButtonPlateLessDisconnectedSideLoop','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/DoubleButtonPlateLessDisconnectedSideLoop/TrouserType_DoubleButtonPlateLessDisconnectedSideLoop_003.JPG','TrouserType','TrouserType_DoubleButtonPlateLessDisconnectedSideLoop_003.JPG',384.000000),(180,'DoubleButtonPlateLessDisconnectedSideLoop','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/DoubleButtonPlateLessDisconnectedSideLoop/TrouserType_DoubleButtonPlateLessDisconnectedSideLoop_004.JPG','TrouserType','TrouserType_DoubleButtonPlateLessDisconnectedSideLoop_004.JPG',385.000000),(181,'PlateLessStandardSingleButton','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/PlateLessStandardSingleButton/TrouserType_PlateLessStandardSingleButton_001.JPG','TrouserType','TrouserType_PlateLessStandardSingleButton_001.JPG',386.000000),(182,'PlateLessStandardSingleButton','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/PlateLessStandardSingleButton/TrouserType_PlateLessStandardSingleButton_002.JPG','TrouserType','TrouserType_PlateLessStandardSingleButton_002.JPG',387.000000),(183,'PlateLessStandardSingleButton','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/PlateLessStandardSingleButton/TrouserType_PlateLessStandardSingleButton_003.JPG','TrouserType','TrouserType_PlateLessStandardSingleButton_003.JPG',388.000000),(184,'PlateLessStandardSingleButton','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/PlateLessStandardSingleButton/TrouserType_PlateLessStandardSingleButton_004.JPG','TrouserType','TrouserType_PlateLessStandardSingleButton_004.JPG',389.000000),(185,'PlateLessStandardSingleButton','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/PlateLessStandardSingleButton/TrouserType_PlateLessStandardSingleButton_005.JPG','TrouserType','TrouserType_PlateLessStandardSingleButton_005.JPG',390.000000),(186,'PlateLessStandardSingleButton','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/PlateLessStandardSingleButton/TrouserType_PlateLessStandardSingleButton_006.JPG','TrouserType','TrouserType_PlateLessStandardSingleButton_006.JPG',391.000000),(187,'PlateLessStandardSingleButton','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/PlateLessStandardSingleButton/TrouserType_PlateLessStandardSingleButton_007.JPG','TrouserType','TrouserType_PlateLessStandardSingleButton_007.JPG',392.000000),(188,'SideLoopStyleWith2Plates','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/SideLoopStyleWith2Plates/TrouserType_SideLoopStyleWith2Plates_001.JPG','TrouserType','TrouserType_SideLoopStyleWith2Plates_001.JPG',393.000000),(189,'SideLoopStyleWith2Plates','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/SideLoopStyleWith2Plates/TrouserType_SideLoopStyleWith2Plates_002.JPG','TrouserType','TrouserType_SideLoopStyleWith2Plates_002.JPG',394.000000),(190,'SideLoopStyleWith2Plates','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/SideLoopStyleWith2Plates/TrouserType_SideLoopStyleWith2Plates_003.JPG','TrouserType','TrouserType_SideLoopStyleWith2Plates_003.JPG',395.000000),(191,'SideLoopStyleWith2Plates','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/SideLoopStyleWith2Plates/TrouserType_SideLoopStyleWith2Plates_004.JPG','TrouserType','TrouserType_SideLoopStyleWith2Plates_004.JPG',396.000000),(192,'SideLoopStyleWith2Plates','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/SideLoopStyleWith2Plates/TrouserType_SideLoopStyleWith2Plates_005.JPG','TrouserType','TrouserType_SideLoopStyleWith2Plates_005.JPG',397.000000),(193,'SideLoopStyleWith2Plates','','https://d1wuhi05elo03b.cloudfront.net/TrouserType/SideLoopStyleWith2Plates/TrouserType_SideLoopStyleWith2Plates_006.JPG','TrouserType','TrouserType_SideLoopStyleWith2Plates_006.JPG',398.000000),(194,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_001.JPG','Button','Image_001.JPG',399.000000),(195,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_002.JPG','Button','Image_002.JPG',400.000000),(196,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_003.JPG','Button','Image_003.JPG',401.000000),(197,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_004.JPG','Button','Image_004.JPG',402.000000),(198,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_005.JPG','Button','Image_005.JPG',403.000000),(199,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_006.JPG','Button','Image_006.JPG',404.000000),(200,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_007.JPG','Button','Image_007.JPG',405.000000),(201,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_008.JPG','Button','Image_008.JPG',406.000000),(202,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_009.JPG','Button','Image_009.JPG',407.000000),(203,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_010.JPG','Button','Image_010.JPG',408.000000),(204,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_011.JPG','Button','Image_011.JPG',409.000000),(205,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_012.JPG','Button','Image_012.JPG',410.000000),(206,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_013.JPG','Button','Image_013.JPG',411.000000),(207,'','','https://d1wuhi05elo03b.cloudfront.net/Buttons/Image_014.JPG','Button','Image_014.JPG',412.000000);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producttranslation`
--

DROP TABLE IF EXISTS `producttranslation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producttranslation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ProductId` int(11) NOT NULL,
  `Language` varchar(10) NOT NULL,
  `TranslatedName` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producttranslation`
--

LOCK TABLES `producttranslation` WRITE;
/*!40000 ALTER TABLE `producttranslation` DISABLE KEYS */;
/*!40000 ALTER TABLE `producttranslation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shirtmeasurement`
--

DROP TABLE IF EXISTS `shirtmeasurement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shirtmeasurement` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `MeasurementId` int(11) NOT NULL,
  `Chest` decimal(5,2) DEFAULT NULL,
  `Shoulder` decimal(5,2) DEFAULT NULL,
  `ArmLength` decimal(5,2) DEFAULT NULL,
  `ArmShoulderJoint` decimal(5,2) DEFAULT NULL,
  `ArmBicepWidth` decimal(5,2) DEFAULT NULL,
  `JacketWidth` decimal(5,2) DEFAULT NULL,
  `Abdomen` decimal(5,2) DEFAULT NULL,
  `BellyTummy` decimal(5,2) DEFAULT NULL,
  `Hips` decimal(5,2) DEFAULT NULL,
  `Neck` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shirtmeasurement`
--

LOCK TABLES `shirtmeasurement` WRITE;
/*!40000 ALTER TABLE `shirtmeasurement` DISABLE KEYS */;
/*!40000 ALTER TABLE `shirtmeasurement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trousermeasurement`
--

DROP TABLE IF EXISTS `trousermeasurement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trousermeasurement` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `MeasurementId` int(11) NOT NULL,
  `Waist` decimal(5,2) DEFAULT NULL,
  `UpperHips` decimal(5,2) DEFAULT NULL,
  `HipsCrotch` decimal(5,2) DEFAULT NULL,
  `Outswarm` decimal(5,2) DEFAULT NULL,
  `Thigh` decimal(5,2) DEFAULT NULL,
  `Calf` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trousermeasurement`
--

LOCK TABLES `trousermeasurement` WRITE;
/*!40000 ALTER TABLE `trousermeasurement` DISABLE KEYS */;
/*!40000 ALTER TABLE `trousermeasurement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'vyxtest'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-24 23:26:24
