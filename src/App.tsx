import UserForm from './user-form/UserForm'
import UserList from './user-list/UserList'
import ProductList from './product-list/ProductList'
import ShoppingCart from './shopping-cart/ShoppingCart'

import AuthProvider from './context/auth/AuthProvider'
import Profile from './pages/Profile'

const App = () => {
  return (
    <AuthProvider>
      <UserForm />
      <UserList />
      <ProductList />
      <ShoppingCart />
      <Profile />
    </AuthProvider>
  )
}

export default App
