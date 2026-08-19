import Button from '../components/Button'
import Table from '../components/Table'
import useFetch from '../hooks/useFetch'
import type { Product } from '../types'

const ProductList = () => {
  const state = useFetch<Product[]>('http://localhost:5000/products')

  switch (state.status) {
    case 'loading':
      return <p>Loading...</p>

    case 'error':
      return (
        <div>
          <h2>Something went wrong!</h2>
          <p>{state.message}</p>
          <button
            onClick={() => {
              window.location.reload()
            }}
          >
            Retry
          </button>
        </div>
      )

    case 'success':
      return (
        <>
          <h2>Products</h2>

          <Table
            data={state.data}
            columns={[
              {
                key: 'name',
                header: 'Name',
                render: product => product.name,
              },
              {
                key: 'price',
                header: 'Price',
                render: product => product.price,
              },
              {
                key: 'category',
                header: 'Category',
                render: product => product.category,
              },
              {
                key: 'inStock',
                header: 'In Stock',
                render: product =>
                  product.inStock ? <span>Yes</span> : <span>No</span>,
              },
              {
                key: 'actions',
                header: 'Actions',
                render: product => (
                  <>
                    <Button
                      variant='primary'
                      onClick={() =>
                        console.log('Selected product: ', product.id)
                      }
                    >
                      Select
                    </Button>
                  </>
                ),
              },
            ]}
          />
        </>
      )
  }
}

export default ProductList
