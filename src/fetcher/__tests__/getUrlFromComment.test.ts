import { getUrlFromComment } from '../commentsHelper'

describe('getUrlFromComment', () => {
  it('should fallback when comment does not exist', () => {
    const result = getUrlFromComment(undefined)
    expect(result).toBeUndefined()
  })

  it('should fallback when comment has no body', () => {
    const result = getUrlFromComment({})
    expect(result).toBeUndefined()
  })
})
