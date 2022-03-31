import React, { useState, useEffect } from "react";
import {
  List,
  Progress,
  Form,
  Select,
  Input,
  InputNumber,
  Tag,
  Statistic,
  Slider,
  Divider,
  Tabs,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { MODAL_LAYOUT, GOALS } from "constants/index";
import ModalButton from "components/ModalButton";
import { setItem, getItem, generateId } from "utils";

import styles from "./index.module.scss";

const { Item } = Form;
const { Option } = Select;
const { TabPane } = Tabs;

const Goals = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [goals, setGoals] = useState(getItem("goals") ?? []);
  const completedGoals = getItem("completedGoals") ?? [
    {
      id: generateId(),
      category: t("Personal"),
      description: "Buying a Ps5",
      amount: 500,
      dateCompleted: "February, 2022",
    },
    {
      id: generateId(),
      category: t("Education"),
      description: "Paying off student loans",
      amount: 44000,
      dateCompleted: "December, 2021",
    },
  ];

  useEffect(() => {
    setItem("goals", goals);
  }, [goals]);

  const addGoal = (values) => {
    setGoals([
      {
        id: generateId(),
        monthlyContribution: 0,
        ...values,
      },
      ...goals,
    ]);
  };

  const updateGoal = (id) => (value) => {
    setGoals(
      goals.map((i) => (i.id === id ? { ...i, monthlyContribution: value } : i))
    );
  };

  const formContent = (
    <Form form={form} name="transactions" {...MODAL_LAYOUT}>
      <Item
        name="category"
        label={t("category")}
        rules={[
          {
            required: true,
            message: t("categoryRequired"),
          },
        ]}
      >
        <Select placeholder={t("selectCategory")}>
          {Object.keys(GOALS).map((i) => (
            <Option value={i} key={i}>
              {t(`${i}`)}
            </Option>
          ))}
        </Select>
      </Item>
      <Item
        name="description"
        label={t("description")}
        rules={[
          {
            required: true,
            message: t("descriptionRequired"),
          },
        ]}
      >
        <Input placeholder={t("enterDescription")} />
      </Item>
      <Item
        name="amount"
        label={t("totalAmount")}
        rules={[
          {
            required: true,
            message: t("totalAmountRequired"),
          },
        ]}
      >
        <InputNumber
          addonBefore="$"
          placeholder={t("enterTotalAmount")}
          type="number"
          min={0}
          className={styles.Input}
        ></InputNumber>
      </Item>
      <Item
        name="totalContribution"
        label={t("initialContribution")}
        rules={[
          {
            required: true,
            message: t("initialContributionRequired"),
          },
        ]}
      >
        <InputNumber
          addonBefore="$"
          placeholder={t("enterInitialContribution")}
          type="number"
          min={0}
          className={styles.Input}
        ></InputNumber>
      </Item>
      <Item
        name="contribution"
        label={t("monthlyContribution")}
        rules={[
          {
            required: true,
            message: t("monthlyContributionRequired"),
          },
        ]}
      >
        <InputNumber
          addonBefore="$"
          placeholder={t("enterMonthlyContribution")}
          type="number"
          min={0}
          className={styles.Input}
        ></InputNumber>
      </Item>
    </Form>
  );
  return (
    <>
      <h1>{t("goals")}</h1>
      <Tabs defaultActiveKey="active">
        <TabPane tab="Active" key="active">
          <Divider orientation="left">
            <h2>{t("activeGoals")}</h2>
          </Divider>
          <div className={styles.Header}>
            <h5>
              {`${t("saving")} $${goals
                .reduce((prev, current) => prev + current.contribution, 0)
                .toLocaleString()} ${t("perMonth")}
        ${goals.length} ${t("goal")}${goals.length > 1 ? "s" : ""}`}
            </h5>
            <ModalButton
              icon={<PlusOutlined />}
              form={form}
              modalContent={formContent}
              modalProps={{
                title: t("addGoal"),
              }}
              onSubmit={addGoal}
            >
              {t("addGoal")}
            </ModalButton>
          </div>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={goals}
            bordered
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  className={styles.Item}
                  title={
                    <div>
                      <h4>{item.description}</h4>
                      <Tag color={GOALS[item.category]}>
                        {t(`${item.category}`)}
                      </Tag>
                    </div>
                  }
                  description={
                    <>
                      <h4>{`$${item.monthlyContribution.toLocaleString()} ${t(
                        "of"
                      )} $${item.contribution.toLocaleString()} ${t(
                        "thisMonth"
                      )}`}</h4>
                      <Slider
                        min={0}
                        max={item.contribution}
                        marks={{
                          0: "$0.00",
                          [item.contribution]: `$${item.contribution}`,
                        }}
                        defaultValue={item.monthlyContribution}
                        onChange={updateGoal(item.id)}
                      />
                    </>
                  }
                />
                <div className={styles.Statistics}>
                  <Statistic
                    title={t("projected")}
                    value={moment()
                      .add(item.amount / item.contribution, "months")
                      .format("MMMM, YYYY")}
                  />
                  <Statistic
                    title={t("contributionToDate")}
                    value={`$${(
                      item.totalContribution + item.monthlyContribution
                    ).toLocaleString()} ${t(
                      "of"
                    )} $${item.amount.toLocaleString()} `}
                  />
                </div>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab={t("completedGoals")} key="completed">
          <Divider orientation="left">
            <h2>{t("completedGoals")}</h2>
          </Divider>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={completedGoals}
            bordered
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  className={styles.Item}
                  title={
                    <div>
                      <h4>{item.description}</h4>
                      <Tag color={GOALS[item.category]}>
                        {t(`${item.category}`)}
                      </Tag>
                    </div>
                  }
                  description={<Progress percent={100} />}
                />
                <div className={styles.Statistics}>
                  <Statistic
                    title={t("completed")}
                    value={item.dateCompleted}
                  />
                  <Statistic
                    title={t("saved")}
                    value={`$${item.amount.toLocaleString()}`}
                  />
                </div>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Goals;
