import { Suspense } from "react";

import { DataTable, DataTableSkeleton } from "../components/data-table";

export default function PricingPage() {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <DataTable />
    </Suspense>
  );
}
