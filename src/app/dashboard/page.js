"use client";
import styles from "./dashboardStyles.module.css";
import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaHome,
  FaChartBar,
  FaClipboardList,
  FaMoneyBillWave,
  FaStar,
  FaCog,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import Image from "next/image";
import DailyStat from "@/components/daily-stats";
import SalesAnalytics from "@/components/analytics";
import SalesByCategory from "@/components/pie-chart";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        className={styles.sidebar}
        backgroundColor="#036666"
      >
        <div className={styles.menuType}>
          <div className={styles.menuTypeText}>Menu</div>
        </div>
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0 || level === 1) {
                return {
                  backgroundColor: level ? "#335B8C !important" : null,
                  "&:hover": {
                    backgroundColor: "#335B8C !important",
                    color: "white !important",
                    opacity: "0.9 !important",
                  },
                };
              }
            },
          }}
          iconShape="circle"
        >
          <MenuItem icon={<FaHome />} onClick={() => setCollapsed(!collapsed)}>
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<FaChartBar />}
            onClick={() => router.push("/products")}
          >
            Products
          </MenuItem>
          <SubMenu label="Orders" icon={<FaClipboardList />}>
            <MenuItem icon={<FaUser />} onClick={() => router.push("/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => router.push("/preferences")}>
              Preferences
            </MenuItem>
          </SubMenu>
          <MenuItem
            icon={<FaMoneyBillWave />}
            onClick={() => router.push("/sales")}
          >
            Sales
          </MenuItem>
          <MenuItem icon={<FaStar />} onClick={() => router.push("/reviews")}>
            Reviews
          </MenuItem>

          <div className={styles.menuDivider} />

          <div className={styles.menuType}>
            <div className={styles.menuTypeText}>Other</div>
          </div>

          <MenuItem icon={<FaCog />}>Settings</MenuItem>
          <MenuItem
            icon={<FaSignOutAlt />}
            onClick={() => router.push("/login")}
          >
            Logout
          </MenuItem>

          <div
            className={styles.goProImageContainer}
            style={collapsed ? { display: "none" } : null}
          >
            <Image
              src="/images/go-pro.jpg"
              alt="Menu"
              height={180}
              width={180}
              unoptimized
              onClick={() => setCollapsed(!collapsed)}
              style={{ cursor: "pointer", borderRadius: "2rem" }}
            />
          </div>
        </Menu>
      </Sidebar>

      <main
        className={`${styles.mainContent} ${
          collapsed ? styles.mainContentCollapsed : styles.mainContentExpanded
        }`}
      >
        <div className={styles.dashboardHeader}>
          <Image
            src="/icons/menu-icon.svg"
            alt="Menu"
            height={40}
            width={40}
            unoptimized
            onClick={() => setCollapsed(!collapsed)}
            style={{ cursor: "pointer" }}
          />
          Dashboard
        </div>
        <div className={styles.dailyStatsSection}>
          <DailyStat title="Today's Revenue" />
          <DailyStat title="Today's Visitors" />
          <DailyStat title="Today's Transactions" />
          <DailyStat title="Today's Products" />
        </div>
        <div className={styles.salesSection}>
          <SalesAnalytics title="Sales Analytics" color="#FF8548" />
          <SalesByCategory />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
