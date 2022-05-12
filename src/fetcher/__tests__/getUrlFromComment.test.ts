import {getUrlFromComment} from '../commentsHelper'

describe('getUrlFromComment', () => {
  it('should fallback when comment does not exist', () => {
    const result = getUrlFromComment(undefined)
    expect(result).toBeUndefined()
  })

  it('should fallback when comment has no body', () => {
    const result = getUrlFromComment({
      id: 0,
      node_id: '',
      url: '',
      html_url: '',
      user: {
        name: '',
        email: '',
        login: '',
        id: 0,
        node_id: '',
        avatar_url: '',
        gravatar_id: '',
        url: '',
        html_url: '',
        followers_url: '',
        following_url: '',
        gists_url: '',
        starred_url: '',
        subscriptions_url: '',
        organizations_url: '',
        repos_url: '',
        events_url: '',
        received_events_url: '',
        type: '',
        site_admin: false,
        starred_at: ''
      },
      created_at: '',
      updated_at: '',
      issue_url: '',
      author_association: 'COLLABORATOR'
    })
    expect(result).toBeUndefined()
  })
})
