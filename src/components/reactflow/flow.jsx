import React, { useCallback, useEffect, useState } from 'react';
import _ from "lodash";
import {
  ReactFlowProvider,
  getIncomers, 
  getOutgoers,
} from '@xyflow/react';
import { initialElements } from "./Data/Elements1";
import { getUpdatedElementsAfterNodeAddition } from "./Utils/WorkflowElementUtils";
import Layout from "./Automation";
import "./index.scss";
import '@xyflow/react/dist/style.css';
import '@xyflow/react/dist/base.css';

export default function FlowEditor() {
  const [elements, setElements] = useState([]);

  const onDeleteNodeCallback = useCallback((id) => {
    setElements((els) => {
      const clonedElements = _.cloneDeep(els);
      const incomingEdges = clonedElements.filter((x) => x.target === id);
      const outgoingEdges = clonedElements.filter((x) => x.source === id);
      const updatedIncomingEdges = incomingEdges.map((x) => ({
        ...x,
        target: outgoingEdges[0].target,
      }));
      const filteredElements = clonedElements.filter(
        (x) =>
          x.id !== id &&
          x.target !== incomingEdges[0].target &&
          x.source !== outgoingEdges[0].source
      );
      filteredElements.push(...updatedIncomingEdges);
      return filteredElements;
    });
  }, []);

  const onNodeClickCallback = useCallback((id) => {
    setElements((els) => {
      const currentNode = els.find((x) => x.id === id);
      const nodes = els.filter((x) => x.position);
      const edges = els.filter((x) => !x.position);
      console.error({
        incomers: getIncomers(currentNode, nodes, edges),
        outgoers: getOutgoers(currentNode, nodes, edges),
      });
      return els;
    });
    alert(`You clicked the "${id}" node`);
  }, []);

  const onAddNodeCallback = useCallback(({ id, type }) => {
    console.log('onAddNodeCallback called with:', { id, type });
    setElements((els) =>
      getUpdatedElementsAfterNodeAddition({
        elements: els,
        targetEdgeId: id,
        type,
        onDeleteNodeCallback,
        onNodeClickCallback,
        onAddNodeCallback,
      })
    );
  }, [onDeleteNodeCallback, onNodeClickCallback]);

  useEffect(() => {
    console.log('initialElements:', initialElements);

    const nodes = initialElements
      .filter((x) => !x.target)
      .map((x) => ({
        ...x,
        data: { ...x.data, onDeleteNodeCallback, onNodeClickCallback },
      }));
    const edges = initialElements
    .filter((x) => x.target)
    .map((x) => ({ ...x, data: { ...x.data, onAddNodeCallback } }));
  
  console.log('Processed nodes:', nodes);
  console.log('Processed edges:', edges);

  setElements([...nodes, ...edges]);
}, [onAddNodeCallback, onDeleteNodeCallback, onNodeClickCallback]);

useEffect(() => {
  console.log('elements state updated:', elements);
}, [elements]);

return (
  <ReactFlowProvider>
    <div className="FlowEditor">
      <Layout elements={elements} />
    </div>
  </ReactFlowProvider>
);
}
