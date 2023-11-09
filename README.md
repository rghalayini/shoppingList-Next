## Description of the app

This is a shopping list app. The UI is an exact copy of the same app done through Mongoose and a server/client architecture. The other app is found [in this repository](https://github.com/rghalayini/shoppingLst).
This app has been rewritten in Next.js in order to be deployed on netlify or Vercel since they do not allow to deploy server/client architecture and onrender was very slow.
The user can add items to the list, and delete them once they are purchased. It is created using Next.js and MongoDB.

[Check it here](https://rs-shoppinglist.netlify.app/) 


- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## How to use

If you pull this code, you need to have a working MongoDB database.

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster. Make sure you do not have special characters in the password otherwise it won't work.
- `NEXT_PUBLIC_BASE_URL` - This is to remove the dependency on the localhost URL in the getServerSideProps function, because we should use relative paths or absolute URLs instead. In vercel, replace this with the url of your site. 

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

For more info and guidelines on how to set up the connection to MongoDB, check out this [tutorial](https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/). 

For more info about MongoDB and Next.js, check out this more comprehensive [tutorial](https://blog.openreplay.com/a-complete-guide-to-nextjs-plus-mongodb/) for explanation.