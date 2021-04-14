import React from 'react';

export default function showListElem(arr) {
  return (arr?.map((el) => {
    return (
      <div className="txt" key={el.label}>
        <span>{el.label}</span>
        <span>{el.value}</span>
      </div>
    );
  }));
};
