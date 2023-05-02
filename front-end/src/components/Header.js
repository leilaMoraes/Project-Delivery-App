import React from 'react';
import PropTypes from 'prop-types';

export default function Header() {
  const { button1Title, button2Title, username } = props;
  return (
    <header>
      <div>
        <button type="button">{button1Title}</button>
        {button2Title
        && <button type="button">{button2Title}</button>}
      </div>

      <div>
        <button type="button">{username}</button>
        <button type="button">Logout</button>
      </div>
    </header>
  );
}

Header.propTypes = {
  button1Title: PropTypes.string.isRequired,
  button2Title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
