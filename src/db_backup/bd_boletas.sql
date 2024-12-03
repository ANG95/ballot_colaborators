-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: db_boletas
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `boletas`
--

DROP TABLE IF EXISTS `boletas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boletas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `periodo` varchar(20) NOT NULL,
  `archivo_boleta` text NOT NULL,
  `fecha_carga` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `boletas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boletas`
--

LOCK TABLES `boletas` WRITE;
/*!40000 ALTER TABLE `boletas` DISABLE KEYS */;
INSERT INTO `boletas` VALUES (1,7,'2024-11','7-29-11-2024-ACUERDO DE CONTRATISTA INDEPENDIENTE GERMAN APAZA.pdf','2024-11-29 18:14:40'),(2,7,'2024-11','7-29-11-2024-Afiliado 75871182 2024-10-16T00_36_30.381Z.pdf','2024-11-29 18:14:40'),(3,7,'2024-11','7-29-11-2024-carretera .pdf','2024-11-29 18:14:40'),(4,7,'2024-11-07','7-29-11-2024-detalle_solicitud.pdf','2024-11-29 19:14:42'),(5,7,'2024-11-29','7-29-11-2024-detalle_solicitud.pdf','2024-11-29 20:16:57'),(6,8,'2024-11-09','8-29-11-2024-guiabasicadepiano-version2-161013022246.pdf','2024-11-29 20:23:24'),(7,8,'2024-11-29','8-29-11-2024-Guía de planificación.pdf','2024-11-29 22:43:45'),(8,24,'2024-11-29','24-29-11-2024-document.pdf','2024-11-29 22:44:14'),(9,15,'2024-11-29','15-29-11-2024-LK280_ES.pdf','2024-11-29 22:45:33'),(10,19,'2024-11-29','19-29-11-2024-Crea tu primer proyecto Android con Kotlin.pdf','2024-11-29 22:47:12'),(11,34,'2024-11-29','34-29-11-2024-0102122022.pdf','2024-11-29 22:50:28'),(12,7,'2024-12-01','7-01-12-2024-Ingrid - cuidemos el agua letra.pdf','2024-12-01 21:30:27');
/*!40000 ALTER TABLE `boletas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_accesos`
--

DROP TABLE IF EXISTS `historial_accesos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_accesos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `fecha_acceso` datetime DEFAULT CURRENT_TIMESTAMP,
  `ip_acceso` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `historial_accesos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_accesos`
--

LOCK TABLES `historial_accesos` WRITE;
/*!40000 ALTER TABLE `historial_accesos` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial_accesos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rol_nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`rol_nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'administrador',NULL),(2,'colaborador',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `given_name` varchar(255) DEFAULT NULL,
  `family_name` varchar(255) DEFAULT NULL,
  `picture` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `birthdate` varchar(100) DEFAULT NULL,
  `rol_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'salva@gmail.com','salvador','Salvador','Gonzales Barrantes',NULL,'2024-11-27 01:44:45','2024-11-27 01:44:45',NULL,1),(2,'german@gmail.com','german','German','germannnnnn',NULL,'2024-11-27 02:14:29','2024-12-01 18:01:29','2024-12-01T18:01:29.406Z',2),(3,'salvadorgb06@gmail.com','Salvador Gonzales Barrantes','Salvador','Gonzales Barrantes','https://lh3.googleusercontent.com/a/ACg8ocKNhU_2VLcv1qKiJ65LeSMdnploahr8khOzM2Kok8LOvk2m_w=s96-c','2024-11-28 02:51:08','2024-11-29 13:39:42',NULL,1),(7,'german.apaza.n@gmail.com','Germán AN','Germán','AN','https://lh3.googleusercontent.com/a/ACg8ocKsYO1jd1BjJe5-3mGAI78Nqq0_1Ts0gBxCCgS4GHi7G39dQAG7=s96-c','2024-11-29 13:39:14','2024-11-29 15:32:31',NULL,1),(8,'german.apaza@orbisdata.pe','German Apaza','German','Apaza','https://lh3.googleusercontent.com/a/ACg8ocKsxZRQUhPuVGMHHQ-xMqkyAs20k0nyuw4QebBmdtrs48T9HA=s96-c','2024-11-29 14:16:28','2024-11-29 14:16:28',NULL,2),(10,'user10@example.com','User Ten','User','Ten','https://example.com/pic10.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,1),(11,'user11@example.com','User Eleven','User','Eleven','https://example.com/pic11.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(12,'user12@example.com','User Twelve','User','Twelve','https://example.com/pic12.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(13,'user13@example.com','User Thirteen','User','Thirteen','https://example.com/pic13.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,1),(14,'user14@example.com','User Fourteen','User','Fourteen','https://example.com/pic14.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(15,'user15@example.com','User Fifteen','User','Fifteen','https://example.com/pic15.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(16,'user16@example.com','User Sixteen','User','Sixteen','https://example.com/pic16.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,1),(17,'user17@example.com','User Seventeen','User','Seventeen','https://example.com/pic17.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(18,'user18@example.com','User Eighteen','User','Eighteen','https://example.com/pic18.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(19,'user19@example.com','User Nineteen','User','Nineteen','https://example.com/pic19.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,1),(20,'user20@example.com','User Twenty','User','Twenty','https://example.com/pic20.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(21,'user21@example.com','User Twenty-One','User','Twenty-One','https://example.com/pic21.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(22,'user22@example.com','User Twenty-Two','User','Twenty-Two','https://example.com/pic22.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,1),(23,'user23@example.com','User Twenty-Three','User','Twenty-Three','https://example.com/pic23.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(24,'user24@example.com','User Twenty-Four','User','Twenty-Four','https://example.com/pic24.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(25,'user25@example.com','User Twenty-Five','User','Twenty-Five','https://example.com/pic25.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,1),(26,'user26@example.com','User Twenty-Six','User','Twenty-Six','https://example.com/pic26.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(27,'user27@example.com','User Twenty-Seven','User','Twenty-Seven','https://example.com/pic27.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(28,'user28@example.com','User Twenty-Eight','User','Twenty-Eight','https://example.com/pic28.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,1),(29,'user29@example.com','User Twenty-Nine','User','Twenty-Nine','https://example.com/pic29.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(30,'user30@example.com','User Thirty','User','Thirty','https://example.com/pic30.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(31,'user31@example.com','User Thirty-One','User','Thirty-One','https://example.com/pic31.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,1),(32,'user32@example.com','User Thirty-Two','User','Thirty-Two','https://example.com/pic32.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(33,'user33@example.com','User Thirty-Three','User','Thirty-Three','https://example.com/pic33.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(34,'user34@example.com','User Thirty-Four','User','Thirty-Four','https://example.com/pic34.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,1),(35,'user35@example.com','User Thirty-Five','User','Thirty-Five','https://example.com/pic35.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(36,'user36@example.com','User Thirty-Six','User','Thirty-Six','https://example.com/pic36.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(37,'user37@example.com','User Thirty-Seven','User','Thirty-Seven','https://example.com/pic37.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,1),(38,'user38@example.com','User Thirty-Eight','User','Thirty-Eight','https://example.com/pic38.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2),(39,'user39@example.com','User Thirty-Nine','User','Thirty-Nine','https://example.com/pic39.jpg','2024-11-29 14:59:58','2024-11-29 14:59:58',NULL,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-03 14:26:15
