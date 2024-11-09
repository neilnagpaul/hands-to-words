import { sql } from "@vercel/postgres";
import { parse } from 'url'

export default async ({ url, headers: { "x-vercel-id": id } }, res) => {
    let { query: { json } } = parse(url, true)
    await sql`INSERT INTO data (id, json) VALUES (${id}, ${json})`
    json = JSON.parse(json)
    res.end("Success")
}
