export const includesString = (row, columnId, filterValue) => {
  const value = row.getValue(columnId)
  return value.toLowerCase().includes(filterValue.toLowerCase())
}

export const inNumberRange = (row, columnId, filterValue) => {
  const value = parseInt(row.getValue(columnId))
  const [min, max] = filterValue.split('-').map(Number)
  return value >= min && value <= max
}

export const myCustomFilterFn = (row, columnId, filterValue, addMeta) => {
  const value = row.getValue(columnId)
  const isMatch = value === filterValue 
  if (isMatch) {
    addMeta({ customMeta: 'Valor personalizado' })
  }
  return isMatch
}


