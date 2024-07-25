import React from 'react';

export const AddButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}  // Changed from () => onClick(props)
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: 'white',
        border: '1px solid #d9d9d9',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '10px',
          height: '2px',
          backgroundColor: '#999',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '2px',
            height: '10px',
            backgroundColor: '#999',
            position: 'absolute',
            top: '-4px',
            left: '4px',
          }}
        />
      </div>
    </div>
  );
};