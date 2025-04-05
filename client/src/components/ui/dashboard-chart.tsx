import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

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
    <div className="rounded-2xl p-7 bg-[#05002E] card-glow border border-[#5D0A72]/10 h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-white font-bold text-xl tracking-tight">Hospital Survey</h3>
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-[#FF5757]"></div>
            <span className="text-sm text-[#94A3B8]">New Patients</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-[#9747FF]"></div>
            <span className="text-sm text-[#94A3B8]">All Patients</span>
          </div>
        </div>
      </div>
      
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2040" opacity={0.3} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              domain={[0, 200]}
              ticks={[0, 50, 100, 150, 200]}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(10, 0, 74, 0.9)', 
                borderColor: '#5D0A72',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                padding: '10px 14px'
              }}
              itemStyle={{ color: '#fff', fontSize: '13px', padding: '3px 0' }}
              labelStyle={{ color: '#94A3B8', fontWeight: 'bold', marginBottom: '5px' }}
              cursor={{ stroke: '#5D0A72', strokeWidth: 1, strokeDasharray: '5 5' }}
            />
            <Area 
              type="monotone" 
              dataKey="newPatients" 
              stroke="#FF5757" 
              strokeWidth={3}
              fill="url(#chartOrangeGradient)"
              fillOpacity={0.6}
              className="chart-area-gradient-orange"
              activeDot={{ r: 6, fill: '#FF5757', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
            <Area 
              type="monotone" 
              dataKey="allPatients" 
              stroke="#9747FF" 
              strokeWidth={3}
              fill="url(#chartPurpleGradient)"
              fillOpacity={0.6}
              className="chart-area-gradient-purple"
              activeDot={{ r: 6, fill: '#9747FF', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
