import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/login/LoginPage'
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/home/Dashboard';
import { BillsPage } from './pages/bills/BillsPage';
import { BillsDetailsPage } from './pages/bills/BillsDetailsPage';
import { BillsCreatePage } from './pages/bills/BillsCreatePage';
import { CommentsPage } from './pages/comments/CommentsPage';
import { CommentsDetailsPage } from './pages/comments/CommentsDetailsPage';
import { CustomersPage } from './pages/customers/CustomersPage';
import { CustomersDetailsPage } from './pages/customers/CustomersDetailsPage';
import { CustomersCreatePage } from './pages/customers/CustomersCreatePage';
import { EmployeesPage } from './pages/employees/EmployeesPage';
import { EmployeesDetailsPage } from './pages/employees/EmployeesDetailsPage';
import { EmployeesCreatePage } from './pages/employees/EmployeesCreatePage';
import { ProductsPage } from './pages/products/ProductsPage';
import { ProductsDetailsPage } from './pages/products/ProductsDetailsPage';
import { ProductsCreatePage } from './pages/products/ProductsCreatePage';
import { SalesPage } from './pages/sales/SalesPage';
import { SalesDetailsPage } from './pages/sales/SalesDetailsPage';
import { SalesCreatePage } from './pages/sales/SalesCreatePage';
import { SuppliersPage } from './pages/suppliers/SuppliersPage';
import { SuppliersDetailsPage } from './pages/suppliers/SuppliersDetailsPage';
import { SuppliersCreatePage } from './pages/suppliers/SuppliersCreatePage';
import { CommentsCreatePage } from './pages/comments/CommentsCreatePage';
import { AuthProvider, useAuth } from './context/AuthProvider';
import { Provider } from 'react-redux'
import { store } from './app/store';

function App() {
  const { user } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />

          {user ? (
            <>
              <Route element={<Layout />}>
                {/* PRINCIPAL */}
                <Route path='/home' element={<Dashboard />} />

                {/* BILLS */}
                <Route path='/bills' element={<BillsPage />} />
                <Route path='/bills/:id' element={<BillsDetailsPage />} />
                <Route path='/bills/create' element={<BillsCreatePage />} />

                {/* COMMENTS */}
                <Route path='/comments' element={<CommentsPage />} />
                <Route path='/comments/:id' element={<CommentsDetailsPage />} />
                <Route path='/comments/create' element={<CommentsCreatePage />} />

                {/* CUSTOMERS */}
                <Route path='/customers' element={<CustomersPage />} />
                <Route path='/customers/:id' element={<CustomersDetailsPage />} />
                <Route path='/customers/create' element={<CustomersCreatePage />} />

                {/* EMPLOYEES */}
                <Route path='/employees' element={<EmployeesPage />} />
                <Route path='/employees/:id' element={<EmployeesDetailsPage />} />
                <Route path='/employees/create' element={<EmployeesCreatePage />} />

                {/* PRODUCTS */}
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/products/:id' element={<ProductsDetailsPage />} />
                <Route path='/products/create' element={<ProductsCreatePage />} />

                {/* SALES */}
                <Route path='/sales' element={<SalesPage />} />
                <Route path='/sales/:id' element={<SalesDetailsPage />} />
                <Route path='/sales/create' element={<SalesCreatePage />} />

                {/* SUPPLIERS */}
                <Route path='/suppliers' element={<SuppliersPage />} />
                <Route path='/suppliers/:id' element={<SuppliersDetailsPage />} />
                <Route path='/suppliers/create' element={<SuppliersCreatePage />} />

              </Route>
            </>
          ) : null}
        </Routes>
      </BrowserRouter>
    </>
  )
}


const AppWithAuthProvider = () => (
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);

export default AppWithAuthProvider
