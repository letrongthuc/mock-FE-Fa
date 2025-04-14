import { useState, useEffect } from 'react';
import Header from './header';
import NavBar from './nav-bar';
import Footer from './footer';

function DefaultLayout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header isScrolled={isScrolled} />
      <NavBar />
      <main className="flex-1 flex flex-col">
        <div className="flex-grow">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
