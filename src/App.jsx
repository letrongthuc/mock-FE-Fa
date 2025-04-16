import { Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes/user';
import ScrollToTop from './components/scroll-to-top';
import PrivateRoute from './components/private-routes';
import { ProductProvider } from './components/product-context';

function App() {
  return (
    <div>
      <ProductProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => {
            const Layout = route.layout || (({ children }) => <>{children}</>);
            return (
              <Route
                key={index}
                path={route.path}
                element={<Layout>{route.element}</Layout>}
              />
            );
          })}

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            {privateRoutes.map((route, index) => {
              const Layout = route.layout || (({ children }) => <>{children}</>);
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Layout>{route.element}</Layout>}
                />
              );
            })}
          </Route>
        </Routes>
      </ProductProvider>
    </div>
  );
}

export default App;
