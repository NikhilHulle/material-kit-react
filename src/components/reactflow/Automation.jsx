import React, { useEffect, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  MiniMap,
} from "@xyflow/react";
import { nodeTypes } from "./Nodes";
import { edgeTypes } from "./Edges";
import { getLayoutedElements } from "./Utils/WorkflowLayoutUtils";
import "./Automation.css";

const Automation = ({ elements }) => {
  const [layoutElements, setLayoutElements] = useState([]);

  useEffect(() => {
    console.log('Automation received elements:', elements);
    if (elements && elements.length) {
      setLayoutElements(getLayoutedElements(elements));
    }
  }, [elements]);

  const layoutNodes = layoutElements.filter((x) => x.position);
  const layoutEdges = layoutElements.filter((x) => !x.position);

  return (
    <div className="AutomationCanvas">
      <ReactFlowProvider>
        <ReactFlow
          style={{ width: '100%', height: '100%', overflow: 'visible', zIndex: 0 }}
          nodes={layoutNodes}
          edges={layoutEdges}
          nodesDraggable={false}
          nodesConnectable={false}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnScroll
          panOnDrag
          preventScrolling
        >
          <Controls showInteractive={false} className="Controls" />
          <MiniMap />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

const Layout = (props) => (
  <ReactFlowProvider>
    <Automation {...props} />
  </ReactFlowProvider>
);

export default Layout;



// import React, { useEffect, useState } from "react";
// import {
//   ReactFlow,
//   ReactFlowProvider,
//   Controls,
//   MiniMap,
// } from "@xyflow/react";
// import { nodeTypes } from "./Nodes";
// import { edgeTypes } from "./Edges";
// import { getLayoutedElements } from "./Utils/WorkflowLayoutUtils";
// import "./Automation.css";

// const Automation = ({ elements }) => {
//   const [layoutElements, setLayoutElements] = useState([]);

//   useEffect(() => {
//     if (elements && elements.length) {
//       setLayoutElements(getLayoutedElements(elements));
//     }
//   }, [elements]);

//   const layoutNodes = layoutElements.filter((x) => x.position);
//   const layoutEdges = layoutElements.filter((x) => !x.position);

//   return (
//     <div className="AutomationCanvas">
//       <ReactFlowProvider>
//         <ReactFlow
//           style={{ width: '100%', height: '100%', overflow: 'visible', zIndex: 0 }}
//           nodes={layoutNodes}
//           edges={layoutEdges}
//           nodesDraggable={false}
//           nodesConnectable={false}
//           nodeTypes={nodeTypes}
//           edgeTypes={edgeTypes}
//           zoomOnScroll={false}
//           zoomOnPinch={false}
//           panOnScroll
//           panOnDrag
//           preventScrolling
//         >
//           <Controls showInteractive={false} className="Controls" />
//           <MiniMap />
//         </ReactFlow>
//       </ReactFlowProvider>
//     </div>
//   );
// };

// const Layout = (props) => (
//   <ReactFlowProvider>
//     <Automation {...props} />
//   </ReactFlowProvider>
// );

// export default Layout;

