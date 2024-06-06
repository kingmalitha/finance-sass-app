"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { FaPiggyBank } from "react-icons/fa";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";
import {
  DataCard,
  DataCardLoading,
} from "@/components/data-card";

type Props = {};
export const DataGrid = ({}: Props) => {
  const { data, isLoading } = useGetSummary();
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const dateRangeLabel = formatDateRange({
    from,
    to,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-2 mb-8">
      <DataCard
        title={"Remaining"}
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dateRange={dateRangeLabel}
      />

      <DataCard
        title={"Income"}
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp}
        variant="success"
        dateRange={dateRangeLabel}
      />

      <DataCard
        title={"Expenses"}
        value={data?.expensesAmount}
        percentageChange={data?.expensesChange}
        icon={FaArrowTrendDown}
        variant="danger"
        dateRange={dateRangeLabel}
      />
    </div>
  );
};
