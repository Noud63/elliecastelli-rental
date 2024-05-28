
import PropertySearchForm from '@/components/PropertySearchForm';
import Properties from '@/components/Properties';

const PropertiesPage = async () => {

  return (
    <>
      <section className="pt-[120px] bg-gradient-to-r from-slate-900 via-blue-500 to-slate-900 pb-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>

      <Properties />
    </>
  ); 
}

export default PropertiesPage
