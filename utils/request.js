const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null


//Fetch all properties
async function fetchProperties({ showFeatured = false } = {}) {  // By default set to false or empty object, otherwise you get an error error
 
    const res = await fetch(`${apiDomain}/properties${showFeatured ? '/featured' : ""}`,{cache: 'no-store'}); // server component fetch req needs the full url http://localhost:3000/api
    if (!res.ok) {
      throw new Error("Failed to fetch data!");
    }
    return res.json();
  
}

//Fetch single property
async function fetchSingleProperty(id) {
  try {
    //handle the case where the domian is not available yet
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`); // server component fetch req needs the full url
    if (!res.ok) {
      throw new Error("Failed to fetch data!");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}


export { fetchProperties, fetchSingleProperty}

