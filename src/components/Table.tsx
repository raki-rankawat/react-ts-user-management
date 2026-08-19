interface TableProps<T> {
  data: T[]
  columns: {
    key: string
    header: string
    render: (item: T) => React.ReactNode
  }[]
}

const Table = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map(column => (
              <td key={column.key}>{column.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
