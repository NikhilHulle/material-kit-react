import React from 'react';
import { getBezierPath } from '@xyflow/react';
import EdgeAddButton from "../Buttons/EdgeAddButton/EdgeAddButton";
import "./Style.scss";

const [buttonWidth, buttonHeight] = [24, 24]; // Updated to match the foreignObject size

export const Condition = (props) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    arrowHeadType,
    markerEndId,
    data,
  } = props;

  console.log('Condition props:', props);
  console.log('Edge data in Condition:', data);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const { isAddButtonHidden, onAddNodeCallback } = data || {};

  const handleAddNode = (params) => {
    console.log('handleAddNode called with:', params);
    if (typeof onAddNodeCallback === 'function') {
      onAddNodeCallback(params);
    } else {
      console.error('onAddNodeCallback is not a function', onAddNodeCallback);
    }
  };

  return (
    <>
      <defs>
        <marker
          id={markerEndId}
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
        </marker>
      </defs>
      <path
        id={id}
        d={edgePath}
        markerEnd={`url(#${markerEndId})`}
        className="react-flow__edge-path"
      />
      {!isAddButtonHidden && (
        <foreignObject
          width={buttonWidth}
          height={buttonHeight}
          x={labelX - buttonWidth / 2}
          y={labelY - buttonHeight / 2}
          requiredExtensions="http://www.w3.org/1999/xhtml"
          style={{ overflow: 'visible' }}
        >
          <EdgeAddButton
            id={id}
            style={{
              width: '100%', 
              height: '100%',
              position: 'relative',
              overflow: 'visible'
            }}
            data={{
              onAddNodeCallback: handleAddNode,
              ...data
            }}
          />
        </foreignObject>
      )}
    </>
  );
};

