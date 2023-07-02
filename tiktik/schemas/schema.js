import {createSchema} from 'sanity'
import {schemaTypes} from '.'
import post from './post'
import user from './user'
import comment from './comment'
import postedBy from './postedBy'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([post, user, comment, postedBy]),
})
