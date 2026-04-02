import { ChartsGrid } from '../components/ChartsGrid'
import { InsightsPanel } from '../components/InsightsPanel'

export function AnalyticsPage({
  balanceSeries,
  categoryBreakdown,
  incomeExpenseSeries,
  insights,
  onCategoryClick,
}) {
  return (
    <div className="space-y-4">
      <ChartsGrid
        balanceSeries={balanceSeries}
        categoryBreakdown={categoryBreakdown}
        incomeExpenseSeries={incomeExpenseSeries}
        onCategoryClick={onCategoryClick}
        showExtended
      />
      <InsightsPanel insights={insights} />
    </div>
  )
}
