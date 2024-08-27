import React from 'react'



export default function Profile() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Profile
        </h2>
        <img
          src='https://via.placeholder.com/256'
          alt="Profile"
          className="mx-auto mt-5 mb-2 h-12 w-12 rounded-full"
        />
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit="" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                // defaultValue={currentUser.email}
                readOnly
                required
                autoComplete="email"
                placeholder=" name@example.com"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                 // defaultValue={currentUser.name}
                 placeholder=" e.g., John Smith"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange=''
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Update Password</label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder=" Password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange=''
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
             Update
            </button>
          </div>
        </form>
        <div className='text-red-600 cursor-pointer mt-3'>
          {/* <span onClick={openModal}>Delete Account</span> */}
           <span >Delete Account</span>
        </div>
      </div>
          
      {/* {error && (
        <p className='text-red-700 mt-3 text-center'>{error}</p>
      )}

      {updateSuccess && (
        <p className='text-green-700 mt-3 text-center'>{updateSuccess}</p>
      )} */}
      {/* <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
      /> */}
    </div>
  )
}
