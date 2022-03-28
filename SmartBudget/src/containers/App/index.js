import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Budget from "containers/Budget";
import Goals from "containers/Goals";
import Transactions from "containers/Transactions";
import AppLayout from "containers/Layout";

import ConfigProvider from "contexts/ConfigProvider";

import "styles/theme/antd.less";
import "styles/index.module.scss";

const App = () => {
  return (
    <Router>
      <ConfigProvider>
        <AppLayout>
          <Routes>
            <Route path="/budget" element={<Budget />}></Route>
            <Route path="/goals" element={<Goals />}></Route>
            <Route path="/transactions" element={<Transactions />}></Route>
            <Route path="*" element={<Navigate to="/transactions" />} />
          </Routes>
        </AppLayout>
      </ConfigProvider>
    </Router>
  );
};

export default App;
