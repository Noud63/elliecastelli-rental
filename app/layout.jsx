import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";
import { GlobalProvider } from '@/context/GlobalContext';


export const metadata = {
    title: "PorpertyPulse | Find the perfect Rental",
    description: "Find the perfect Rental",
    keywords: "rental, find rentals, find properties"
}

const MainLayout = ({children}) => {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-slate-950 via-blue-500/50 to-slate-950">
        <div className="fixed left-0 top-0 h-screen w-full bg-[url('/images/realestatebg.jpg')] bg-cover opacity-10 -z-[999]" />
        <GlobalProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ToastContainer />
          </AuthProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}

export default MainLayout
