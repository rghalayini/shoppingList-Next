import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("shoppingListDatabase");
    const { _id, itemName } = req.body;

    const post = await db.collection("Items").insertOne({
      _id,
      itemName,
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
