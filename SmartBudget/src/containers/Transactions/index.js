import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  DatePicker,
  Select,
  Input,
  Tag,
  Button,
  InputNumber,
  Popconfirm,
  Radio,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useTranslation } from "react-i18next";

import ModalButton from "components/ModalButton";
import { CATEGORIES, MODAL_LAYOUT } from "constants/index";
import { setItem, getItem, generateId } from "utils";

import styles from "./index.module.scss";

const { Item } = Form;
const { Option } = Select;

const Transactions = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState(
    getItem("transactions") ?? []
  );
  const [activeTransaction, setActiveTransaction] = useState("");
  const [tableData, setTableData] = useState(
    transactions.filter(
      (a) => moment(a.date).utc() > moment().subtract(4, "weeks").utc()
    )
  );
  const [dateRange, setDateRange] = useState("4 weeks");

  const addTransaction = (values) => {
    setTransactions(
      [
        {
          id: generateId(),
          ...values,
        },
        ...transactions,
      ].sort((a, b) => moment(a.date).utc() - moment(b.date).utc())
    );
  };

  const updateTransaction = (values) => {
    const { id } = activeTransaction;
    const updatedEntry = {
      id: generateId(),
      ...values,
    };
    setTransactions(transactions.map((i) => (i.id === id ? updatedEntry : i)));
  };

  const deleteTransaction = () => {
    const { id } = activeTransaction;
    setTransactions(transactions.filter((i) => i.id !== id));
    setActiveTransaction("");
  };

  const columns = [
    {
      title: t("transactionDate"),
      dataIndex: "date",
      key: "date",
      width: "22%",
      sorter: true,
      render: (item) => moment(item).format("MMMM DD"),
    },
    {
      title: t("description"),
      dataIndex: "description",
      key: "description",
      width: "22%",
    },
    {
      title: t("category"),
      dataIndex: "category",
      key: "category",
      width: "22%",
      render: (item) => <Tag color={CATEGORIES[item]}>{t(`${item}`)}</Tag>,
    },
    {
      title: t("amount"),
      dataIndex: "amount",
      key: "amount",
      width: "22%",
      sorter: true,
      render: (item, { category }) =>
        `${category === "Income" ? "+" : "-"}$${parseInt(item).toFixed(2)}`,
    },
    {
      title: "",
      width: "32",
      key: "edit",
      render: (_, record) => (
        <ModalButton
          icon={<EditOutlined />}
          form={form}
          modalContent={formContent}
          modalProps={{
            title: t("editTransaction"),
          }}
          onSubmit={updateTransaction}
          extraOnClick={() => setActiveTransaction(record)}
          initialValues={record}
        />
      ),
    },
    {
      title: "",
      width: "32",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title={t("deleteTransaction")}
          onConfirm={deleteTransaction}
          okText={t("confirm")}
          cancelText={t("cancel")}
          okButtonProps={{ type: "danger" }}
        >
          <Button
            icon={<DeleteOutlined />}
            onClick={() => setActiveTransaction(record)}
          />
        </Popconfirm>
      ),
    },
  ];

  const formContent = (
    <Form form={form} name="transactions" {...MODAL_LAYOUT}>
      <Item
        name="date"
        label={t("transactionDate")}
        rules={[
          {
            required: true,
            message: t("transactionRequired"),
          },
        ]}
      >
        <DatePicker
          placeholder={t("selectTransaction")}
          className={styles.Input}
          format="YYYY/MM/DD"
          disabledDate={(current) => current && current > moment()}
        />
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
          {Object.keys(CATEGORIES).map((i) => (
            <Option value={i} key={i}>
              {t(`${i}`)}
            </Option>
          ))}
        </Select>
      </Item>

      <Item
        name="amount"
        label={t("amount")}
        rules={[
          {
            required: true,
            message: t("amountRequired"),
          },
        ]}
      >
        <InputNumber
          addonBefore="$"
          placeholder={t("enterAmount")}
          type="number"
          min={0}
          className={styles.Input}
        ></InputNumber>
      </Item>
    </Form>
  );

  useEffect(() => {
    setItem("transactions", transactions);
  }, [transactions]);

  const onSortChange = (_, __, { order, field }) => {
    if (field === "amount") {
      setTableData([
        ...tableData.sort((a, b) => {
          if (order === "descend") {
            return parseFloat(b.amount) - parseFloat(a.amount);
          }
          return parseFloat(a.amount) - parseFloat(b.amount);
        }),
      ]);
    }
    if (field === "date") {
      setTableData([
        ...tableData.sort((a, b) => {
          if (order === "descend") {
            return moment(b.date).utc() - moment(a.date).utc();
          }
          return moment(a.date).utc() - moment(b.date).utc();
        }),
      ]);
    }
  };

  useEffect(() => {
    const [num, duration] = dateRange.split(" ");
    const compareDate = moment().subtract(num, duration);

    setTableData(
      transactions.filter((a) => moment(a.date).utc() > compareDate.utc())
    );
  }, [dateRange, transactions]);

  return (
    <>
      <div className={styles.Header}>
        <h1>{t("transactions")}</h1>
        <ModalButton
          icon={<PlusOutlined />}
          form={form}
          modalContent={formContent}
          modalProps={{
            title: t("addTransaction"),
          }}
          onSubmit={addTransaction}
        >
          {t("addTransaction")}
        </ModalButton>
      </div>

      <div className={styles.Radio}>
        <Radio.Group
          defaultValue="4 weeks"
          buttonStyle="solid"
          onChange={(e) => setDateRange(e.target.value)}
        >
          <Radio.Button value="4 weeks">{t("last4Weeks")}</Radio.Button>
          <Radio.Button value="3 months">{t("last3Months")} </Radio.Button>
          <Radio.Button value="6 months">{t("last6Months")} </Radio.Button>
          <Radio.Button value="1 year">{t("last12Months")} </Radio.Button>
        </Radio.Group>
      </div>

      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        pagination={false}
        onChange={onSortChange}
        summary={(data) => {
          const totalTransactions = data
            .reduce((prev, current) => {
              if (current.category !== "Income") {
                return prev - parseFloat(current.amount);
              }
              return prev + parseFloat(current.amount);
            }, 0)
            .toFixed(2);

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell>{t("total")}</Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Tag color={totalTransactions > 0 ? "green" : "red"}>
                    ${totalTransactions}
                  </Tag>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </>
  );
};

export default Transactions;
