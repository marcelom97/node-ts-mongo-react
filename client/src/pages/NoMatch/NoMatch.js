import React from 'react';

import './NoMatch.css';

function NoMatch() {
  return (
    <h3>
      No match for <code>{window.location.href}</code>
    </h3>
  );
}

export default NoMatch;
