/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import FlowEditor from './components/reactflow/flow';
// import React from 'react';
// import ReteEditor from './components/rete.js/ReteEditor.tsx';

// ----------------------------------------------------------------------

export default function App() {
  // useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
