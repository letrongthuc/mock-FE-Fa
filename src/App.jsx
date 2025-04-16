import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <ProductProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          {publicRoutes.map((route, index) => {
            const Layout = route.layout;
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
            {privateRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element} // Đã bọc layout sẵn
              />
            ))}
          </Route>
        </Routes>
      </ProductProvider>
    </div>
  );
}
