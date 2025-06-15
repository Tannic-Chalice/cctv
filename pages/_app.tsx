// pages/_app.tsx
import type { AppProps } from 'next/app';
import Header from '../components/header'; // Ensure component file names use PascalCase
import Footer from '../components/footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="app-container">
      <Header />
      <main style={{ flex: 1 }}>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
  