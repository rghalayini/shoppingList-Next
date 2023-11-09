import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("shoppingListDatabase");
    const { id } = req.query;

    const item = await db.collection("Items").findOne({
      _id: new ObjectId(id),
    });

    res.json(item);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
