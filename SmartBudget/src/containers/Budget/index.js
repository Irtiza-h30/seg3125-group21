import React, { useState, useMemo } from "react";
import {
  Card,
  Divider,
  Statistic,
  Tag,
  Typography,
  DatePicker,
  Alert,
} from "antd";
import { groupBy } from "lodash";
import moment from "moment";

import { CATEGORIES } from "constants/index";
import { getItem } from "utils";

import Chart from "components/Chart";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

const Budget = () => {
  const [month, setMonth] = useState(moment().endOf("month"));

  const groupedTransactions = useMemo(() => {
    const data = getItem("transactions") ?? [];
    const startDate = month.clone().startOf("month");
    const inRangeTransactions = data.filter((i) =>
      moment(i.date).isBetween(startDate, month)
    );

    return groupBy(inRangeTransactions, "category");
  }, [month]);

  const valuePerCategory = useMemo(() => {
    const obj = {};
    Object.keys(groupedTransactions).forEach(
      (i) =>
        (obj[i] = groupedTransactions[i].reduce(
          (prev, { amount }) => prev + amount,
          0
        ))
    );
    return obj;
  }, [groupedTransactions]);

  const message = useMemo(() => {
    const date = month.format("MMMM");
    const income = valuePerCategory.Income ?? 0;
    const expenses = Object.keys(valuePerCategory).reduce((prev, key) => {
      if (key !== "Income") {
        return prev + valuePerCategory[key];
      }
      return prev;
    }, 0);

    if (income < expenses) {
      return (
        <Title level={3} type="danger">{`Over budget by $${(
          expenses - income
        ).toFixed(2)} in ${date}`}</Title>
      );
    }
    return (
      <Title level={3} type="success">{`Saved $${(income - expenses).toFixed(
        2
      )} in ${date} `}</Title>
    );
  }, [valuePerCategory, month]);

  const graphData = useMemo(() => {
    const arr = [];
    Object.keys(valuePerCategory).forEach((key) => {
      if (key !== "Income") {
        arr.push({ name: key, value: valuePerCategory[key] });
      }
    });
    return arr;
  }, [valuePerCategory]);

  return (
    <Card
      title={<h1>{month.format("MMMM, YYYY")}</h1>}
      extra={
        <>
          <Text type="secondary" className={styles.Label}>
            Select date:
          </Text>
          <DatePicker
            value={month}
            onChange={(date) => setMonth(date.endOf("month"))}
            picker="month"
            format="MMMM"
            disabledDate={(current) => current && current > moment()}
          />
        </>
      }
    >
      <Title level={4} type="success">
        Income
      </Title>
      <Statistic value={valuePerCategory["Income"]} precision={2} prefix="$" />
      <Divider />
      <Title level={4} type="danger">
        Expenses
      </Title>
      {graphData.length ? (
        <>
          <div className={styles.ExpensesContainer}>
            <div className={styles.Expenses}>
              {Object.keys(valuePerCategory).map((i) => {
                if (i !== "Income") {
                  return (
                    <Statistic
                      key={i}
                      title={<Tag color={CATEGORIES[i]}>{i}</Tag>}
                      value={valuePerCategory[i]}
                      precision={2}
                      prefix="$"
                    />
                  );
                }
                return null;
              })}
            </div>
            <div className={styles.Chart}>
              <Chart data={graphData} />
            </div>
          </div>
          <div className={styles.Message}> {message}</div>
        </>
      ) : (
        <Alert
          message="Info"
          description="No expenses found."
          type="info"
          showIcon
        />
      )}
    </Card>
  );
};

export default Budget;
