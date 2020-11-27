/*
 Navicat Premium Data Transfer

 Source Server         : 39.107.40.137
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : 2004wx

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 26/11/2020 15:31:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `goods_id` int(11) DEFAULT NULL COMMENT '商品id',
  `buy_num` int(11) DEFAULT NULL COMMENT '购买量',
  `add_time` int(11) DEFAULT NULL COMMENT '加入时间',
  `goods_attr_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '1' COMMENT 'sku id',
  `goods_price_one` decimal(11, 2) DEFAULT NULL COMMENT '单价',
  `product_id` int(11) DEFAULT NULL COMMENT '货品id',
  `goods_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品名字',
  `goods_h` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品货号',
  `is_del` int(11) DEFAULT 0 COMMENT '是否删除',
  PRIMARY KEY (`cart_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (14, 2, 3, 1, 1606373026, '1', 99.00, NULL, NULL, NULL, 0);
INSERT INTO `cart` VALUES (15, 2, 2, 1, 1606374230, '1', 329.00, NULL, NULL, NULL, 0);
INSERT INTO `cart` VALUES (16, 5, 8, 1, 1606375014, '1', 99.00, NULL, NULL, NULL, 0);
INSERT INTO `cart` VALUES (17, 5, 13, 1, 1606375037, '1', 329.00, NULL, NULL, NULL, 0);

SET FOREIGN_KEY_CHECKS = 1;
