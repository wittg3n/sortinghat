import { cookies } from "next/headers";
import ProfileClient from "./profile";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return <ProfileClient token={token} />;
}
