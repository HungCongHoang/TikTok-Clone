import type { NextApiRequest, NextApiResponse } from 'next';
import { allUsersQuery, singleUserQuery } from './../../utils/queries';

import { uuid } from 'uuidv4'
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  if (req.method === 'GET') {
    const query = allUsersQuery();
    const data = await client.fetch(query);

    res.status(200).json(data);
  }
  else if (req.method === 'PUT') {
    const { postId,userId, follow } = req.body;

    const data = 
    follow ? await client
      .patch(postId)
      .setIfMissing({ follows: [] })
      .insert('after', 'follows[-1]', [
        {
          _key: uuid(),
          _ref: userId,
        },
      ])
      .commit()
    : await client
      .patch(postId)
      .unset([`follows[_ref=="${userId}"]`])
      .commit();

    res.status(200).json(data);
  }
}