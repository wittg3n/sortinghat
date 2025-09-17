"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Shield, Users, Rocket } from "lucide-react";
import {
  PricingTable,
  PricingTableBody,
  PricingTableHeader,
  PricingTableHead,
  PricingTableRow,
  PricingTableCell,
  PricingTablePlan,
} from "@/components/ui/pricing-table";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-20">
      <div
        className={cn(
          "absolute inset-0 z-[-10] size-full max-h-102 opacity-50",
          "[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]"
        )}
        style={{
          backgroundImage:
            "radial-gradient(var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1
          className={cn(
            "text-3xl leading-tight font-bold text-balance sm:text-5xl"
          )}
        >
          {"Lighting Fast "}
          <i className="bg-gradient-to-r from-violet-500 via-violet-400 to-fuchsia-400 bg-clip-text font-serif font-extrabold text-transparent drop-shadow-[0_0_18px_rgba(167,139,250,0.55)]">
            {"Design Systems"}
          </i>
          <br />
          {"with "}
          <i className="bg-gradient-to-r from-violet-500 via-fuchsia-400 to-indigo-400 bg-clip-text font-serif font-extrabold text-transparent drop-shadow-[0_0_22px_rgba(167,139,250,0.75)]">
            {"Figr Identity"}
          </i>
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-pretty">
          Deploy Consistent Designs Faster With Figr’s AI solutions.
        </p>
      </div>
      <Default />
    </div>
  );
}

function Default() {
  return (
    <PricingTable className="mx-auto my-5 max-w-5xl">
      <PricingTableHeader>
        <PricingTableRow>
          <th />
          <th className="p-1">
            <PricingTablePlan
              name="Solo"
              badge="For Freelancers"
              price="$29"
              compareAt="$59"
              icon={Shield}
            >
              <Button variant="outline" className="w-full rounded-lg" size="lg">
                Get Started
              </Button>
            </PricingTablePlan>
          </th>
          <th className="p-1">
            <PricingTablePlan
              name="teams"
              badge="For Growing Teams"
              price="$99"
              compareAt="$139"
              icon={Users}
              className="after:pointer-events-none after:absolute after:-inset-0.5 after:rounded-[inherit] after:bg-gradient-to-b after:from-violet-500/15 after:to-transparent after:blur-[2px]"
            >
              <Button
                className="w-full rounded-lg border-violet-700/60 bg-violet-600/80 text-white hover:bg-violet-600"
                size="lg"
              >
                Get Started
              </Button>
            </PricingTablePlan>
          </th>
          <th className="p-1">
            <PricingTablePlan
              name="scale"
              badge="For Large Teams"
              price="$239"
              compareAt="$299"
              icon={Rocket}
            >
              <Button variant="outline" className="w-full rounded-lg" size="lg">
                Get Started
              </Button>
            </PricingTablePlan>
          </th>
        </PricingTableRow>
      </PricingTableHeader>
      <PricingTableBody>
        {FEATURES.map((feature, index) => (
          <PricingTableRow key={index}>
            <PricingTableHead>{feature.label}</PricingTableHead>
            {feature.values.map((value, idx) => (
              <PricingTableCell key={idx}>{value}</PricingTableCell>
            ))}
          </PricingTableRow>
        ))}
      </PricingTableBody>
    </PricingTable>
  );
}

export const FEATURES = [
  { label: "Members", values: ["1", "Up to 5", "Unlimited"] },
  { label: "Workspaces", values: ["1", "Up to 3", "Unlimited"] },
  { label: "Guests", values: [true, true, true] },
  { label: "Live collaboration", values: [false, true, true] },
  { label: "Integrations of sub-brands", values: [false, true, true] },
  {
    label: "Asset library",
    values: ["50 assets", "500 assets", "Unlimited assets"],
  },
  {
    label: "Export files",
    values: ["PNG only", "PNG, PDF, MP4", "PNG, PDF, MP4, JPEG"],
  },
  {
    label: "Multiple dimensions",
    values: ["1:1", "1:1 and 9:16", "All ratios & custom sizes"],
  },
  { label: "Integrations & planning tools", values: [false, true, true] },
  { label: "Dedicated account manager", values: [false, false, true] },
  { label: "Access to help center", values: [true, true, true] },
  {
    label: "Priority support",
    values: [false, "Business hours", "24/7 priority"],
  },
  { label: "Brand kit & custom colors", values: [false, true, true] },
  { label: "Advanced analytics", values: [false, true, true] },
  { label: "Storage space", values: ["1 GB", "20 GB", "1 TB"] },
  { label: "User roles & permissions", values: [false, true, true] },
  { label: "Custom integrations (API access)", values: [false, false, true] },
  { label: "White-label option", values: [false, false, true] },
  {
    label: "Training & onboarding sessions",
    values: [false, "1 session", "Unlimited sessions"],
  },
];
