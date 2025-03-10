import {
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
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
export const LineVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart data={data}>
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

        <Line
          dot={false}
          dataKey="income"
          stroke="#3482f6"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
        <Line
          dot={false}
          dataKey="expenses"
          stroke="#f43f5e"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
