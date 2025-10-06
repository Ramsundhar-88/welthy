"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

export function AccountChart({ transactions }) {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    // Filter transactions within date range
    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    // Group transactions by date
    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }
      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }
      return acc;
    }, {});

    // Convert to array and sort by date
    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dateRange]);

  // Calculate totals for the selected period
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-base font-normal">
          Transaction Overview
        </CardTitle>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around mb-6 text-sm">
          <div className="text-center">
            <p className="text-muted-foreground">Total Income</p>
            <p className="text-lg font-bold text-green-500">
              ₹{totals.income.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Total Expenses</p>
            <p className="text-lg font-bold text-red-500">
              ₹{totals.expense.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Net</p>
            <p
              className={`text-lg font-bold ${
                totals.income - totals.expense >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              ₹{(totals.income - totals.expense).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="h-[300px]">
         <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredData}
            margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
          >
            {/* Grid */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />

            {/* X Axis */}
            <XAxis
              dataKey="date"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={6}
            />

            {/* Y Axis */}
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value.toLocaleString("en-IN")}`}
              width={60}
            />

            {/* Tooltip */}
            <Tooltip
              formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, undefined]}
              contentStyle={{
                backgroundColor: "#1f2937", // dark background
                border: "1px solid #374151", // slightly lighter border
                borderRadius: "6px",
                padding: "6px 10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
              itemStyle={{
                backgroundColor: "hsl(var(--popover))", // bright text
                fontSize: "0.85rem",
                margin: 0,
                lineHeight: 1.2,
              }}
              labelStyle={{
                color: "#f9fafb",
                fontSize: "0.8rem",
                margin: 0,
                lineHeight: 1,
                fontWeight: 600,
              }}
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
            />

            {/* Legend */}
            <Legend
              iconType="circle"
              wrapperStyle={{
                paddingTop: 8,
                fontSize: "0.85rem",
                color: "hsl(var(--foreground))",
              }}
            />

            {/* Bars */}
            <Bar
              dataKey="income"
              name="Income"
              fill="#10b981" // green for income
              radius={[6, 6, 0, 0]}
              barSize={32} // wider bars
            />
            <Bar
              dataKey="expense"
              name="Expense"
              fill="#ef4444" // red for expense
              radius={[6, 6, 0, 0]}
              barSize={32} // wider bars
            />
          </BarChart>
        </ResponsiveContainer>

        </div>
      </CardContent>
    </Card>
  );
}