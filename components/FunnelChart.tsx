
import React from 'react';
import { 
  FunnelChart as RechartsFunnelChart, 
  Funnel, 
  LabelList, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { FunnelItem } from '../types';

interface FunnelChartProps {
  data: FunnelItem[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg">
        <p className="font-semibold text-slate-800">{payload[0].name}</p>
        <p className="text-slate-600">Volume: <span className="font-bold">{payload[0].value.toLocaleString()}</span></p>
        <p className="text-blue-600 text-sm">Conversion: {payload[0].payload.percentage}</p>
      </div>
    );
  }
  return null;
};

const FunnelChartComponent: React.FC<FunnelChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsFunnelChart>
          <Tooltip content={<CustomTooltip />} />
          <Funnel
            dataKey="value"
            data={data}
            isAnimationActive
          >
            <LabelList position="right" fill="#475569" stroke="none" dataKey="name" fontSize={12} fontWeight={500} />
            <LabelList position="center" fill="#fff" stroke="none" dataKey="value" fontSize={14} fontWeight={700} />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Funnel>
        </RechartsFunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FunnelChartComponent;
