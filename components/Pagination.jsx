import React from 'react'

const Pagination = ({page, pageSize, totalItems, onPageChange}) => {

    const totalPages = Math.ceil(totalItems / pageSize)

    const handlePageChange = (newPage) => {
         if(newPage >= 1 && newPage <= totalPages){
            onPageChange(newPage)
         }
    }


  return (
    <section className="w-full mx-auto flex justify-center items-center my-8 pt-8">
      <div className="w-full max-w-[380px] flex justify-between max-md:w-full">

        <button
          className="w-[100px] px-2 py-1 bg-slate-950 rounded-lg shadow-sm text-blue-200"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>

        <span className="w-[100px] flex justify-center font-medium">
          <span className="mr-1">Page</span> {page} of {totalPages}
        </span>

        <button
          className="w-[100px] ml-2 px-2 py-1 bg-slate-950 text-blue-200 rounded-lg shadow-sm"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>

      </div>
    </section>
  );
}

export default Pagination
