import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { id, classLabel, label, classInput, type, inputName, value,
    dataName, onChange } = props;
  return (
    <label htmlFor={ id } className={ classLabel }>
      { label }
      <input
        className={ classInput }
        type={ type }
        name={ inputName }
        id={ id }
        value={ value }
        data-testid={ dataName }
        onChange={ onChange }
      />
    </label>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  classLabel: PropTypes.string,
  label: PropTypes.string,
  classInput: PropTypes.string,
  type: PropTypes.string,
  inputName: PropTypes.string,
  value: PropTypes.string,
  dataName: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  id: '',
  classLabel: '',
  label: '',
  classInput: '',
  type: '',
  inputName: '',
  value: '',
  dataName: '',
  onChange: () => {},
};

export default Input;
