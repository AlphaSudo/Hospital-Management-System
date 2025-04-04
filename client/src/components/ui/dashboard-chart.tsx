import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import { ChartGradients } from '@/lib/chart-gradients';

export interface HospitalSurveyData {
  month: string;
  newPatients: number;
  allPatients: number;
}

export interface HospitalSurveyChartProps {
  data: HospitalSurveyData[];
}

export function HospitalSurveyChart({ data }: HospitalSurveyChartProps) {
  return (
    <div className="rounded-xl p-6 bg-card card-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-xl">HOSPITAL SURVEY</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5757]"></div>
            <span className="text-sm text-gray-300">New Patients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#9747FF]"></div>
            <span className="text-sm text-gray-300">All Patients</span>
          </div>
        </div>
      </div>
      
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <ChartGradients />
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2040" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              domain={[0, 200]}
              ticks={[10, 50, 100, 120]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(26, 20, 47, 0.9)', 
                borderColor: '#3C2E63',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
              }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#9CA3AF' }}
            />
            <Area 
              type="monotone" 
              dataKey="newPatients" 
              stroke="#FF5757" 
              strokeWidth={3}
              fill="url(#orangeGradient)"
              fillOpacity={0.2}
            />
            <Area 
              type="monotone" 
              dataKey="allPatients" 
              stroke="#9747FF" 
              strokeWidth={3}
              fill="url(#purpleGradient)"
              fillOpacity={0.2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
