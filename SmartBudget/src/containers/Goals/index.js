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

import { MODAL_LAYOUT, GOALS } from "constants/index";
import ModalButton from "components/ModalButton";
import { setItem, getItem, generateId } from "utils";

import styles from "./index.module.scss";

const { Item } = Form;
const { Option } = Select;
const { TabPane } = Tabs;

const Goals = () => {
  const [form] = Form.useForm();
  const [goals, setGoals] = useState(getItem("goals") ?? []);
  const completedGoals = getItem("completedGoals") ?? [
    {
      id: generateId(),
      category: "Personal",
      description: "Buying a Ps5",
      amount: 500,
      dateCompleted: "February, 2022",
    },
    {
      id: generateId(),
      category: "Education",
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
        label="Category"
        rules={[
          {
            required: true,
            message: "Category is required",
          },
        ]}
      >
        <Select placeholder="Select category">
          {Object.keys(GOALS).map((i) => (
            <Option value={i} key={i}>
              {i}
            </Option>
          ))}
        </Select>
      </Item>
      <Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: "Description is required",
          },
        ]}
      >
        <Input placeholder="Enter description" />
      </Item>
      <Item
        name="amount"
        label="Total Amount"
        rules={[
          {
            required: true,
            message: "Total amount is required",
          },
        ]}
      >
        <InputNumber
          addonBefore="$"
          placeholder="Enter total amount"
          type="number"
          min={0}
          className={styles.Input}
        ></InputNumber>
      </Item>
      <Item
        name="totalContribution"
        label="Initial Contribution"
        rules={[
          {
            required: true,
            message: "Initial contribution amount is required",
          },
        ]}
      >
        <InputNumber
          addonBefore="$"
          placeholder="Enter initial contribution amount"
          type="number"
          min={0}
          className={styles.Input}
        ></InputNumber>
      </Item>
      <Item
        name="contribution"
        label="Monthly Contribution"
        rules={[
          {
            required: true,
            message: "Monthly contribution is required",
          },
        ]}
      >
        <InputNumber
          addonBefore="$"
          placeholder="Enter monthly contribution"
          type="number"
          min={0}
          className={styles.Input}
        ></InputNumber>
      </Item>
    </Form>
  );
  return (
    <>
      <h1>Goals</h1>
      <Tabs defaultActiveKey="active">
        <TabPane tab="Active" key="active">
          <Divider orientation="left">
            <h2>Active Goals</h2>
          </Divider>
          <div className={styles.Header}>
            <h5>
              {`Saving $${goals
                .reduce((prev, current) => prev + current.contribution, 0)
                .toLocaleString()} per
        month for
        ${goals.length} ${goals.length > 1 ? "goals" : "goal"}`}
            </h5>
            <ModalButton
              icon={<PlusOutlined />}
              form={form}
              modalContent={formContent}
              modalProps={{
                title: "Add Goal",
              }}
              onSubmit={addGoal}
            >
              Add Goal
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
                      <Tag color={GOALS[item.category]}>{item.category}</Tag>
                    </div>
                  }
                  description={
                    <>
                      <h4>{`$${item.monthlyContribution.toLocaleString()} of $${item.contribution.toLocaleString()} this month`}</h4>
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
                    title="Projected"
                    value={moment()
                      .add(item.amount / item.contribution, "months")
                      .format("MMMM, YYYY")}
                  />
                  <Statistic
                    title="Contribution to Date"
                    value={`$${(
                      item.totalContribution + item.monthlyContribution
                    ).toLocaleString()} of $${item.amount.toLocaleString()} `}
                  />
                </div>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Completed" key="completed">
          <Divider orientation="left">
            <h2>Completed Goals</h2>
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
                      <Tag color={GOALS[item.category]}>{item.category}</Tag>
                    </div>
                  }
                  description={<Progress percent={100} />}
                />
                <div className={styles.Statistics}>
                  <Statistic title="Completed" value={item.dateCompleted} />
                  <Statistic
                    title="Saved"
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
