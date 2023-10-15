import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose, MdMenu, MdHome, MdEqualizer } from "react-icons/md";
import MenuItem from "./MenuItem";
import styles from "./Sidebar.module.css";

const gradientColors = ["#0A0F0B", "#228B22"];

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const menuItems = [
    { icon: "home", text: "Home", to: "/" },
    { icon: "equalizer", text: "Stats", to: "Stats" },
    // ... add other items as needed
  ];

  return (
    <div className={styles.sidebarContainer}>
      <div
        className={styles.sidebar}
        style={{
          transform: `translateX(${isOpen ? "0px" : "-250px"})`,
          transition: "transform 300ms",
        }} // Added transition here
      >
        <button
          className={styles.closeButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdClose size={24} color="#FFF" />
        </button>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            text={item.text}
            to={item.to}
            isHovered={hoveredIndex === index}
            gradientColors={gradientColors}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
      <div className={styles.menuButton}>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <MdClose size={24} color="#FFF" />
          ) : (
            <MdMenu size={24} color="#FFF" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
