
import { MongoClient, ServerApiVersion } from 'mongodb'

export const dbCollection = {
    UserCollection : "All-Users",
//   Services : "Services",
//   bookingCollection : "Bookings"
}

export const dbConnect = (collectionName) => {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
   const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
return client.db(process.env.DB_NAME).collection(collectionName)
}





