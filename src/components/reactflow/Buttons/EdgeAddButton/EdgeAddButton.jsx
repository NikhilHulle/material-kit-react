import React, { useState, useRef, useEffect } from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { AddButton } from "../AddButton/AddButton";
import "./EdgeAddButton.scss";

const EdgeAddButton = (props) => {
  const { style, data, id } = props;
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef(null);

  console.log('EdgeAddButton props:', props);

  const handleMenuClick = (event) => {
    console.log('Menu item clicked:', event.key);
    if (typeof data.onAddNodeCallback === 'function') {
      data.onAddNodeCallback({ id, type: event.key });
      setVisible(false); // Hide the menu after an item is clicked
    } else {
      console.error("onAddNodeCallback is not a function", data);
    }
  };

  const handleButtonClick = () => {
    setVisible(!visible); // Toggle visibility
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="EdgeAddButton" style={style} ref={dropdownRef}>
      <div onClick={handleButtonClick} className="add-button-wrapper">
        <AddButton {...props} />
      </div>
      {visible && (
        <div className="custom-dropdown">
          <Menu onClick={handleMenuClick}>
            <Menu.Item key="email">Email</Menu.Item>
            <Menu.Item key="sms">SMS</Menu.Item>
            <Menu.Item key="waitThenCheck">Rule</Menu.Item>
            <Menu.Item key="end">End</Menu.Item>
          </Menu>
        </div>
      )}
    </div>
  );
};


EdgeAddButton.propTypes = {
  style: PropTypes.object,
  data: PropTypes.shape({
    onAddNodeCallback: PropTypes.func.isRequired
  }).isRequired,
  id: PropTypes.string.isRequired
};

export default EdgeAddButton;
