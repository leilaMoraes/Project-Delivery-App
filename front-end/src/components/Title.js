import React from 'react';
import PropTypes from 'prop-types';

function Title(props) {
  const { name } = props;

  return (
    <h1 className="font-medium text-lg text-left mb-1 mt-4 ml-0.5 w-full">{name}</h1>
  );
}

Title.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Title;
