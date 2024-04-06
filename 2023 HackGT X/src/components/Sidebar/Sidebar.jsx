import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { FaFire, FaBars } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

const transitionTime = "0.2s";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    setScrollPosition(scrollTop / (scrollHeight - clientHeight));
  };

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.style.maxHeight = isOpen
        ? `${sidebarRef.current.scrollHeight}px`
        : "55px";
    }
  }, [isOpen]);

  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <React.Fragment key={index}>
        {index === 0 && <Divider isOpen={isOpen} />}
        <Link
          to={item.to}
          style={{
            transition: `all ${transitionTime} ease-in-out ${
              isOpen ? 0.2 * index : (menuItems.length + 1 - index) * 0.05
            }s`, // Updated transition time
            transform: isOpen ? "translateX(0)" : "translateX(-120%)", // New transform for expanding effect
          }}
        >
          <SideBarItem icon={item.icon} text={item.text} />
        </Link>
      </React.Fragment>
    ));
  };

  const menuItems = [
    {
      to: "/home",
      icon: <FaFire size="28" />,
      text: "Home",
    },
    {
      to: "/stats",
      icon: <IoIosStats size="20" />,
      text: "Stats",
    },
  ];

  return (
    <div className={styles.container}>
      <div
        className={`${styles.sidebar} ${styles.sidebarOpen}`}
        ref={sidebarRef}
        onScroll={handleScroll}
      >
        <div
          className={`relative h-14 w-14 flex items-center justify-center bg-gray-900 rounded-full`}
          onClick={toggleSidebar}
          style={{ transition: `transform 0.3s` }}
        >
          <div className={`${styles.sidebarIcon}`}>
            <SideBarItem
              icon={<FaBars size="20" />}
              text={isOpen ? "Close Sidebar" : "Open Sidebar"}
              isOpen={isOpen}
            />
          </div>
        </div>

        {renderMenuItems()}
      </div>
    </div>
  );
};

const SideBarItem = ({ icon, text = "tooltip 💡", isOpen }) => (
  <div className={`${styles.sidebarIcon} relative`}>
    <div>{icon}</div>
    <span
      className={`${styles.sidebarTooltip} group-hover:scale-100`}
      style={{ transition: `transform ${transitionTime} ease-in-out` }}
    >
      {text}
    </span>
  </div>
);

const Divider = ({ isOpen, transitionDelay }) => (
  <hr
    className={`${styles.sidebarHr}`}
    style={{
      transition: `all ${transitionTime} ease-in-out ${transitionDelay}s`,
      transform: isOpen ? "translateX(0)" : "translateX(-120%)",
      opacity: isOpen ? 1 : 0,
    }}
  />
);

export default SideBar;
