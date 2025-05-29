-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2025 at 12:24 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `psmcodes_crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `follow_ups`
--

CREATE TABLE `follow_ups` (
  `id` int(11) NOT NULL,
  `lead_id` int(11) DEFAULT NULL,
  `follow_up_date` datetime DEFAULT NULL,
  `note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follow_ups`
--

INSERT INTO `follow_ups` (`id`, `lead_id`, `follow_up_date`, `note`, `created_at`) VALUES
(1, 40, '2025-06-15 12:22:17', 'Auto-generated follow-up note #1.', '2025-05-27 12:31:02'),
(2, 5, '2025-06-15 12:22:17', 'Auto-generated follow-up note #2.', '2025-05-27 12:31:02'),
(3, 7, '2025-06-17 12:22:17', 'Auto-generated follow-up note #3.', '2025-05-27 12:31:02'),
(4, 26, '2025-06-14 12:22:17', 'Auto-generated follow-up note #4.', '2025-05-27 12:31:02'),
(5, 15, '2025-06-12 12:22:17', 'Auto-generated follow-up note #5.', '2025-05-27 12:31:02'),
(6, 28, '2025-06-26 12:22:17', 'Auto-generated follow-up note #6.', '2025-05-27 12:31:02'),
(7, 13, '2025-06-01 12:22:17', 'Auto-generated follow-up note #7.', '2025-05-27 12:31:02'),
(8, 9, '2025-06-26 12:22:17', 'Auto-generated follow-up note #8.', '2025-05-27 12:31:02'),
(9, 36, '2025-06-03 12:22:17', 'Auto-generated follow-up note #9.', '2025-05-27 12:31:02'),
(10, 34, '2025-06-19 12:22:17', 'Auto-generated follow-up note #10.', '2025-05-27 12:31:02'),
(11, 23, '2025-06-21 12:22:17', 'Auto-generated follow-up note #11.', '2025-05-27 12:31:02'),
(12, 50, '2025-06-07 12:22:17', 'Auto-generated follow-up note #12.', '2025-05-27 12:31:02'),
(13, 23, '2025-06-15 12:22:17', 'Auto-generated follow-up note #13.', '2025-05-27 12:31:02'),
(14, 20, '2025-06-22 12:22:17', 'Auto-generated follow-up note #14.', '2025-05-27 12:31:02'),
(15, 27, '2025-06-05 12:22:17', 'Auto-generated follow-up note #15.', '2025-05-27 12:31:02'),
(16, 4, '2025-06-08 12:22:17', 'Auto-generated follow-up note #16.', '2025-05-27 12:31:02'),
(17, 16, '2025-06-12 12:22:17', 'Auto-generated follow-up note #17.', '2025-05-27 12:31:02'),
(18, 2, '2025-06-28 12:22:17', 'Auto-generated follow-up note #18.', '2025-05-27 12:31:02'),
(19, 45, '2025-06-24 12:22:17', 'Auto-generated follow-up note #19.', '2025-05-27 12:31:02'),
(20, 18, '2025-06-06 12:22:17', 'Auto-generated follow-up note #20.', '2025-05-27 12:31:02');

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `status` enum('new','contacted','in_progress','converted','lost') DEFAULT 'new',
  `notes` text DEFAULT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `name`, `email`, `phone`, `source`, `status`, `notes`, `assigned_to`, `created_at`) VALUES
(1, 'Hannah Taylor', 'hannah.taylor0@example.com', '2591356321', 'Cold Call', 'new', 'Auto-generated note for Hannah Taylor.', 3, '2025-05-27 12:30:43'),
(2, 'Bob Johnson', 'bob.johnson1@example.com', '7038954128', 'Email Campaign', 'lost', 'Auto-generated note for Bob Johnson.', 2, '2025-05-27 12:30:43'),
(3, 'George Evans', 'george.evans2@example.com', '4988027962', 'Cold Call', 'converted', 'Auto-generated note for George Evans.', 2, '2025-05-27 12:30:43'),
(4, 'Ian Evans', 'ian.evans3@example.com', '3926084828', 'Email Campaign', 'in_progress', 'Auto-generated note for Ian Evans.', 1, '2025-05-27 12:30:43'),
(5, 'Alice Prince', 'alice.prince4@example.com', '6480382549', 'Cold Call', 'contacted', 'Auto-generated note for Alice Prince.', 3, '2025-05-27 12:30:43'),
(6, 'Hannah Evans', 'hannah.evans5@example.com', '5718129541', 'Event', 'contacted', 'Auto-generated note for Hannah Evans.', 2, '2025-05-27 12:30:43'),
(7, 'Julia Johnson', 'julia.johnson6@example.com', '5574312488', 'Referral', 'converted', 'Auto-generated note for Julia Johnson.', 3, '2025-05-27 12:30:43'),
(8, 'Bob Taylor', 'bob.taylor7@example.com', '9173940170', 'Website', 'in_progress', 'Auto-generated note for Bob Taylor.', 3, '2025-05-27 12:30:43'),
(9, 'Ian Smith', 'ian.smith8@example.com', '8291865143', 'Email Campaign', 'new', 'Auto-generated note for Ian Smith.', 1, '2025-05-27 12:30:43'),
(10, 'Fiona Clark', 'fiona.clark9@example.com', '7812894185', 'Referral', 'lost', 'Auto-generated note for Fiona Clark.', 2, '2025-05-27 12:30:43'),
(11, 'Hannah Stone', 'hannah.stone10@example.com', '9723501849', 'Website', 'converted', 'Auto-generated note for Hannah Stone.', 1, '2025-05-27 12:30:43'),
(12, 'Ethan Prince', 'ethan.prince11@example.com', '8165439309', 'Referral', 'converted', 'Auto-generated note for Ethan Prince.', 2, '2025-05-27 12:30:43'),
(13, 'Diana Taylor', 'diana.taylor12@example.com', '6928160411', 'Website', 'contacted', 'Auto-generated note for Diana Taylor.', 1, '2025-05-27 12:30:43'),
(14, 'Bob Brown', 'bob.brown13@example.com', '9762496832', 'Website', 'lost', 'Auto-generated note for Bob Brown.', 1, '2025-05-27 12:30:43'),
(15, 'Alice Smith', 'alice.smith14@example.com', '7512480170', 'Referral', 'in_progress', 'Auto-generated note for Alice Smith.', 2, '2025-05-27 12:30:43'),
(16, 'Charlie Stone', 'charlie.stone15@example.com', '5248173198', 'Cold Call', 'contacted', 'Auto-generated note for Charlie Stone.', 1, '2025-05-27 12:30:43'),
(17, 'Ian Adams', 'ian.adams16@example.com', '4310897529', 'Cold Call', 'contacted', 'Auto-generated note for Ian Adams.', 1, '2025-05-27 12:30:43'),
(18, 'Julia Clark', 'julia.clark17@example.com', '9162584081', 'Website', 'contacted', 'Auto-generated note for Julia Clark.', 2, '2025-05-27 12:30:43'),
(19, 'Bob Clark', 'bob.clark18@example.com', '7891023567', 'Cold Call', 'new', 'Auto-generated note for Bob Clark.', 1, '2025-05-27 12:30:43'),
(20, 'Ethan Adams', 'ethan.adams19@example.com', '6432905781', 'Event', 'converted', 'Auto-generated note for Ethan Adams.', 3, '2025-05-27 12:30:43'),
(21, 'Fiona Taylor', 'fiona.taylor20@example.com', '6813920547', 'Cold Call', 'contacted', 'Auto-generated note for Fiona Taylor.', 3, '2025-05-27 12:30:43'),
(22, 'Charlie Clark', 'charlie.clark21@example.com', '8279102436', 'Event', 'lost', 'Auto-generated note for Charlie Clark.', 1, '2025-05-27 12:30:43'),
(23, 'Diana Prince', 'diana.prince22@example.com', '6581273049', 'Cold Call', 'lost', 'Auto-generated note for Diana Prince.', 3, '2025-05-27 12:30:43'),
(24, 'George Taylor', 'george.taylor23@example.com', '3941075823', 'Email Campaign', 'lost', 'Auto-generated note for George Taylor.', 1, '2025-05-27 12:30:43'),
(25, 'Ian Adams', 'ian.adams24@example.com', '7832490156', 'Referral', 'contacted', 'Auto-generated note for Ian Adams.', 2, '2025-05-27 12:30:43'),
(26, 'Alice Stone', 'alice.stone25@example.com', '8943215072', 'Cold Call', 'contacted', 'Auto-generated note for Alice Stone.', 2, '2025-05-27 12:30:43'),
(27, 'Charlie Smith', 'charlie.smith26@example.com', '5931704823', 'Referral', 'converted', 'Auto-generated note for Charlie Smith.', 3, '2025-05-27 12:30:43'),
(28, 'Fiona Prince', 'fiona.prince27@example.com', '8315079264', 'Cold Call', 'contacted', 'Auto-generated note for Fiona Prince.', 2, '2025-05-27 12:30:43'),
(29, 'George Clark', 'george.clark28@example.com', '9057162834', 'Referral', 'new', 'Auto-generated note for George Clark.', 3, '2025-05-27 12:30:43'),
(30, 'Hannah Clark', 'hannah.clark29@example.com', '8741290453', 'Email Campaign', 'converted', 'Auto-generated note for Hannah Clark.', 3, '2025-05-27 12:30:43'),
(31, 'Julia Evans', 'julia.evans30@example.com', '7584901623', 'Cold Call', 'in_progress', 'Auto-generated note for Julia Evans.', 1, '2025-05-27 12:30:43'),
(32, 'Ian Clark', 'ian.clark31@example.com', '6528170349', 'Event', 'lost', 'Auto-generated note for Ian Clark.', 2, '2025-05-27 12:30:43'),
(33, 'Ethan Taylor', 'ethan.taylor32@example.com', '9217834056', 'Cold Call', 'converted', 'Auto-generated note for Ethan Taylor.', 2, '2025-05-27 12:30:43'),
(34, 'George Brown', 'george.brown33@example.com', '8701329546', 'Referral', 'new', 'Auto-generated note for George Brown.', 1, '2025-05-27 12:30:43'),
(35, 'Charlie Brown', 'charlie.brown34@example.com', '5619208437', 'Website', 'in_progress', 'Auto-generated note for Charlie Brown.', 3, '2025-05-27 12:30:43'),
(36, 'Alice Taylor', 'alice.taylor35@example.com', '3952104872', 'Cold Call', 'lost', 'Auto-generated note for Alice Taylor.', 2, '2025-05-27 12:30:43'),
(37, 'Diana Evans', 'diana.evans36@example.com', '7389201456', 'Referral', 'contacted', 'Auto-generated note for Diana Evans.', 2, '2025-05-27 12:30:43'),
(38, 'Fiona Johnson', 'fiona.johnson37@example.com', '6491825730', 'Email Campaign', 'lost', 'Auto-generated note for Fiona Johnson.', 3, '2025-05-27 12:30:43'),
(39, 'Ian Johnson', 'ian.johnson38@example.com', '4219058736', 'Referral', 'converted', 'Auto-generated note for Ian Johnson.', 2, '2025-05-27 12:30:43'),
(40, 'Bob Evans', 'bob.evans39@example.com', '7361925048', 'Cold Call', 'in_progress', 'Auto-generated note for Bob Evans.', 1, '2025-05-27 12:30:43'),
(41, 'Charlie Taylor', 'charlie.taylor40@example.com', '5192038746', 'Event', 'new', 'Auto-generated note for Charlie Taylor.', 3, '2025-05-27 12:30:43'),
(42, 'Ethan Smith', 'ethan.smith41@example.com', '8219053647', 'Email Campaign', 'lost', 'Auto-generated note for Ethan Smith.', 2, '2025-05-27 12:30:43'),
(43, 'George Adams', 'george.adams42@example.com', '6091347852', 'Website', 'converted', 'Auto-generated note for George Adams.', 2, '2025-05-27 12:30:43'),
(44, 'Alice Clark', 'alice.clark43@example.com', '3842905167', 'Referral', 'in_progress', 'Auto-generated note for Alice Clark.', 2, '2025-05-27 12:30:43'),
(45, 'Julia Brown', 'julia.brown44@example.com', '5419038267', 'Event', 'contacted', 'Auto-generated note for Julia Brown.', 3, '2025-05-27 12:30:43'),
(46, 'Bob Stone', 'bob.stone45@example.com', '4791205683', 'Email Campaign', 'lost', 'Auto-generated note for Bob Stone.', 2, '2025-05-27 12:30:43'),
(47, 'Diana Johnson', 'diana.johnson46@example.com', '9382150476', 'Website', 'converted', 'Auto-generated note for Diana Johnson.', 1, '2025-05-27 12:30:43'),
(48, 'Charlie Clark', 'charlie.clark47@example.com', '6918032457', 'Event', 'contacted', 'Auto-generated note for Charlie Clark.', 3, '2025-05-27 12:30:43'),
(49, 'Ian Taylor', 'ian.taylor48@example.com', '3809175620', 'Referral', 'new', 'Auto-generated note for Ian Taylor.', 3, '2025-05-27 12:30:43'),
(50, 'George Johnson', 'george.johnson49@example.com', '2716589301', 'Referral', 'new', 'Auto-generated note for George Johnson.', 2, '2025-05-27 12:30:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','agent') DEFAULT 'agent',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'prasad', 'prasad@gmail.com', '123456', 'agent', '2025-05-27 12:19:10'),
(2, 'manthan', 'manthan@gmail.com', '123456', 'agent', '2025-05-27 12:26:54'),
(3, 'shravan', 'shravan@gmail.com', '123456', 'agent', '2025-05-27 12:27:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follow_ups`
--
ALTER TABLE `follow_ups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lead_id` (`lead_id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assigned_to` (`assigned_to`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `follow_ups`
--
ALTER TABLE `follow_ups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follow_ups`
--
ALTER TABLE `follow_ups`
  ADD CONSTRAINT `follow_ups_ibfk_1` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`);

--
-- Constraints for table `leads`
--
ALTER TABLE `leads`
  ADD CONSTRAINT `leads_ibfk_1` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
