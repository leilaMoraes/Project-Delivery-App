import React from 'react';
import PropTypes from 'prop-types';

function Title(props) {
  const { name } = props;

  return (
    <h1 className="font-medium my-3">{name}</h1>
  );
}

Title.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Title;
