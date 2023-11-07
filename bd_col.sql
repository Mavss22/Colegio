/*
 Navicat Premium Data Transfer

 Source Server         : PC
 Source Server Type    : MySQL
 Source Server Version : 80200 (8.2.0)
 Source Host           : localhost:3307
 Source Schema         : bd_col

 Target Server Type    : MySQL
 Target Server Version : 80200 (8.2.0)
 File Encoding         : 65001

 Date: 06/11/2023 19:48:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for alumno
-- ----------------------------
DROP TABLE IF EXISTS `alumno`;
CREATE TABLE `alumno`  (
  `Id_Alumno` int NOT NULL,
  `Id_Carrera` int NULL DEFAULT NULL,
  `Nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Apellido` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Carné` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Fecha_Nac` date NULL DEFAULT NULL,
  `Dpi` int NULL DEFAULT NULL,
  `Telefono` int NULL DEFAULT NULL,
  `Dirección` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Alumno`) USING BTREE,
  UNIQUE INDEX `Carné`(`Carné` ASC) USING BTREE,
  INDEX `Id_Carrera`(`Id_Carrera` ASC) USING BTREE,
  CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`Id_Carrera`) REFERENCES `carrera` (`Id_Carrera`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of alumno
-- ----------------------------

-- ----------------------------
-- Table structure for carrera
-- ----------------------------
DROP TABLE IF EXISTS `carrera`;
CREATE TABLE `carrera`  (
  `Id_Carrera` int NOT NULL,
  `Nombre_Carrera` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Carrera`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of carrera
-- ----------------------------

-- ----------------------------
-- Table structure for comite
-- ----------------------------
DROP TABLE IF EXISTS `comite`;
CREATE TABLE `comite`  (
  `Id_Comite` int NOT NULL,
  `Fecha_Creacion` date NULL DEFAULT NULL,
  `Id_Lugar_Evaluacion` int NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Comite`) USING BTREE,
  INDEX `Id_Lugar_Evaluacion`(`Id_Lugar_Evaluacion` ASC) USING BTREE,
  CONSTRAINT `comite_ibfk_1` FOREIGN KEY (`Id_Lugar_Evaluacion`) REFERENCES `lugar_evaluacion` (`Id_Lugar`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comite
-- ----------------------------

-- ----------------------------
-- Table structure for detalle_comite
-- ----------------------------
DROP TABLE IF EXISTS `detalle_comite`;
CREATE TABLE `detalle_comite`  (
  `Id_Detalle` int NOT NULL,
  `Id_Comite` int NULL DEFAULT NULL,
  `Id_Profesor` int NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Detalle`) USING BTREE,
  INDEX `Id_Comite`(`Id_Comite` ASC) USING BTREE,
  INDEX `Id_Profesor`(`Id_Profesor` ASC) USING BTREE,
  CONSTRAINT `detalle_comite_ibfk_1` FOREIGN KEY (`Id_Comite`) REFERENCES `comite` (`Id_Comite`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `detalle_comite_ibfk_2` FOREIGN KEY (`Id_Profesor`) REFERENCES `profesor` (`Id_Profesor`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of detalle_comite
-- ----------------------------

-- ----------------------------
-- Table structure for detalle_grupo_investigacion
-- ----------------------------
DROP TABLE IF EXISTS `detalle_grupo_investigacion`;
CREATE TABLE `detalle_grupo_investigacion`  (
  `Id_Detalle` int NOT NULL,
  `Id_Grupo` int NULL DEFAULT NULL,
  `Id_Estudiante` int NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Detalle`) USING BTREE,
  INDEX `Id_Grupo`(`Id_Grupo` ASC) USING BTREE,
  INDEX `Id_Estudiante`(`Id_Estudiante` ASC) USING BTREE,
  CONSTRAINT `detalle_grupo_investigacion_ibfk_1` FOREIGN KEY (`Id_Grupo`) REFERENCES `grupo_investigacion` (`Id_Grupo`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `detalle_grupo_investigacion_ibfk_2` FOREIGN KEY (`Id_Estudiante`) REFERENCES `alumno` (`Id_Alumno`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of detalle_grupo_investigacion
-- ----------------------------

-- ----------------------------
-- Table structure for grado_academico
-- ----------------------------
DROP TABLE IF EXISTS `grado_academico`;
CREATE TABLE `grado_academico`  (
  `Id_Grado` int NOT NULL,
  `Nombre_Grado` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Grado`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of grado_academico
-- ----------------------------

-- ----------------------------
-- Table structure for grupo_investigacion
-- ----------------------------
DROP TABLE IF EXISTS `grupo_investigacion`;
CREATE TABLE `grupo_investigacion`  (
  `Id_Grupo` int NOT NULL,
  `Nombre_Grupo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Grupo`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of grupo_investigacion
-- ----------------------------

-- ----------------------------
-- Table structure for historial_asesoria
-- ----------------------------
DROP TABLE IF EXISTS `historial_asesoria`;
CREATE TABLE `historial_asesoria`  (
  `Id_Asesoria` int NOT NULL,
  `Id_Profesor` int NULL DEFAULT NULL,
  `Id_Alumno` int NULL DEFAULT NULL,
  `Id_TFC` int NULL DEFAULT NULL,
  `Fecha_Inic` date NULL DEFAULT NULL,
  `Fecha_Fin` date NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Asesoria`) USING BTREE,
  INDEX `Id_Profesor`(`Id_Profesor` ASC) USING BTREE,
  INDEX `Id_Alumno`(`Id_Alumno` ASC) USING BTREE,
  INDEX `Id_TFC`(`Id_TFC` ASC) USING BTREE,
  CONSTRAINT `historial_asesoria_ibfk_1` FOREIGN KEY (`Id_Profesor`) REFERENCES `profesor` (`Id_Profesor`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `historial_asesoria_ibfk_2` FOREIGN KEY (`Id_Alumno`) REFERENCES `alumno` (`Id_Alumno`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `historial_asesoria_ibfk_3` FOREIGN KEY (`Id_TFC`) REFERENCES `tfc` (`Id_TFC`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of historial_asesoria
-- ----------------------------

-- ----------------------------
-- Table structure for lugar_evaluacion
-- ----------------------------
DROP TABLE IF EXISTS `lugar_evaluacion`;
CREATE TABLE `lugar_evaluacion`  (
  `Id_Lugar` int NOT NULL,
  `Lugar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Lugar`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lugar_evaluacion
-- ----------------------------

-- ----------------------------
-- Table structure for profesor
-- ----------------------------
DROP TABLE IF EXISTS `profesor`;
CREATE TABLE `profesor`  (
  `Id_Profesor` int NOT NULL,
  `Id_Grado` int NULL DEFAULT NULL,
  `Nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Apellido` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Carnet` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Fecha_Nac` date NULL DEFAULT NULL,
  `DPI` int NULL DEFAULT NULL,
  `Telefono` int NULL DEFAULT NULL,
  `Dirección` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id_Profesor`) USING BTREE,
  UNIQUE INDEX `Carnet`(`Carnet` ASC) USING BTREE,
  UNIQUE INDEX `DPI`(`DPI` ASC) USING BTREE,
  INDEX `Id_Grado`(`Id_Grado` ASC) USING BTREE,
  CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`Id_Grado`) REFERENCES `grado_academico` (`Id_Grado`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of profesor
-- ----------------------------

-- ----------------------------
-- Table structure for tfc
-- ----------------------------
DROP TABLE IF EXISTS `tfc`;
CREATE TABLE `tfc`  (
  `Id_TFC` int NOT NULL,
  `Nombre_Tema` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`Id_TFC`) USING BTREE,
  UNIQUE INDEX `Nombre_Tema`(`Nombre_Tema` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tfc
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
