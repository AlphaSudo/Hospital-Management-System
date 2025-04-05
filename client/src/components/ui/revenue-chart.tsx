import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BarChart } from './bar-chart';

export interface RevenueChartProps {
  percentage: number;
  barData: number[];
}

export function RevenueChart({ percentage, barData }: RevenueChartProps) {
  const pieData = [
    { name: 'Revenue', value: percentage },
    { name: 'Remaining', value: 100 - percentage }
  ];

  return (
    <div className="rounded-2xl p-7 bg-[#05002E] card-glow h-full border border-[#5D0A72]/10">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-white font-bold text-xl tracking-tight">Revenue</h3>
        <span className="text-gradient-blue text-xl font-bold">{percentage}%</span>
      </div>
      
      <div className="flex flex-col gap-7">
        {/* Donut Chart */}
        <div className="flex justify-center items-center">
          <div className="w-48 h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={54}
                  outerRadius={67}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={0}
                >
                  <Cell fill="url(#blueLineGradient)" />
                  <Cell fill="#0F0827" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#94A3B8] text-sm mb-1">Total Earnings</p>
                <p className="text-white text-2xl font-bold">$12,875</p>
                <p className="text-[#94A3B8]/60 text-xs">Last Month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="mt-2">
          <BarChart data={barData} />
        </div>
      </div>
    </div>
  );
}
