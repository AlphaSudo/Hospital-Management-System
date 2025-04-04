export function ChartGradients() {
  return (
    <>
      <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9747FF" stopOpacity={0.5} />
        <stop offset="100%" stopColor="#9747FF" stopOpacity={0} />
      </linearGradient>
      
      <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FF5757" stopOpacity={0.5} />
        <stop offset="100%" stopColor="#FF5757" stopOpacity={0} />
      </linearGradient>
      
      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3DB9FF" />
        <stop offset="100%" stopColor="#1E65FF" />
      </linearGradient>
    </>
  );
}
