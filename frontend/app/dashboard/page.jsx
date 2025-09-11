import { cookies } from "next/headers";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";

export default async function Page() {
  let user = null;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.warn("[Page] No token in cookies");
    } else {
      let res;
      try {
        res = await fetch("http://localhost:5000/api/v1/users/profile", {
          method: "GET",
          headers: { Cookie: `token=${token}` },
          cache: "no-store",
        });
      } catch (networkErr) {
        console.error("[Page] Network error fetching profile:", networkErr);
      }

      if (res && res.ok) {
        try {
          user = await res.json();
        } catch (parseErr) {
          console.error("[Page] Failed to parse user JSON:", parseErr);
        }
      } else if (res) {
        console.warn("[Page] Profile fetch failed, status:", res.status);
      }
    }
  } catch (err) {
    console.error("[Page] Unexpected error:", err);
  }

  // Optional: log user for debugging
  if (user) {
    console.log("[Page] Authenticated user:", user);
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
