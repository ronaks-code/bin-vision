import React from "react";
import { Link } from "react-router-dom";
import { MdHome, MdEqualizer } from "react-icons/md";
import styles from "./Sidebar.module.css";

const iconsMap = {
  home: <MdHome size={24} color="#FFF" className={styles.sidebarItemIcon} />,
  equalizer: (
    <MdEqualizer size={24} color="#FFF" className={styles.sidebarItemIcon} />
  ),
  // Add other icons similarly...
};

const MenuItem = ({ icon, text, to, isHovered, gradientColors }) => (
  <div className={styles.sidebarItem}>
    {iconsMap[icon]}
    <Link to={to} className={styles.sidebarItemText}>
      {text}
    </Link>
  </div>
);

export default MenuItem;
