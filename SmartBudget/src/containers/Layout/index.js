import React from "react";
import PropTypes from "prop-types";

import { Layout, Menu } from "antd";
import {
  SolutionOutlined,
  PieChartOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

import logo from "images/logo.png";

import styles from "./index.module.scss";

const { Content, Header } = Layout;
const { Item } = Menu;

const AppLayout = ({ children }) => {
  const location = useLocation();

  const getActiveKey = () => [location.pathname.substring(1)];

  return (
    <Layout className={styles.Layout}>
      <Header className={styles.Navbar}>
        <Link className={styles.LogoContainer} to="/transactions">
          <img src={logo} alt="logo" />
        </Link>
        <Menu
          mode="horizontal"
          selectedKeys={getActiveKey()}
          className={styles.Menu}
        >
          <Item key="transactions" icon={<SolutionOutlined />}>
            <Link to="/transactions">Transactions</Link>
          </Item>
          <Item key="goals" icon={<DollarCircleOutlined />}>
            <Link to="/goals">Goals</Link>
          </Item>
          <Item key="budget" icon={<PieChartOutlined />}>
            <Link to="/budget">Budget</Link>
          </Item>
        </Menu>
      </Header>
      <Content className={styles.Content}>{children}</Content>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node,
};

AppLayout.defaultProps = {
  children: null,
};

export default AppLayout;
