import React from 'react'
// import { FaSearch } from 'react-icons/fa';

const SearchModal = () => {
  return (
    <div className='flex flex-row justify-between' >
      <div class="relative">
  <input
    class="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
    id="username"
    type="text"
    placeholder="Search..."
  />
  <div class="absolute right-0 inset-y-0 flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {/* <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      /> */}
    </svg>
  </div>

  <div class="absolute left-0 inset-y-0 flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
</div>
    </div>
  )
}

export default SearchModal