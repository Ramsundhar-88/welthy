"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { ArrowDownRight, ArrowUpLeft } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFC107",
  "#D4A5A5",
  "#9FA8DA",
];

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  const [chartConfig, setChartConfig] = useState({
    outerRadius: 90,
    showLabels: true,
    legendFontSize: 12,
  });

  // ✅ Adjust pie chart size and label visibility dynamically
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 400) {
        setChartConfig({
          outerRadius: 55,
          showLabels: false,
          legendFontSize: 9,
        });
      } else if (width < 640) {
        setChartConfig({
          outerRadius: 65,
          showLabels: false,
          legendFontSize: 10,
        });
      } else if (width < 768) {
        setChartConfig({
          outerRadius: 75,
          showLabels: false,
          legendFontSize: 11,
        });
      } else {
        setChartConfig({
          outerRadius: 90,
          showLabels: true,
          legendFontSize: 12,
        });
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Data prep ---
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );
  
  // Get recent transactions (last 5)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
    
  // Calculate expense breakdown for current month
  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });
  
  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Format data for pie chart
  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Recent Transactions */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-4">
          <CardTitle className="text-base sm:text-lg font-normal">
            Recent Transactions
          </CardTitle>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          <div className="space-y-3 sm:space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 text-sm">
                No recent transactions
              </p>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-start sm:items-center justify-between gap-3 pb-3 border-b last:border-b-0 last:pb-0"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="text-sm font-medium leading-none truncate">
                      {transaction.description || "Untitled Transaction"}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {format(new Date(transaction.date), "PP")}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "flex items-center font-semibold text-sm sm:text-base whitespace-nowrap shrink-0",
                      transaction.type === "EXPENSE"
                        ? "text-red-500"
                        : "text-green-500"
                    )}
                  >
                    {transaction.type === "EXPENSE" ? (
                      <ArrowUpLeft className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                    ₹{transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-base sm:text-lg font-normal">
            Monthly Expense Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 md:p-6">
          {pieChartData.length === 0 ? (
            <p className="text-center text-muted-foreground py-8 text-sm">
              No expenses this month
            </p>
          ) : (
            <div className="h-[240px] xs:h-[280px] sm:h-[320px] md:h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={chartConfig.outerRadius}
                    fill="#8884d8"
                    dataKey="value"
                    label={
                      chartConfig.showLabels
                        ? ({ name, value }) => `${name}: ₹${value.toFixed(2)}`
                        : false
                    }
                    labelLine={chartConfig.showLabels}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `₹${value.toFixed(2)}`}
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      fontSize: `${chartConfig.legendFontSize}px`,
                      paddingTop: "8px",
                    }}
                    iconSize={10}
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}