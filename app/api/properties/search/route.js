import connectDB from "@/config/database";
import Property from "@/models/Property";

export const dynamic = "force-dynamic"

// GET /api/properties/search
export const GET = async(request) => {
    try {
        await connectDB()
        const { searchParams } = new URL(request.url)
        const location = searchParams.get('location')
        const propertyType = searchParams.get('propertyType')

       const locationPattern = new RegExp(location, 'i')

       //Match location pattern against database fields (location is an object)
       let query = {
        $or: [
            {name: locationPattern},
            {description: locationPattern},
            {'location.street': locationPattern},
            {'location.city': locationPattern},
            {'location.state': locationPattern},
            {'location.zipcode': locationPattern},
        ]
       }

       // Only check for property if it is not 'All'
       if(propertyType && propertyType !== 'All'){
          const typePattern = new RegExp(propertyType, 'i')
          query.type = typePattern
       }

       console.log(query)

       const properties = await Property.find(query)

       return new Response(JSON.stringify(properties), {status:200})

    } catch (error) {
        console.log(error)
         return new Response(JSON.stringify("Something went wrong!"), {
           staus: 500,
         });
    }
}

// The query object is constructed to search across multiple fields in a MongoDB document. It uses the $or operator to search for the locationPattern across 
// various fields (name, description, and several fields under location like street, city, state, and zipcode).
// If propertyType is provided and it's not equal to 'All', a new regex (typePattern) is created for propertyType, similar to locationPattern, 
// but this time it\s used to match against the type field of the documents. 
// This is a filter added outside the $or array, meaning it\s applied in addition to the location-based filters.
// Finally, Property.find(query) uses the constructed query object to find documents in the Property collection that match the criteria. 
// The search is case-insensitive for both location and propertyType, and it can match any of the specified fields with the given patterns.
// Summary
// The regex is used to create patterns for filtering based on user input from the URL's query string, making the search case-insensitive. 
// The Mongoose query then applies these patterns to find documents in a MongoDB collection, allowing for flexible searches across multiple fields. 
// If a propertyType is specified and it's not 'All', 
// it further narrows down the search results to match the specified property type.