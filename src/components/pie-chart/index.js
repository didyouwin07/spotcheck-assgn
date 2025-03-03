import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import styles from "./pieChartStyles.module.css";

const COLORS = ["#007bff", "#28a745", "#ffcc00", "#dc3545", "#17a2b8"];

const generateCategoryData = (timeframe) => {
  const categories = ["Clothing", "Lingerie and Nightwear",  "Bodyfit", "Sportswear", "Accessories"];
  return categories.map((category, index) => ({
    name: category,
    value: Math.floor(Math.random() * (timeframe === "Year" ? 5000 : timeframe === "Month" ? 1000 : 300)) + 100,
    color: COLORS[index],
  }));
};

export default function SalesByCategory() {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState("Week");

  useEffect(() => {
    setData(generateCategoryData(timeframe));
  }, [timeframe]);

  const totalSales = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className={styles.wrapper}>
  <div className={styles.header}>
    <div className={styles.titleText}>Sales by Category</div>
    <select className={styles.dropdown} value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
      <option value="Week">Week</option>
      <option value="Month">Month</option>
      <option value="Year">Year</option>
    </select>
  </div>

  <div className={styles.content}>
    <div className={styles.chartContainer}>
      <PieChart width={220} height={220}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className={styles.totalSales}>
          ${totalSales}
        </text>
        <Tooltip />
      </PieChart>
    </div>

    <div className={styles.legend}>
      {data.map((entry, index) => {
        const percentage = ((entry.value / totalSales) * 100).toFixed(1);
        return (
          <div key={index} className={styles.legendItem}>
            <span className={styles.colorBox} style={{ backgroundColor: entry.color }}></span>
            <div className={styles.categoryInfo}>
              <span className={styles.categoryName}>{entry.name} ({percentage}%)</span>
              <span className={styles.salesValue}>{entry.value} CATEGORY PRODUCTS</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</div>
  );
}
