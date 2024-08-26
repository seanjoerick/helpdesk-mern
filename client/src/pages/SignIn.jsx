import React from 'react'
import { Link } from 'react-router-dom'

export default function SignIn() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        alt="Help Desk"
        src="data:image/jpeg;base64,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"
        className="mx-auto h-10 w-auto"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder=" @gmail.com"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder=" Password"
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
          Dont have an account?{' '}
          <Link to="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign Up
          </Link>
        </p>
    </div>
  </div>
  )
}
