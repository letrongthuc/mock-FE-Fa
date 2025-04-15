import {
  Home,
  NewArrivals,
  Clothing,
  Accessories,
  Contact,
  About,
  LogIn,
  SignUp,
  Sales,
  Cart,
  Favorites,
  Profile,
} from '../../pages/user';
import { DefaultLayout } from '../../layouts/user';
import ItemDetail from '../../components/item-detail';
import CategoryProductList from '../../components/category-product-list';
import VerifyEmail from '../../pages/user/verify-email';

const publicRoutes = [
  { path: '/', element: <Home />, layout: DefaultLayout },
  { path: '/new-arrivals', element: <NewArrivals />, layout: DefaultLayout },
  { path: '/clothing', element: <Clothing />, layout: DefaultLayout },
  { path: '/accessories', element: <Accessories />, layout: DefaultLayout },
  { path: '/contact', element: <Contact />, layout: DefaultLayout },
  { path: '/about', element: <About />, layout: DefaultLayout },
  { path: '/login', element: <LogIn />, layout: DefaultLayout },
  { path: '/signup', element: <SignUp />, layout: DefaultLayout },
  { path: '/sales', element: <Sales />, layout: DefaultLayout },
  { path: '/products/:name', element: <ItemDetail />, layout: DefaultLayout },
  { path: '/:category/:productName', element: <CategoryProductList />, layout: DefaultLayout },
  { path: '/user/verify-email', element: <VerifyEmail />, layout: DefaultLayout }, // ✅ Đúng URL từ email
];

const privateRoutes = [
  { path: '/cart', element: <Cart />, layout: DefaultLayout },
  { path: '/favorites', element: <Favorites />, layout: DefaultLayout },
  { path: '/profile', element: <Profile />, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes };
