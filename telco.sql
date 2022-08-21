-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2022 at 03:31 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `telco`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_08_18_074445_create_roles_table', 1),
(6, '2022_08_18_074751_create_permissions_table', 1),
(7, '2022_08_18_075652_create_outlets_table', 1),
(8, '2022_08_18_090926_create_outlet_activities_table', 1),
(9, '2022_08_18_091034_create_outlet_activity_images_table', 1),
(10, '2022_08_18_172647_create_permission_role_table', 1),
(11, '2022_08_18_172731_create_role_user_table', 1),
(12, '2016_06_01_000001_create_oauth_auth_codes_table', 2),
(13, '2016_06_01_000002_create_oauth_access_tokens_table', 2),
(14, '2016_06_01_000003_create_oauth_refresh_tokens_table', 2),
(15, '2016_06_01_000004_create_oauth_clients_table', 2),
(16, '2016_06_01_000005_create_oauth_personal_access_clients_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'Cxzg9VqGcVIAVbZdyWnD9OfKbZd5ZD0SIPZRopRV', NULL, 'http://localhost', 1, 0, 0, '2022-08-19 13:55:24', '2022-08-19 13:55:24'),
(2, NULL, 'Laravel Password Grant Client', 'bqiyodcsxy8MmQbvR9O2Nltyqsmv5ApidGqYwiK9', 'users', 'http://localhost', 0, 1, 0, '2022-08-19 13:55:24', '2022-08-19 13:55:24');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2022-08-19 13:55:24', '2022-08-19 13:55:24');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `outlets`
--

CREATE TABLE `outlets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `longitude` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `outlets`
--

INSERT INTO `outlets` (`id`, `name`, `latitude`, `longitude`, `created_at`, `updated_at`) VALUES
(1, 'Muhammad pur', '23.7542', '90.3625', NULL, NULL),
(2, 'Dhanmondi 32', '23.7519', '90.3777', NULL, NULL),
(3, 'kolabagan', '23.7504611', '90.3842249', NULL, NULL),
(4, 'Dhanmondi 27', '23.7562', '90.3755', '2022-08-19 12:56:06', '2022-08-19 12:56:06'),
(5, 'Mogbazar', '23.750168', '90.408769', '2022-08-21 05:56:39', '2022-08-21 05:56:39');

-- --------------------------------------------------------

--
-- Table structure for table `outlet_activities`
--

CREATE TABLE `outlet_activities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `outlet_id` int(10) UNSIGNED NOT NULL,
  `visit_date` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `outlet_activities`
--

INSERT INTO `outlet_activities` (`id`, `outlet_id`, `visit_date`, `created_at`, `updated_at`) VALUES
(1, 1, '2022-08-16 19:26:22', NULL, NULL),
(2, 2, '2022-08-18 19:26:22', NULL, NULL),
(3, 3, '2022-08-17 19:26:22', NULL, NULL),
(4, 3, '2022-08-15 19:26:22', NULL, NULL),
(5, 4, '2022-08-07 19:26:22', NULL, NULL),
(6, 3, '2022-08-14 19:26:22', NULL, NULL),
(7, 2, '2022-08-18 19:26:22', NULL, NULL),
(8, 3, '2022-08-16 19:26:22', NULL, NULL),
(9, 2, '2022-08-16 19:26:22', NULL, NULL),
(10, 2, '2022-08-15 19:26:22', NULL, NULL),
(11, 4, '2022-08-18 19:26:22', NULL, NULL),
(12, 1, '2022-08-19 19:26:22', NULL, NULL),
(13, 4, '2022-08-19 19:26:22', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `outlet_activity_images`
--

CREATE TABLE `outlet_activity_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `outle_activity_id` bigint(20) UNSIGNED NOT NULL,
  `outlet_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `outlet_activity_images`
--

INSERT INTO `outlet_activity_images` (`id`, `outle_activity_id`, `outlet_image`, `created_at`, `updated_at`) VALUES
(1, 12, 'laptop (2).png', NULL, NULL),
(2, 13, 'laptop (2).png', NULL, NULL),
(3, 4, 'laptop (4).png', NULL, NULL),
(4, 1, 'laptop (4).png', NULL, NULL),
(5, 7, 'camera (4).png', NULL, NULL),
(6, 10, 'camera (3).png', NULL, NULL),
(7, 8, 'laptop (3).png', NULL, NULL),
(8, 3, 'laptop (2).png', NULL, NULL),
(9, 8, 'laptop (4).png', NULL, NULL),
(10, 10, 'camera (3).png', NULL, NULL),
(11, 12, 'camera (4).png', NULL, NULL),
(12, 8, 'laptop (2).png', NULL, NULL),
(13, 5, 'camera (3).png', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `title`, `created_at`, `updated_at`) VALUES
(1, 'user_permission', NULL, NULL),
(2, 'role_permisson', NULL, NULL),
(3, 'outlets_permission', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`id`, `role_id`, `permission_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 1, 2, NULL, NULL),
(3, 1, 3, NULL, NULL),
(4, 2, 1, NULL, NULL),
(5, 2, 2, NULL, NULL),
(6, 4, 1, NULL, NULL),
(7, 4, 2, NULL, NULL),
(8, 4, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `title`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', NULL, NULL),
(2, 'Admin', NULL, NULL),
(3, 'Field User', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`id`, `role_id`, `user_id`, `created_at`, `updated_at`) VALUES
(2, 3, 2, NULL, NULL),
(3, 3, 12, NULL, NULL),
(4, 3, 22, NULL, NULL),
(5, 1, 23, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Alfreda Gleason', 'barton.crist@example.org', '2022-08-19 03:54:48', '$2y$10$9jCI2coRfEK/6r6g6LDms.Z4aVkPjN4r2w.FPjRUK41RcVcZbYU7q', 'XVm8R2ibci', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(3, 'Prof. Meagan Stroman', 'vohara@example.org', '2022-08-19 03:54:48', '$2y$10$jpWnu6rQFB8sUL/B3Ddhi.62usSg4icrYMwquB5S1UFg9AWqblnm2', 'CoqP7MylHy', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(4, 'Gus O\'Reilly', 'luettgen.jimmy@example.org', '2022-08-19 03:54:48', '$2y$10$48jlAZ/KfoCeLNxlgSeL9ODXrmgdOraOIUY5ntJ8X4hf8QhV3vfCu', 'joHo4QBQgF', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(5, 'Mr. Lourdes Pfeffer PhD', 'zwuckert@example.com', '2022-08-19 03:54:48', '$2y$10$6WkTLA/f082qrYeCf9EXiOIsrt10EpQyOV1i2LBN.kP4o/k2KL7Gu', 'uY5tF39hYP', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(6, 'Ottilie Raynor III', 'colten.bergstrom@example.org', '2022-08-19 03:54:48', '$2y$10$Sdjqy1FXnMCzoONz5bFpo.L695mRlhk17bZAm0okomANnrGf4kPWW', '2hlI2kmPHr', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(7, 'Federico Feil II', 'flegros@example.org', '2022-08-19 03:54:49', '$2y$10$Pn4v7tJorCzp2I9Ji2WMZeqPBHEjcG5bukDJsAQDUGzW9NNk0RJeu', 'PKTAuAVSr8', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(8, 'Dr. Tamara Stiedemann PhD', 'oswift@example.org', '2022-08-19 03:54:49', '$2y$10$708qJq9q9fl2U5k3iAEi6.CF7kk8KlUOjoVOoRAvzgW1ExFTxaVQu', 'PHiS8uhmvE', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(9, 'Maritza Monahan', 'charlene.franecki@example.org', '2022-08-19 03:54:49', '$2y$10$4.p8B7h9hnlfcRUL5RguJOXm4Ng1Kwa41rlF/ei9zW0Q0lzZLBIYa', 'PI73hQ48SI', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(10, 'Prof. Jeramy Spencer Sr.', 'west.vincenza@example.org', '2022-08-19 03:54:49', '$2y$10$2lvXEhg0XvWUJt9ZW0aZYuIZOpB2Mh.XX.yDMHLUOnkPny4BwXBUG', 'OqjGqlu4yy', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(12, 'Dr. Harvey Zieme', 'ted.greenholt@example.net', '2022-08-19 03:54:49', '$2y$10$0cJvL4WL/dvCuk/Hihi2P.ua9/bnTem3K3iqgKQ75.S4RJYO5X3Mu', '6DjKKVcDii', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(13, 'Octavia Kerluke III', 'runolfsdottir.kianna@example.org', '2022-08-19 03:54:49', '$2y$10$2zKMvjK.6lD8GS4q5x7IieXdIJvwELAOe2mw.mArxeIIENYc87Qv.', 'sYxDFrcb6S', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(14, 'Malachi Hackett', 'marks.lucas@example.org', '2022-08-19 03:54:49', '$2y$10$IFa7LpdjHmX.NaWHUtp/oOxWY/wCelAO5hhgcVHscWbS7MvQXj8tq', '22E21PoeYH', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(15, 'Dr. Clotilde Towne', 'retta93@example.org', '2022-08-19 03:54:49', '$2y$10$B9o.2S/nH4Ubu6MOEAWKZeIJRPZWKA/p4.tLZouv8lsTbuUy.qSSi', 'R7iOaeVPKO', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(16, 'Ms. Maeve Tillman III', 'stanford80@example.net', '2022-08-19 03:54:49', '$2y$10$7tKQE4SEwaD1aMdyy5HUB.Vzf6R91CJXrSMowyiuwO226iKGrBEpa', 'I2ccAI5eI1', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(17, 'Jonatan Blick', 'elisa.gusikowski@example.com', '2022-08-19 03:54:49', '$2y$10$H26PjoCvdEbnRPDLSlPdk.iM39.BV1htAq5LKgyd.dY89rOoDowNu', 'ZQYCP935et', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(18, 'Dr. Joaquin White', 'leannon.helen@example.net', '2022-08-19 03:54:49', '$2y$10$qthxSLFt.EliC0pR/HITr.CxGxDxFHcPa13.zWtTKR7O9mp/sRlua', 'ByhTaIfqAh', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(19, 'Khalil Hyatt', 'eryn48@example.net', '2022-08-19 03:54:50', '$2y$10$5fqvzY5mk1v7xkMLvXg/jumIwMQNgwC/VQaZ1o9IQ09LU6mTnw48m', 'LhsluCDQfp', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(20, 'Damian Schultz', 'bailey.giovanny@example.org', '2022-08-19 03:54:50', '$2y$10$6kqo6nhLCfyJY0mYYOFItuuDkjMCBW41Y7ECf6xoJUlvz7pPCj8IS', 'IGAMfLHS1D', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(21, 'Nella Olson', 'kole.nienow@example.org', '2022-08-19 03:54:50', '$2y$10$gxVtbStKFWwVV39F4qGl2OojpOlWVWHCQs1KSUF1DrnFxaaNjdt/O', 'N6fjp9Tqzg', '2022-08-19 03:54:50', '2022-08-19 03:54:50'),
(22, 'jakirkhan', 'jakirkhan@gmail.com', NULL, '$2y$10$hJtuZSHmYvvV9spnU7zfjuQ1CJ7aApgY9jiD7ntc6BFIsv//vy/ni', NULL, '2022-08-19 07:39:16', '2022-08-19 07:39:16'),
(23, 'nooralamkhan', 'nooralam@gmail.com', NULL, '$2y$10$8Fm.f64WEnZg5NCJiSk5eellZqp0CLhYl.lkxG1WVnBnfELlyKBGG', NULL, '2022-08-19 07:40:16', '2022-08-19 23:35:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `outlets`
--
ALTER TABLE `outlets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `outlet_activities`
--
ALTER TABLE `outlet_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `outlet_activity_images`
--
ALTER TABLE `outlet_activity_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `outlets`
--
ALTER TABLE `outlets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `outlet_activities`
--
ALTER TABLE `outlet_activities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `outlet_activity_images`
--
ALTER TABLE `outlet_activity_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `permission_role`
--
ALTER TABLE `permission_role`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `role_user`
--
ALTER TABLE `role_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
