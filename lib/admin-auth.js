import "server-only";
import { scryptSync, timingSafeEqual } from "node:crypto";
import CredentialsProvider from "next-auth/providers/credentials";

function verifyPassword(password, encodedHash) {
  const [salt, storedHex] = String(encodedHash || "").split(":");
  if (!salt || !/^[a-f0-9]{128}$/i.test(storedHex || "")) return false;
  const storedHash = Buffer.from(storedHex, "hex");
  const candidateHash = scryptSync(password, salt, storedHash.length);
  return timingSafeEqual(storedHash, candidateHash);
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "UAHIN administrator",
      credentials: {
        email: { label: "Admin email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (!adminEmail || !passwordHash || !email || !password) return null;
        if (email !== adminEmail || !verifyPassword(password, passwordHash)) return null;

        return { id: adminEmail, name: "UAHIN Admin", email: adminEmail };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/admin/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};