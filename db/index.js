import pg from "pg";
const { Pool, Client } = pg;

const pool = new Pool({
  user: 'jasonnam',
  host: 'localhost',
  database: 'ecap_database',
  password: 'jay0416hee',
  port: 5432,
})

console.log(await pool.query('SELECT * FROM customer LIMIT 1'))

const client = new Client({
  user: 'jasonnam',
  host: 'localhost',
  database: 'ecap_database',
  password: 'jay0416hee',
  port: 5432,
})
await client.connect()

console.log(await client.query('SELECT * FROM customer LIMIT 1'))

await client.end()


// export const query = async (text, params) => {
//   const start = Date.now()
//   const res = await pool.query(text, params)
//   const duration = Date.now() - start
//   console.log('executed query', { text, duration, rows: res.rowCount })
//   return res
// }


// export const getClient = async () => {
//   const client = await pool.connect()
//   const query = client.query
//   const release = client.release
//   // set a timeout of 5 seconds, after which we will log this client's last query
//   const timeout = setTimeout(() => {
//     console.error('A client has been checked out for more than 5 seconds!')
//     console.error(`The last executed query on this client was: ${client.lastQuery}`)
//   }, 5000)
//   // monkey patch the query method to keep track of the last query executed
//   client.query = (...args) => {
//     client.lastQuery = args
//     return query.apply(client, args)
//   }
//   client.release = () => {
//     // clear our timeout
//     clearTimeout(timeout)
//     // set the methods back to their old un-monkey-patched version
//     client.query = query
//     client.release = release
//     return release.apply(client)
//   }
//   return client
// }
