import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { btnClass, dataName, id, disabled, onClick, btnName } = props;
  return (
    <button
      className={ btnClass }
      type="button"
      data-testid={ dataName }
      id={ id }
      disabled={ disabled }
      onClick={ onClick }
    >
      {btnName}
    </button>
  );
}

Button.propTypes = {
  btnClass: PropTypes.string,
  dataName: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  btnName: PropTypes.node,
};

Button.defaultProps = {
  btnClass: '',
  dataName: '',
  id: '',
  disabled: false,
  onClick: () => {},
  btnName: null,
};

export default Button;
