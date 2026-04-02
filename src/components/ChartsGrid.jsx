import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from './ChartCard'
import { formatCurrency } from '../utils/format'

const chartColors = ['#d946ef', '#8b5cf6', '#fb7185', '#60a5fa', '#f59e0b', '#2dd4bf', '#a78bfa', '#f472b6']

export function ChartsGrid({
  balanceSeries,
  categoryBreakdown,
  incomeExpenseSeries = [],
  onCategoryClick,
  showExtended = false,
}) {
  const topCategories = categoryBreakdown.slice(0, 6)

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <ChartCard title="Balance Trend" subtitle="Smooth line projection of your running balance">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="date" tickFormatter={(v) => v.slice(5)} stroke="var(--text)" />
              <YAxis stroke="var(--text)" />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#d946ef"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5, fill: '#fb7185' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Category Split" subtitle="Expense categories breakdown">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Pie
              data={categoryBreakdown}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={88}
              innerRadius={56}
              paddingAngle={4}
              onClick={(entry) => onCategoryClick(entry?.name)}
            >
              {categoryBreakdown.map((entry, index) => (
                <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {showExtended ? (
        <div className="xl:col-span-2">
          <ChartCard title="Income vs Expenses" subtitle="Monthly cashflow comparison in bar format">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeExpenseSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
                <XAxis dataKey="month" stroke="var(--text)" />
                <YAxis stroke="var(--text)" />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="income" name="Income" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#fb7185" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      ) : null}

      {showExtended ? (
        <ChartCard title="Top Spending Categories" subtitle="Highest expense contributors this period">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topCategories} layout="vertical" margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
              <XAxis type="number" stroke="var(--text)" />
              <YAxis dataKey="name" type="category" stroke="var(--text)" width={90} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Bar dataKey="value" fill="#a855f7" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      ) : null}
    </div>
  )
}
