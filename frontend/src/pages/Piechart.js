import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Food', value: 400 },
  { name: 'Bills', value: 300 },
  { name: 'Housing', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartComponent = () => (
  <PieChart width={340} height={180}>
    <Pie
    data={data}
    cx={120}
    cy={85}
    labelLine={false}
    label={renderCustomizedLabel}
    outerRadius={90}
    fill="#8884d8"
    dataKey="value"
    >
    {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
    ))}
    </Pie> 

    <Tooltip />
    <Legend layout="vertical" align="right" verticalAlign="middle"/>
  </PieChart>
);

export default PieChartComponent;
