CREATE TABLE `locations` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`metrics` blob,
	`enabled` integer DEFAULT 1 NOT NULL,
	`created_at` text DEFAULT current_timestamp NOT NULL,
	`updated_at` text DEFAULT current_timestamp NOT NULL
);
