CREATE TABLE "membership_registrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"registration" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);