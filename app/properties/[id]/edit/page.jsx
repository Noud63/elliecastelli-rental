import React from 'react'
import PropertyEditForm from '@/components/PropertyEditForm'

const page = () => {
  return (
    <section className="mt-2">
      <div className="container m-auto max-w-2xl py-24">
        <div className="signInBox bg-blue-100/20 mb-4 shadow-md rounded-md m-4 md:m-0 rounded-t-xl">
          <PropertyEditForm />
        </div>
      </div>
    </section>
  );
}

export default page
