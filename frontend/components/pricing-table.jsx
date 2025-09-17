import React from "react";
import { CheckIcon, MinusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Utility function for className combination
const cn = (...classes) => classes.filter(Boolean).join(" ");

function PricingTable({ className, ...props }) {
  return (
    <div data-slot="table-container" className="relative w-full">
      <table className={cn("w-full text-sm", className)} {...props} />
    </div>
  );
}

function PricingTableHeader({ ...props }) {
  return <thead data-slot="table-header" {...props} />;
}

function PricingTableBody({ className, ...props }) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr]:divide-x [&_tr]:border-b", className)}
      {...props}
    />
  );
}

function PricingTableRow({ ...props }) {
  return <tr data-slot="table-row" {...props} />;
}

function PricingTableCell({ className, children, ...props }) {
  return (
    <td
      data-slot="table-cell"
      className={cn("p-4 align-middle", className)}
      {...props}
    >
      {children === true ? (
        <CheckIcon aria-hidden="true" className="size-4" />
      ) : children === false ? (
        <MinusIcon
          aria-hidden="true"
          className="text-muted-foreground size-4"
        />
      ) : (
        children
      )}
    </td>
  );
}

function PricingTableHead({ className, ...props }) {
  return (
    <th
      data-slot="table-head"
      className={cn("p-2 text-left align-middle font-medium", className)}
      {...props}
    />
  );
}

function PricingTablePlan({
  name,
  badge,
  price,
  compareAt,
  icon: Icon,
  children,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "bg-background supports-[backdrop-filter]:bg-background/40 relative h-full overflow-hidden rounded-lg border p-3 font-normal backdrop-blur-xs",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-full border p-1.5">
          {Icon && <Icon className="h-3 w-3" />}
        </div>
        <h3 className="text-muted-foreground font-mono text-sm">{name}</h3>
        <Badge
          variant="secondary"
          className="ml-auto rounded-full border px-2 py-0.5 text-[10px] font-normal"
        >
          {badge}
        </Badge>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold">{price}</span>
        {compareAt && (
          <span className="text-muted-foreground text-sm line-through">
            {compareAt}
          </span>
        )}
      </div>
      <div className="relative z-10 mt-4">{children}</div>
    </div>
  );
}

// Example usage to demonstrate the fixed table
function ExamplePricingTable() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Pricing Comparison</h2>

      <PricingTable>
        <PricingTableHeader>
          <PricingTableRow>
            <PricingTableHead>Feature</PricingTableHead>
            <PricingTableHead>Free</PricingTableHead>
            <PricingTableHead>Pro</PricingTableHead>
            <PricingTableHead>Enterprise</PricingTableHead>
          </PricingTableRow>
        </PricingTableHeader>
        <PricingTableBody>
          <PricingTableRow>
            <PricingTableCell className="font-medium">Users</PricingTableCell>
            <PricingTableCell>1</PricingTableCell>
            <PricingTableCell>5</PricingTableCell>
            <PricingTableCell>Unlimited</PricingTableCell>
          </PricingTableRow>
          <PricingTableRow>
            <PricingTableCell className="font-medium">Storage</PricingTableCell>
            <PricingTableCell>5 GB</PricingTableCell>
            <PricingTableCell>100 GB</PricingTableCell>
            <PricingTableCell>Unlimited</PricingTableCell>
          </PricingTableRow>
          <PricingTableRow>
            <PricingTableCell className="font-medium">
              API Access
            </PricingTableCell>
            <PricingTableCell>{false}</PricingTableCell>
            <PricingTableCell>{true}</PricingTableCell>
            <PricingTableCell>{true}</PricingTableCell>
          </PricingTableRow>
          <PricingTableRow>
            <PricingTableCell className="font-medium">Support</PricingTableCell>
            <PricingTableCell>Community</PricingTableCell>
            <PricingTableCell>Email</PricingTableCell>
            <PricingTableCell>24/7 Phone</PricingTableCell>
          </PricingTableRow>
          <PricingTableRow>
            <PricingTableCell className="font-medium">
              Analytics
            </PricingTableCell>
            <PricingTableCell>{false}</PricingTableCell>
            <PricingTableCell>{true}</PricingTableCell>
            <PricingTableCell>{true}</PricingTableCell>
          </PricingTableRow>
        </PricingTableBody>
      </PricingTable>
    </div>
  );
}

export default ExamplePricingTable;

export {
  PricingTable,
  PricingTableHeader,
  PricingTableBody,
  PricingTableRow,
  PricingTableHead,
  PricingTableCell,
  PricingTablePlan,
};
