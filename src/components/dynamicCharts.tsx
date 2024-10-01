// src/components/DynamicChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DynamicChartProps {
  data: any[];
  dataKey: string;
  stroke: string;
  name: string;
}

export default function DynamicChart({ data, dataKey, stroke, name }: DynamicChartProps) {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="startTime" 
            tickFormatter={(unixTime) => new Date(unixTime * 1000).toLocaleDateString()} 
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={stroke} name={name} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}