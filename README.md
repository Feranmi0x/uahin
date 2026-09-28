Upliftment Against Hunger Initiative NG (UAHIN)

A modern humanitarian website for Upliftment Against Hunger Initiative NG (UAHIN), focused on documenting the organization’s work, supporting communities facing hunger, and making it easy for people to contribute.

Built With
	•	Next.js
	•	React
	•	Tailwind CSS
	•	shadcn/ui
	•	Neon PostgreSQL
	•	Drizzle ORM
	•	Paystack

Features
	•	Organization and impact pages
	•	Humanitarian stories
	•	Supporters and projects
	•	Image gallery
	•	Community signup
	•	Online donations via Paystack
	•	Admin and database-backed content

Development

npm install
npm run dev

Create a .env.local file with the required database and payment environment variables before running the application.

Admin Setup

The admin dashboard uses Auth.js credentials with an eight-hour signed session. Configure these environment variables in your local environment or deployment secret manager; never commit their values:

- `ADMIN_EMAIL`: the single authorized administrator email address.
- `ADMIN_PASSWORD_HASH`: a scrypt hash created by the command below.
- `NEXTAUTH_SECRET`: a high-entropy random secret (generate with `openssl rand -base64 32`).
- `NEXTAUTH_URL`: the canonical application origin, for example `https://www.uahin.org` in production.

To create a password hash without putting the password in shell history:

```sh
read -s -p "Admin password: " ADMIN_PASSWORD
printf '\n'
printf '%s' "$ADMIN_PASSWORD" | npm run admin:hash-password
unset ADMIN_PASSWORD
```

Store the emitted `salt:hash` value as `ADMIN_PASSWORD_HASH` in your secret manager. Admin registration does not exist; credentials must be provisioned by an operator.

The membership-registration table is an additive SQL migration in `drizzle/0002_membership_registrations.sql`. Check the target database's migration history before using `npm run db:migrate`. For a pre-existing database without a Drizzle migration ledger, apply this single additive migration once through the database's SQL console; do not replay the baseline migrations. The dashboard reports this section as unavailable until that table exists.

License

Developed for Upliftment Against Hunger Initiative NG (UAHIN).
