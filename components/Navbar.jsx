"use client"
import React,{useState, useEffect} from 'react'
import Image from 'next/image';
import { redirect, usePathname } from 'next/navigation';
import logo from "@/assets/images/ellielogo.png";
import logo2 from "@/assets/images/ellielogo3.png";
import profileDefault from "@/assets/images/profile.png";
import Link from 'next/link';
import { signIn, signOut, useSession, getProviders} from 'next-auth/react'
import UnreadMessageCount from './UnreadMessageCount';
import PropertySearchForm from './PropertySearchForm';
import scroll from '@/utils/scroll';
import { useParams } from 'next/navigation';
   
const Navbar = () => {

  const {data:session} = useSession()
  const profileImage = session?.user?.image

  const scrolled = scroll();

const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

const [color, setColor] = useState("")
const [buttonColor, setButtonColor] = useState("")
// const [providers, setProviders] = useState(null)

const pathname = usePathname()

// useEffect(() => {
//   const setAuthProviders = async() => {
//     const res = await getProviders()

//     setProviders(res)
    
//   }
//     setAuthProviders()
// },[])


return (
  <nav
    className={`${
      scrolled ? "-translate-y-full" : "translate-y-0"
    } w-full fixed top-0 shadow-[0px_2px_4px_rgba(0,0,0,.5)] z-[999] transform ease-in-out duration-500`}
  >
    <div className="w-full flex justify-between px-2 sm:px-6 lg:px-8">
      <div className="w-full relative flex h-20 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
          {/* <!-- Mobile menu button--> */}
          <button
            type="button"
            id="mobile-dropdown-button"
            className="relative inline-flex items-center justify-center rounded-md p-2 text-blue-200 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            <svg
              className="block h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <div
          className={`w-[250px] flex items-center justify-center md:items-stretch md:justify-start max-md:w-full ${
            session?.user ? "max-md:justify-center mr-0" : "max-md:justify-end"
          }  max-md:mr-4`}
        >
          {/* <!-- Logo --> */}
          <Link className="flex flex-shrink-0 items-center" href="/">
            <Image className="h-12 w-auto" src={logo2} alt="PropertyPulse" />

            <div
              className={`max-md:hidden flex text-white ml-2 flex-col text-center`}
            >
              <span className="font-ChopinScript text-4xl ">
                Ellie Castelli
              </span>
              <span className="text-[10px]">- Rental Division -</span>
            </div>
          </Link>
        </div>

        <div className="max-xl:hidden flex flex-1 pl-8 ">
          <PropertySearchForm />
        </div>

        {/* <!-- Desktop Menu Hidden below md screens --> */}
        <div className="hidden md:ml-6 md:flex items-center">
          <div className="flex space-x-2">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "border-b-2 border-white" : ""
              } text-white px-5 py-3`}
            >
              Home
            </Link>

            <Link
              href="/properties"
              className={`${
                pathname === "/properties" ? "border-b-2 border-white" : ""
              } text-white px-5 py-3`}
            >
              Properties
            </Link>

            {session && (
              <Link
                href="/properties/add"
                className={`${
                  pathname === "/properties/add"
                    ? "border-b-2 border-white"
                    : ""
                } text-white px-5 py-3`}
              >
                Upload
              </Link>
            )}
          </div>
          {/* <!-- Right Side Menu (Logged Out) --> */}
          {!session && (
            <div className="hidden md:block">
              <div className="flex items-center">
                <Link
                  href="/signIn"
                  className="flex items-center text-white  
                      px-5 py-3"
                >
                  <span
                    className={`${
                      pathname === "/signIn" ? "border-b-2 border-white" : ""
                    } text-white block  px-3 py-2 text-base`}
                  >
                    Login
                  </span>
                </Link>

                <Link
                  href="/register"
                  className={`${
                    pathname === "/register" ? "border-b-2 border-white" : ""
                  } text-white block  px-3 py-2 text-base`}
                >
                  <span className="text-white">Register</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* <!-- Right Side Menu (Logged In) --> */}
        {session && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
            <Link href="/messages" className="relative group">
              <button
                type="button"
                className="relative rounded-full flex justify-center items-center bg-slate-950 w-8 h-8 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="lightblue"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <UnreadMessageCount session={session} />
            </Link>
            {/* <!-- Profile dropdown button --> */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none "
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={profileImage || profileDefault}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt=""
                  />
                </button>
              </div>

              {/* <!-- Profile dropdown --> */}
              {isProfileMenuOpen && (
                <div
                  id="user-menu"
                  className="dropDownMenu absolute -right-8 top-[57px] w-48  bg-gradient-to-t from-blue-100 to-white py-1 shadow-lg focus:outline-none px-2"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <Link
                    href="/profile"
                    className="block px-2 py-2 text-sm text-blue-950 border-b border-dotted border-slate-800"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/properties/saved"
                    className="block px-2 py-2 text-sm text-blue-950 border-b border-dotted border-slate-800"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    Saved Properties
                  </Link>
                  <button
                    className="block px-2 py-2 text-sm text-blue-950"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut({ callbackUrl: "/", redirect: true });
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>

    {/* <!-- Mobile menu, show/hide based on menu state. --> */}
    {isMobileMenuOpen && (
      <div className="" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2 relative bg-slate-900/70">
          {/* <div className="absolute left-0 top-0 h-full w-full bg-[url('/images/realestatebg.jpg')] bg-right opacity-100 -z-[999]" /> */}
          <Link
            href="/"
            className={`${
              pathname === "/" ? "border-b border-blue-200" : ""
            } text-blue-200 block px-3 py-2 text-base`}
          >
            Home
          </Link>
          <Link
            href="/properties"
            className={`${
              pathname === "/properties" ? "border-b border-blue-200" : ""
            } text-blue-200 block  px-3 py-2 text-base`}
          >
            Properties
          </Link>
          {session && (
            <Link
              href="/properties/add"
              className={`${
                pathname === "/properties/add"
                  ? "border-b-2 border-blue-200"
                  : ""
              } text-blue-200 block px-3 py-2 text-base`}
            >
              Add Property
            </Link>
          )}

          <Link
            href="/signIn"
            className={`${
              pathname === "/signIn" ? "border-b border-blue-200" : ""
            } text-blue-200 block px-3 py-2 text-base`}
          >
            Login
          </Link>

          <Link
            href="/register"
            className={`${
              pathname === "/register" ? "border-b border-blue-200" : ""
            } text-blue-200 block px-3 py-2 text-base`}
          >
            Register
          </Link>

          {/* {!session &&
            providers &&
            Object.values(providers).map((provider, index) => (
              <button
                onClick={() => signIn(provider.id)}
                key={index}
                className="flex items-center text-white rounded-md px-3 py-2"
              >
                <FaGoogle className="text-white" />
                <span>Login or Register</span>
              </button>
            ))} */}
        </div>
      </div>
    )}
  </nav>
);
}

export default Navbar

