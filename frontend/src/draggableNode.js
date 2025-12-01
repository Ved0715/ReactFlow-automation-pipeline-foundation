// draggableNode.js
import { useState } from 'react';

export const DraggableNode = ({ type, label, icon: IconComponent }) => {
    const [isHovered, setIsHovered] = useState(false);
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          cursor: 'grab', 
          minWidth: '80px', 
          height: '80px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          backgroundColor: isHovered ? '#eef2ff' : '#fff',
          justifyContent: 'center', 
          flexDirection: 'column',
          border: isHovered ? '1px solid #4238ca' : '1px solid #dcdde0',
          transition: 'all 0.2s ease'
        }} 
        draggable
      >
          {IconComponent && (
              <div style={{ color: isHovered ? '#4238c9' : '#272a34', fontSize: '24px', marginBottom: '4px', transition: 'color 0.2s ease' }}>
                  <IconComponent />
              </div>
          )}
          <span style={{ color: isHovered ? '#4238c9' : '#272a34', fontSize:'12px', fontWeight:'bold', transition: 'color 0.2s ease' }}>{label}</span>
      </div>
    );
  };
  