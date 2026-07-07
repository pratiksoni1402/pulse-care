CREATE TABLE `allergies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`allergy_type` enum('drug','food','environmental','other') NOT NULL,
	`allergen` varchar(150) NOT NULL,
	`allergy_severity` enum('mild','moderate','severe','anaphylactic') NOT NULL,
	`reaction` text,
	`diagnosed_at` timestamp,
	`notes` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `allergies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `disabilities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`disability_name` varchar(150) NOT NULL,
	`disability_severity` enum('mild','moderate','severe'),
	`notes` text,
	CONSTRAINT `disabilities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `family_medical_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`family_relation` enum('father','mother','brother','sister','son','daughter','grandfather','grandmother','uncle','aunt','other') NOT NULL,
	`condition_name` varchar(150) NOT NULL,
	`age_at_diagnosis` int,
	`notes` varchar(500),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `family_medical_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hospitalizations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`hospital_name` varchar(255) NOT NULL,
	`admission_date` date,
	`discharge_date` date,
	`reason` varchar(255),
	`notes` text,
	CONSTRAINT `hospitalizations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `immunizations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`vaccine_name` varchar(150) NOT NULL,
	`administered_date` date,
	`next_due_date` date,
	`dose_number` int,
	`healthcare_provider` varchar(150),
	`facility_name` varchar(255),
	`lot_number` varchar(100),
	`is_booster` boolean NOT NULL DEFAULT false,
	`notes` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `immunizations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lifestyle_info` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`smoking_status` enum('never','former','current') DEFAULT 'never',
	`smoking_frequency` varchar(100),
	`alcohol_consumption` enum('never','occasionally','weekly','daily') DEFAULT 'never',
	`exercise_frequency` enum('none','1_2_times_week','3_5_times_week','daily'),
	`diet_type` enum('vegetarian','non_vegetarian','vegan','eggetarian','other'),
	`dietary_restrictions` text,
	`average_sleep_hours` int,
	`sleep_notes` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lifestyle_info_id` PRIMARY KEY(`id`),
	CONSTRAINT `lifestyle_info_patient_id_unique` UNIQUE(`patient_id`)
);
--> statement-breakpoint
CREATE TABLE `medical_conditions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`condition_name` varchar(150) NOT NULL,
	`diagnosed_date` timestamp,
	`condition_status` enum('active','resolved','managed') DEFAULT 'active',
	`notes` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `medical_conditions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `medications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`medicine_name` varchar(200) NOT NULL,
	`dosage` varchar(100) NOT NULL,
	`frequency` varchar(100) NOT NULL,
	`prescribing_doctor` varchar(150),
	`start_date` date,
	`is_ongoing` boolean NOT NULL DEFAULT true,
	`end_date` date,
	`purpose` varchar(255),
	`notes` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `medications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mental_health_info` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`diagnosis` varchar(255),
	`receiving_therapy` boolean NOT NULL DEFAULT false,
	`therapist_name` varchar(150),
	`counseling_frequency` varchar(100),
	`medications` text,
	`notes` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mental_health_info_id` PRIMARY KEY(`id`),
	CONSTRAINT `mental_health_info_patient_id_unique` UNIQUE(`patient_id`)
);
--> statement-breakpoint
CREATE TABLE `ongoing_treatments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`treatment_name` varchar(200) NOT NULL,
	`start_date` date,
	`expected_end_date` date,
	`physician` varchar(150),
	`notes` text,
	CONSTRAINT `ongoing_treatments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `patient_vitals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`height_cm` decimal(5,2) NOT NULL,
	`weight_kg` decimal(5,2) NOT NULL,
	`bmi` decimal(4,1),
	`systolic_bp` int NOT NULL,
	`diastolic_bp` int NOT NULL,
	`resting_heart_rate` int,
	`body_temperature_c` decimal(4,1),
	`recorded_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `patient_vitals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `patients` (
	`id` varchar(36) NOT NULL,
	`full_name` varchar(150) NOT NULL,
	`date_of_birth` date NOT NULL,
	`gender` enum('male','female','other','prefer_not_to_say') NOT NULL,
	`blood_group` enum('A+','A-','B+','B-','AB+','AB-','O+','O-','unknown') DEFAULT 'unknown',
	`phone` varchar(20) NOT NULL,
	`email` varchar(255),
	`address` varchar(500),
	`emergency_contact_name` varchar(150),
	`emergency_contact_relation` varchar(50),
	`emergency_contact_phone` varchar(20),
	`preferred_language` varchar(50) DEFAULT 'English',
	`marital_status` enum('single','married','divorced','widowed','separated','prefer_not_to_say') DEFAULT 'prefer_not_to_say',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `patients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reproductive_health` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`pregnancy_status` enum('not_pregnant','pregnant','postpartum','unknown','not_applicable') DEFAULT 'not_applicable',
	`expected_delivery_date` date,
	`last_menstrual_period` date,
	`menstrual_cycle_length` int,
	`menstrual_notes` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reproductive_health_id` PRIMARY KEY(`id`),
	CONSTRAINT `reproductive_health_patient_id_unique` UNIQUE(`patient_id`)
);
--> statement-breakpoint
CREATE TABLE `surgical_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`patient_id` varchar(36) NOT NULL,
	`surgery_name` varchar(200) NOT NULL,
	`surgery_date` date,
	`hospital_name` varchar(255),
	`surgeon_name` varchar(150),
	`notes` text,
	CONSTRAINT `surgical_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `allergies` ADD CONSTRAINT `allergies_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `disabilities` ADD CONSTRAINT `disabilities_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `family_medical_history` ADD CONSTRAINT `family_medical_history_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hospitalizations` ADD CONSTRAINT `hospitalizations_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `immunizations` ADD CONSTRAINT `immunizations_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lifestyle_info` ADD CONSTRAINT `lifestyle_info_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `medical_conditions` ADD CONSTRAINT `medical_conditions_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `medications` ADD CONSTRAINT `medications_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `mental_health_info` ADD CONSTRAINT `mental_health_info_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ongoing_treatments` ADD CONSTRAINT `ongoing_treatments_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `patient_vitals` ADD CONSTRAINT `patient_vitals_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reproductive_health` ADD CONSTRAINT `reproductive_health_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `surgical_history` ADD CONSTRAINT `surgical_history_patient_id_patients_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `patients`(`id`) ON DELETE cascade ON UPDATE no action;