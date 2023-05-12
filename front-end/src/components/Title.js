import React from 'react';
import PropTypes from 'prop-types';

function Title(props) {
  const { name } = props;

  return (
    <h1 className="font-medium mb-1 mt-4 text-left text- w-full">{name}</h1>
  );
}

Title.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Title;
