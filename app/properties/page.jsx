
import PropertySearchForm from '@/components/PropertySearchForm';
import Properties from '@/components/Properties';

const PropertiesPage = async () => {

  return (
    <>
      <section className="pt-[120px] pb-2 mt-4 xl:mt-0 xl:pt-[100px]">
        <div className="max-w-7xl mx-auto px-4 flex-col items-start sm:px-6 lg:px-8 hidden max-xl:flex">
          <PropertySearchForm />
        </div>
      </section>

      <Properties />
    </>
  ); 
}

export default PropertiesPage
