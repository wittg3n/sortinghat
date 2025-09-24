import { cookies } from "next/headers";
import ProfilePageClient from "./profilePageClient";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return <ProfilePageClient token={token} />;
}
