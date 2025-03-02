import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaWallet, FaUser, FaDownload, FaShoppingBag } from "react-icons/fa";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import styles from "./dailyStatsStyles.module.css";

const generateRandomData = () => {
  let data = [];
  for (let i = 1; i <= 10; i++) {
    data.push({
      day: `Day ${i}`,
      revenue: Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000,
    });
  }
  return data;
};

export default function DailyStat({ title = "Today's Revenue" }) {
  const [data, setData] = useState([]);
  const [currentRevenue, setCurrentRevenue] = useState(0);
  const [yesterdayRevenue, setYesterdayRevenue] = useState(0);

  useEffect(() => {
    const randomData = generateRandomData();
    setData(randomData);
    setCurrentRevenue(randomData[9].revenue);
    setYesterdayRevenue(randomData[8].revenue);
  }, []);

  const TitleIcon = () => {
    if(title === "Today's Revenue"){
        return <FaWallet style={{ color: "white", fontSize: "15px" }} />
    }else if(title === "Today's Visitors"){
        return <FaUser style={{ color: "white", fontSize: "15px" }} />
    }else if(title === "Today's Transactions"){
        return <FaDownload style={{ color: "white", fontSize: "15px" }} />
    }else{
        return <FaShoppingBag style={{ color: "white", fontSize: "15px" }} />
    }
  }

  const percentChange =
    ((currentRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;

  const isProfit = percentChange >= 0;
  const fillColor = isProfit ? "#28a745" : "#dc3545";


  return (
    <div className={styles.wrapper}>
      <div className={styles.aboutSection}>
        <div
          style={{
            backgroundColor: "#007bff",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          <TitleIcon />
        </div>
        <span>{title}</span>
      </div>

      <div className={styles.bodySection}>
        <div className={styles.todaysNumber}>${currentRevenue.toLocaleString()}</div>
        <ResponsiveContainer width="100%" height={100}>
          <AreaChart data={data}>
            <XAxis dataKey="day" hide />
            <YAxis hide />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={fillColor} 
              fill={fillColor} 
              fillOpacity={0.3}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.changeSection}>
        <span className={isProfit ? styles.positive : styles.negative}>
          {isProfit ? <FiTrendingUp /> : <FiTrendingDown />}{" "}
          {percentChange.toFixed(2)}%
        </span>
        <div>vs yesterday</div>
      </div>
    </div>
  );
}
