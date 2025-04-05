import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartGradients } from '@/lib/chart-gradients';
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
    <div className="rounded-xl p-6 bg-[#05002E] card-glow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold text-xl">Revenue</h3>
        <span className="text-[#3DB9FF] text-xl font-bold">{percentage}%</span>
      </div>
      
      <div className="flex flex-col gap-6">
        {/* Donut Chart */}
        <div className="flex justify-center">
          <div className="w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  <ChartGradients />
                </defs>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="url(#blueGradient)" />
                  <Cell fill="#2A2040" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <BarChart data={barData} />
      </div>
    </div>
  );
}
