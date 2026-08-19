import { useReducer } from 'react'
import type { Product } from '../types'
import Button from '../components/Button'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | {
      type: 'add'
      product: Product
    }
  | {
      type: 'remove'
      productId: number
    }
  | {
      type: 'updateQuantity'
      productId: number
      quantity: number
    }
  | {
      type: 'clear'
    }

const initialState: CartState = {
  items: [],
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'add': {
      const existingItem = state.items.find(
        item => item.id === action.product.id,
      )

      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }

      return {
        items: [
          ...state.items,
          {
            ...action.product,
            quantity: 1,
          },
        ],
      }
    }

    case 'remove':
      return {
        items: state.items.filter(item => item.id !== action.productId),
      }

    case 'updateQuantity':
      return {
        items: state.items.map(item =>
          item.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item,
        ),
      }

    case 'clear':
      return {
        items: [],
      }

    default:
      return state
  }
}

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const product: Product = {
    id: 101,
    name: 'Laptop',
    price: 199,
    category: 'electronics',
    inStock: true,
  }

  return (
    <div>
      <h2>Shopping Cart</h2>

      <Button
        variant='primary'
        onClick={() => dispatch({ type: 'add', product })}
      >
        Add
      </Button>

      <Button
        variant='primary'
        onClick={() => dispatch({ type: 'remove', productId: 101 })}
      >
        Remove
      </Button>

      <Button variant='primary' onClick={() => dispatch({ type: 'clear' })}>
        Clear
      </Button>

      <ul>
        {state.items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <button
              onClick={() =>
                dispatch({
                  type: 'updateQuantity',
                  productId: item.id,
                  quantity: item.quantity + 1,
                })
              }
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShoppingCart
