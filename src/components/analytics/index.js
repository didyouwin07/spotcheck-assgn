import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import styles from "./analyticsStyles.module.css";

const generateSalesData = (type) => {
  let data = [];
  const today = new Date();

  let range = type === "week" ? 7 : type === "month" ? 30 : 365;

  for (let i = range - 1; i >= 0; i--) {
    let date = new Date();
    date.setDate(today.getDate() - i);

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      sales: Math.floor(Math.random() * 100) + 10,
    });
  }
  return data;
};

export default function SalesAnalytics({ color = "#FF8548", title="Sales Analytics" }) {
  const [timeRange, setTimeRange] = useState("week");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateSalesData(timeRange));
  }, [timeRange]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleText}>{title}</div>
        <select
          className={styles.dropdown}
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value, name, props) => [`$${value}`]} />
          <Area type="monotone" dataKey="sales" stroke={color} fill="url(#colorSales)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
