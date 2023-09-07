CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(256),
	"created_at" timestamp DEFAULT now(),
	"email" varchar(256),
	"password" varchar(256),
	"deleted" boolean DEFAULT false
);
