import UserForm from './user-form/UserForm'
import UserList from './user-list/UserList'
import ProductList from './product-list/ProductList'
import ShoppingCart from './shopping-cart/ShoppingCart'

const App = () => {
  return (
    <div>
      <UserForm />
      <UserList />
      <ProductList />
      <ShoppingCart />
    </div>
  )
}

export default App
