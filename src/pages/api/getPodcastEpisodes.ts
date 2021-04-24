import { VercelRequest, VercelResponse } from '@vercel/node'
import server from '../../../server.json'

export default (request: VercelRequest, response: VercelResponse) => {
  if(request.query.slug) {
    const { slug } = request.query

    const episode = server.episodes.find(episode => episode.id === slug)

    return response.json(episode)
  }


  return response.json(server.episodes)
}