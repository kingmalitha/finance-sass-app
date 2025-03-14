import {
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { format } from "date-fns";

import { CustomToolTip } from "@/components/custom-tooltip";

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};
export const BarVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          dataKey="date"
          tickLine={false}
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomToolTip />} />

        <Bar
          dataKey="income"
          fill="#3482f6"
          className="drop-shadow-sm"
        />
        <Bar
          dataKey="expenses"
          fill="#f43f5e"
          className="drop-shadow-sm"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
