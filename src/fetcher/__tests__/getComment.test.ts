import {getComment} from '../commentsHelper'
import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types'

describe('getComment', () => {
  it('should return undefined when there are no comments', () => {
    const comments: RestEndpointMethodTypes['issues']['listComments']['response']['data'] = []
    const pattern = ''
    const result = getComment({comments, pattern})
    expect(result).toBeUndefined()
  })
})
