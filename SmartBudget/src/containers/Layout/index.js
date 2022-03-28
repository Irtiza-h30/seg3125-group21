import React from "react";
import PropTypes from "prop-types";

import { Layout, Menu, Select } from "antd";
import {
  SolutionOutlined,
  PieChartOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useConfig } from "contexts/ConfigContext";
import logo from "images/logo.png";
import Eng from "images/english.png";
import Fr from "images/french.png";

import styles from "./index.module.scss";

const { Content, Header } = Layout;
const { Item } = Menu;
const { Option } = Select;

const AppLayout = ({ children }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { onChangeLanguage, currentLanguage } = useConfig();

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
            <Link to="/transactions">{t("transactions")}</Link>
          </Item>
          <Item key="goals" icon={<DollarCircleOutlined />}>
            <Link to="/goals">{t("goals")}</Link>
          </Item>
          <Item key="budget" icon={<PieChartOutlined />}>
            <Link to="/budget">{t("budget")}</Link>
          </Item>
        </Menu>
        <div className={styles.SelectContainer}>
          <Select
            onChange={onChangeLanguage}
            bordered={false}
            value={currentLanguage}
          >
            <Option key="en" value="en">
              EN <img src={Eng} alt="us" />
            </Option>
            <Option key="fr" value="fr">
              FR <img src={Fr} alt="fr" />
            </Option>
          </Select>
        </div>
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
