import React from 'react';
import { Collapse } from 'antd';

const items = (children) => [
  {
    key: 'filter',
    label: 'Lọc kết quả',
    children: <p>{children}</p>,
  }
];
const FilterCollapse = ({ children }) => {

  return <Collapse items={items(children)} />;
};
export default FilterCollapse;