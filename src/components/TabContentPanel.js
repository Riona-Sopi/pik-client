import React from 'react';

import { Card } from 'react-bootstrap';

function TabContentPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Card>{children}</Card>}
    </div>
  );
}

export default TabContentPanel;