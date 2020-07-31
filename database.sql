-- DECIDE WHAT OUR DATABASE WILL BE CALLED: legacy_children_foundation

CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
    "student_id" int,
    "admin_id" int,
    "email" varchar,
    "password" varchar,
    "role" varchar,
    
    
);

CREATE TABLE "admin" (
	"id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (80) not null,
    "last_name" VARCHAR (80) not null,
    "email" VARCHAR (320) UNIQUE NOT NULL, --64 chars for local part, +@+255 for domain
    "password" VARCHAR (1000) NOT NULL,
    "created_at" DATE DEFAULT NOW(), --set default to today's date
    "role" varchar
);

CREATE TABLE "student" (
	"id" SERIAL PRIMARY KEY,
	"lcf_id" int,
    "first_name" VARCHAR (80) not null,
    "last_name" VARCHAR (80) not null,
    "school_id" int,
    "grade" varchar,
    "grad_year" DATE,
    "school_attend" varchar,
    "student_email" varchar NOT NULL,
    "pif_amount" decimal,
    "password" VARCHAR (1000) NOT NULL,
    "created_at" DATE DEFAULT NOW(), --set default to today's date
    "lcf_start_date" DATE,
    "role" varchar,
    "last_login" DATE
);


CREATE TABLE "entry" (
  "id" SERIAL PRIMARY KEY,
  "student_id" int,
  "pay_day" DATE,
  "date_submitted" DATE,
  "pass_class" varchar,
  "gpa" int,
  "clean_attend" int,
  "detent_hours" varchar,
  "act_or_job" varchar,
  "passed_ua" varchar,
  "current_service_hours" int,
  "hw_rm_attended" varchar,
  "strikes" int,
  "inactive" varchar,
  "comments" varchar,
  "new_charge" int,
  "reason_for_charge" varchar,
  "balance_to_pay" int,
  "check_this_payday" varchar,
  "gpa_bonus" int,
  "total" int,
  "amt_to_savings" int,
  "pif_donations" int,
  "deduction_amount" int,
  "deduction_comments" varchar,
  "bonus_amount" int,
  "bonus_comments" varchar,
  "money_to_student" int
);

INSERT INTO "admin" ("first_name","last_name","email","password","created_at","role")
VALUES ('Mary', 'Dehne', 'legacychildrensfoundation@gmail.com', 'legacy', '07/30/20', 'admin');