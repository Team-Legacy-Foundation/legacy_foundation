CREATE TABLE "user" (
	"id" serial NOT NULL,
	"lcf_id" integer NOT NULL,
	"admin_id" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	"last_login" DATE NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "admin" (
	"id" serial NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" DATE NOT NULL DEFAULT 'now()',
	"role" varchar(255) NOT NULL,
	CONSTRAINT "admin_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "student" (
	"id" serial NOT NULL,
	"lcf_id" integer NOT NULL UNIQUE,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"school_attend" varchar(255) NOT NULL,
	"school_id" integer,
	"student_email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"grade" integer NOT NULL,
	"grad_year" integer NOT NULL,
	"created_at" DATE NOT NULL,
	"lcf_start_date" DATE NOT NULL,
	"role" varchar(255) NOT NULL,
	"pif_amount" NUMERIC(10,2) NOT NULL,
	"balance_due" integer NOT NULL,
	CONSTRAINT "student_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "entry" (
	"id" serial NOT NULL,
	"lcf_id" integer NOT NULL,
	"pay_day" DATE NOT NULL,
	"date_submitted" DATE NOT NULL,
	"gpa" NUMERIC(10,2) NOT NULL,
	"clean_attend" integer NOT NULL,
	"pass_class" varchar(255) NOT NULL,
	"detent_hours" varchar(255) NOT NULL,
	"act_or_job" varchar(255) NOT NULL,
	"passed_ua" varchar(255) NOT NULL,
	"current_service_hours" integer NOT NULL,
	"strikes" integer NOT NULL,
	"hw_rm_attended" varchar(255) NOT NULL,
	"inactive" varchar(255) NOT NULL,
	"comments" varchar(255) NOT NULL,
	CONSTRAINT "entry_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "open_transaction" (
	"id" serial NOT NULL,
	"lcf_id" integer NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"pay_day" DATE NOT NULL,
	"date_submitted" DATE NOT NULL,
	"pass_class" varchar(255) NOT NULL,
	"gpa" NUMERIC(10,2) NOT NULL,
	"clean_attend" integer NOT NULL,
	"detent_hours" varchar(255) NOT NULL,
	"act_or_job" varchar(255) NOT NULL,
	"passed_ua" varchar(255) NOT NULL,
	"current_service_hours" integer NOT NULL,
	"hw_rm_attended" varchar(255) NOT NULL,
	"strikes" integer NOT NULL,
	"inactive" varchar(255) NOT NULL,
	"comments" varchar(255) NOT NULL,
	"attend_payment" NUMERIC(10,2) NOT NULL,
	"pif_donations" NUMERIC(10,2) NOT NULL,
	"bonus_amount" NUMERIC(10,2),
	"bonus_comments" varchar(255),
	"gpa_bonus" NUMERIC(10,2) NOT NULL,
	"amt_to_savings" NUMERIC(10,2) NOT NULL,
	"money_to_student" NUMERIC(10,2) NOT NULL,
	"total" NUMERIC(10,2) NOT NULL,
	CONSTRAINT "open_transaction_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "gpa_rates" (
	"id" serial NOT NULL,
	"gpa" NUMERIC(10,2) NOT NULL,
	"amount" NUMERIC(10,2) NOT NULL,
	CONSTRAINT "gpa_rates_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "daily_rates" (
	"id" serial NOT NULL,
	"year" integer NOT NULL,
	"amount" NUMERIC(10,2) NOT NULL,
	CONSTRAINT "daily_rates_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "charge_student" (
	"id" serial NOT NULL,
	"lcf_id" integer NOT NULL,
	"admin_id" integer NOT NULL,
	"date" DATE NOT NULL,
	"type" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"amount" NUMERIC(10,2)(255) NOT NULL,
	CONSTRAINT "charge_student_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "history" (
	"id" serial NOT NULL,
	"lcf_id" integer NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"pay_day" DATE NOT NULL,
	"date_submitted" DATE NOT NULL,
	"pass_class" varchar(255) NOT NULL,
	"gpa" NUMERIC(10,2) NOT NULL,
	"clean_attend" integer NOT NULL,
	"detent_hours" varchar(255) NOT NULL,
	"act_or_job" varchar(255) NOT NULL,
	"passed_ua" varchar(255) NOT NULL,
	"current_service_hours" integer NOT NULL,
	"hw_rm_attended" varchar(255) NOT NULL,
	"strikes" integer NOT NULL,
	"inactive" varchar(255) NOT NULL,
	"comments" varchar(255) NOT NULL,
	"attend_payment" NUMERIC(10,2) NOT NULL,
	"pif_donations" NUMERIC(10,2) NOT NULL,
	"bonus_amount" NUMERIC(10,2),
	"bonus_comments" varchar(255),
	"gpa_bonus" NUMERIC(10,2) NOT NULL,
	"amt_to_savings" NUMERIC(10,2) NOT NULL,
	"money_to_student" NUMERIC(10,2) NOT NULL,
	"total" NUMERIC(10,2) NOT NULL,
	CONSTRAINT "history_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



