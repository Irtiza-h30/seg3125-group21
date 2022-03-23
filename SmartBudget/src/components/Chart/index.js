import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Tooltip,
  Cell,
} from "recharts";

import styles from "./index.module.scss";
import { Alert } from "antd";

const renderActiveShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
}) => (
  <Sector
    cx={cx}
    cy={cy}
    innerRadius={innerRadius}
    outerRadius={outerRadius + 5}
    startAngle={startAngle}
    endAngle={endAngle}
    fill={fill}
    stroke="#fff"
  />
);

const renderLabel = ({ name, x, y, cx }) => (
  <text
    x={x}
    y={y}
    fill={COLORS[name]}
    dominantBaseline="central"
    textAnchor={x > cx ? "start" : "end"}
    style={{ fontSize: "14px" }}
  >
    {name}
  </text>
);

const COLORS = {
  Housing: "#FA541C",
  Transportation: "#13C2C2",
  Food: "#FA8C16",
  Entertainment: "#FAAD14",
  Savings: "#1890FF",
  Utilities: "#EB2F96",
  Clothing: "#722ED1",
  Medical: "#2F54EB",
};

const Chart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const onMouseOver = useCallback((data, index) => {
    setActiveIndex(index);
  }, []);
  const onMouseLeave = useCallback((data, index) => {
    setActiveIndex(null);
  }, []);

  const total = useMemo(
    () => data.reduce((prev, curr) => prev + curr.value, 0),
    [data]
  );

  return (
    <div className={styles.Graph}>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            data={data}
            dataKey="value"
            outerRadius="100%"
            activeShape={renderActiveShape}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            label={renderLabel}
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[entry.name]}
                stroke="#808080"
                fillOpacity={
                  index === activeIndex || activeIndex === null ? 1 : 0.4
                }
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) =>
              `$${value.toFixed(2)} | ${((value / total) * 100).toFixed(2)}%`
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.instanceOf(Array),
};

Chart.defaultProps = {
  data: [],
};

export default Chart;
