"use client";

import { useState } from "react";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { ChevronDown } from "lucide-react";

import qs from "query-string";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { cn, formatDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

export const DateFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();
  const accountId = params.get("accountId");
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
    accountId,
  };

  const [selectedRange, setSelectedRange] = useState<
    DateRange | undefined
  >(paramState);

  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      from: format(
        dateRange?.from || defaultFrom,
        "yyyy-MM-dd"
      ),
      to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    router.push(url);
  };

  const onReset = () => {
    setSelectedRange(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          disabled={false}
          variant={"outline"}
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
        >
          <span>{formatDateRange(paramState)}</span>

          <ChevronDown className="size-4 ml-2 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="lg:w-auto w-full p-0"
        align="start"
      >
        <Calendar
          disabled={false}
          initialFocus
          mode="range"
          defaultMonth={selectedRange?.from}
          selected={selectedRange}
          onSelect={setSelectedRange}
          numberOfMonths={2}
        />

        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverClose asChild>
            <Button
              className="w-full"
              variant="outline"
              disabled={
                !selectedRange?.from || !selectedRange?.to
              }
              onClick={onReset}
            >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              className="w-full"
              disabled={
                !selectedRange?.from || !selectedRange?.to
              }
              onClick={() => pushToUrl(selectedRange)}
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
