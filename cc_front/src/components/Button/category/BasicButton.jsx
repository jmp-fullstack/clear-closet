import React from 'react';
import PropTypes from 'prop-types';

const BasicButton = ({ children, onClick, style, className }) => {
  return (
    <button onClick={onClick} style={style} className={className}>
      {children}
    </button>
  );
};

BasicButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default BasicButton;