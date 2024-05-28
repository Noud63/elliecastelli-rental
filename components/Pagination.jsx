import React from 'react'

const Pagination = ({page, pageSize, totalItems, onPageChange}) => {

    const totalPages = Math.ceil(totalItems / pageSize)

    const handlePageChange = (newPage) => {
         if(newPage >= 1 && newPage <= totalPages){
            onPageChange(newPage)
         }
    }


  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className="w-[100px] mr-2 px-2 py-1 border border-gray-300 rounded shadow-sm "
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        className="w-[100px] ml-2 px-2 py-1 border border-gray-300 rounded shadow-sm"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
}

export default Pagination
