-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2020 at 07:13 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node-sql`
--

-- --------------------------------------------------------

--
-- Table structure for table `dataproduk`
--

CREATE TABLE `dataproduk` (
  `id` int(11) NOT NULL,
  `product_id` int(100) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_price` int(100) NOT NULL,
  `product_image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dataproduk`
--

INSERT INTO `dataproduk` (`id`, `product_id`, `product_name`, `product_price`, `product_image`) VALUES
(241, 18, 'Es Teh Manis', 5000, '16092016002674345f6224aa02d79.jpg'),
(242, 19, 'Teh Botol', 5000, '16092016002674805f6224d8e02c1.jpg'),
(243, 20, 'Nasi Goreng', 15000, '16092016002675855f622541b8417.jpg'),
(246, 0, 'waefkpawof', 24000, '2355702.jpg'),
(247, 0, 'ewaf', 12000, 'wp5207990.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dataproduk`
--
ALTER TABLE `dataproduk`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dataproduk`
--
ALTER TABLE `dataproduk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=249;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
