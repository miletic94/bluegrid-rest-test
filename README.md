To test locally run ` npm install` and then `npm start`

Send GET request to [http/localhost:3000/api/files]()

I realized data is not that big at all. So I can use sync operations and I don't need the database. Both database and async operations when dealing would add more complexity and I decided to keep it simple, because I can.
In next iterations, I will assume that the data is much bigger: millions of lines. In that case more complex async streaming would be necessary, data sharding, parallel processing etc. At first I thought that would be necessary here, but luckily, it wasn't
