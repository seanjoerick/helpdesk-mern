import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/admin-dashboard' },
  { name: 'Accounts', href: '/accounts' },
  { name: 'Settings', href: '/settings' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
  const location = useLocation();
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await fetch('/server/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/sign-in')
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to='/'>
                  <img
                    alt="Help desk"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUPT3pWQb7bPoo9f-blaLMAHC79K6eGSsTrQ&s"
                    className="h-8 w-8 rounded-full"
                  />
                  </Link>
                </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={location.pathname === item.href ? 'page' : undefined}
                      className={classNames(
                        location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>
              
                <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="Profile"
                      src={currentUser?.avatar || 'https://via.placeholder.com/256'}
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                  <MenuItem>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                  </MenuItem>
                  <MenuItem>
                    <button onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
                
            </div>
          </div>
        </div>
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                aria-current={location.pathname === item.href ? 'page' : undefined}
                className={classNames(
                  location.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
