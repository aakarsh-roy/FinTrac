const parseDate = (value) => new Date(value)

export const sortTransactions = (transactions, sortBy, sortOrder) => {
  const sorted = [...transactions]
  sorted.sort((a, b) => {
    let left = a[sortBy]
    let right = b[sortBy]

    if (sortBy === 'date') {
      left = parseDate(left).getTime()
      right = parseDate(right).getTime()
    }

    if (sortBy === 'amount') {
      left = Number(left)
      right = Number(right)
    }

    if (left < right) return sortOrder === 'asc' ? -1 : 1
    if (left > right) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  return sorted
}

export const filterTransactions = (transactions, filters) => {
  const { search, category, type, startDate, endDate } = filters

  return transactions.filter((tx) => {
    const query = search.trim().toLowerCase()
    const searchable = `${tx.category} ${tx.notes}`.toLowerCase()
    const matchesSearch = query ? searchable.includes(query) : true
    const matchesCategory = category === 'all' ? true : tx.category === category
    const matchesType = type === 'all' ? true : tx.type === type
    const matchesStart = startDate ? parseDate(tx.date) >= parseDate(startDate) : true
    const matchesEnd = endDate ? parseDate(tx.date) <= parseDate(endDate) : true

    return matchesSearch && matchesCategory && matchesType && matchesStart && matchesEnd
  })
}

export const paginate = (items, page, pageSize) => {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const start = (safePage - 1) * pageSize
  return {
    pagedItems: items.slice(start, start + pageSize),
    totalPages,
    safePage,
  }
}

export const calculateTotals = (transactions) => {
  const income = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const expenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const balance = income - expenses
  const savingsRate = income ? ((income - expenses) / income) * 100 : 0

  return { income, expenses, balance, savingsRate }
}

export const buildBalanceSeries = (transactions) => {
  const sortedByDate = [...transactions].sort(
    (a, b) => parseDate(a.date) - parseDate(b.date),
  )

  let runningBalance = 0
  return sortedByDate.map((tx) => {
    runningBalance += tx.type === 'income' ? tx.amount : -tx.amount
    return {
      date: tx.date,
      balance: Math.round(runningBalance),
    }
  })
}

const monthKey = (dateString) => {
  const d = parseDate(dateString)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export const buildIncomeExpenseSeries = (transactions) => {
  const grouped = transactions.reduce((acc, tx) => {
    const key = monthKey(tx.date)
    if (!acc[key]) {
      acc[key] = { month: key, income: 0, expenses: 0 }
    }

    if (tx.type === 'income') acc[key].income += tx.amount
    if (tx.type === 'expense') acc[key].expenses += tx.amount

    return acc
  }, {})

  return Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month))
}

export const buildCategoryBreakdown = (transactions) => {
  const grouped = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] ?? 0) + tx.amount
      return acc
    }, {})

  return Object.entries(grouped)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export const monthlyExpense = (transactions, forMonth) => {
  const [year, month] = forMonth.split('-').map(Number)
  return transactions
    .filter((tx) => {
      const d = parseDate(tx.date)
      return d.getFullYear() === year && d.getMonth() + 1 === month && tx.type === 'expense'
    })
    .reduce((sum, tx) => sum + tx.amount, 0)
}

export const deriveInsights = (transactions) => {
  if (!transactions.length) {
    return {
      topSpendingCategory: 'N/A',
      monthOverMonthExpensesChange: 0,
      savingsTrend: 'No data available yet.',
    }
  }

  const categoryBreakdown = buildCategoryBreakdown(transactions)
  const topSpendingCategory = categoryBreakdown[0]?.name ?? 'N/A'

  const monthly = buildIncomeExpenseSeries(transactions)
  const latest = monthly[monthly.length - 1]
  const previous = monthly[monthly.length - 2]

  const monthOverMonthExpensesChange = previous?.expenses
    ? ((latest.expenses - previous.expenses) / previous.expenses) * 100
    : 0

  const latestSavings = latest?.income ? ((latest.income - latest.expenses) / latest.income) * 100 : 0
  const previousSavings = previous?.income
    ? ((previous.income - previous.expenses) / previous.income) * 100
    : latestSavings

  const trendDirection = latestSavings >= previousSavings ? 'improving' : 'declining'
  const savingsTrend = `Savings trend is ${trendDirection}. Current month savings rate is ${latestSavings.toFixed(
    1,
  )}% vs ${previousSavings.toFixed(1)}% last month.`

  return {
    topSpendingCategory,
    monthOverMonthExpensesChange,
    savingsTrend,
  }
}
