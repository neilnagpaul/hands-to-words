
import { parse } from 'url'

export default ({ url }, res) => {
    let { query: { json } } = parse(url, true)
    json = JSON.parse(json)
    res.end()
}
