'use client';

import React from 'react';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  YAxis,
} from 'recharts';

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}

export function Sparkline({
  data,
  color = '#22c55e',
  height = 32,
  width = 80,
}: SparklineProps) {
  const chartData = data.map((value, index) => ({
    index,
    value,
  }));

  // Sanitize gradient ID string for SVG defs
  const gradId = `spark-grad-${color.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div className="shrink-0 self-end -mb-0.5" style={{ width: `${width}px`, height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 4, right: 2, bottom: 2, left: 2 }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradId})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
