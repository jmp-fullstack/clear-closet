import React, { useState, useEffect, useRef } from 'react';
import './Tabs.css';

const Tabs = ({ tabs, onTabClick }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.label || '');
  const [lineStyle, setLineStyle] = useState({});
  const tabsRef = useRef(null);

  const handleTabClick = (label, index) => {
    setActiveTab(label);
    onTabClick(label);
    updateLineStyle(index);
  };

  const updateLineStyle = (index) => {
    if (tabsRef.current) {
      const tabWidth = tabsRef.current.children[index].offsetWidth;
      const left = Array.from(tabsRef.current.children)
        .slice(0, index)
        .reduce((acc, tab) => acc + tab.offsetWidth, 0);
      setLineStyle({ width: tabWidth, left });
    }
  };

  useEffect(() => {
    updateLineStyle(tabs.findIndex(tab => tab.label === activeTab));
  }, [tabs, activeTab]);

  return (
    <div className="tabs" ref={tabsRef}>
      {tabs.map((tab, index) => (
        <div
          key={tab.label}
          className={`tab ${activeTab === tab.label ? 'active' : ''}`}
          onClick={() => handleTabClick(tab.label, index)}
        >
          {tab.label}
        </div>
      ))}
      <div className="line-bar" style={lineStyle} />
    </div>
  );
};

export default Tabs;