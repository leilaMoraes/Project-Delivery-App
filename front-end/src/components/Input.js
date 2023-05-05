import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { label, type, inputName, id, dataName, onChange } = props;
  return (
    <label htmlFor={ id }>
      { label }
      <input
        type={ type }
        name={ inputName }
        id={ id }
        data-testid={ dataName }
        onChange={ onChange }
      />
    </label>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  inputName: PropTypes.string,
  id: PropTypes.string,
  dataName: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: '',
  type: '',
  inputName: '',
  id: '',
  dataName: '',
  onChange: () => {},
};

export default Input;
