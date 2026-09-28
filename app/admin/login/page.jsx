import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../lib/admin-auth";
import AdminLogin from "../../../components/admin/AdminLogin";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email) redirect("/admin");
  return <AdminLogin />;
}