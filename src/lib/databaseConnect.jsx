
const uri = `mongodb+srv://${process.env.DBNAME}:${process.env.DBPASS}@clustermyfirstmongodbpr.2cecfoe.mongodb.net/?appName=ClusterMyFirstMongoDbProject`;
const dbname = process.env.DBNAME;
export const collections = {
  SERVICES: "services",
  USER: "users",
  CAREGIVERS:"caregivers"
};

const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbConnect = (cname) => {
  return client.db(dbname).collection(cname);
};
