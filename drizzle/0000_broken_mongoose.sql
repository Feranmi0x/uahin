CREATE TABLE "subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"email" varchar(255) NOT NULL,
	"phone" varchar(30),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "subscribers_email_unique" UNIQUE("email")
);
