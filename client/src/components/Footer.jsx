import React from 'react';

export default function Footer() {
  return (
<footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-gray-800 border-t border-gray-600 shadow md:flex md:items-center md:justify-between md:p-6">
    <span className="text-sm text-gray-400 sm:text-center">© 2023 <a href="https://flowbite.com/" className="hover:underline text-gray-300">Flowbite™</a>. All Rights Reserved.</span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
        <li>
            <a href="#" className="hover:underline me-4 md:me-6 text-gray-300">About</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6 text-gray-300">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6 text-gray-300">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline text-gray-300">Contact</a>
        </li>
    </ul>
</footer>
  );
}
