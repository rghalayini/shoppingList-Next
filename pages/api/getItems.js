import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("shoppingListDatabase");

       const items = await db
           .collection("Items")
           .find({})
           .toArray();

       res.json(items);
   } catch (e) {
       console.error(e);
   }
};