import { context, getOctokit } from '@actions/github'
import { getComment, getUrlFromComment } from './commentsHelper'
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types'
import { getToken } from '../constants'

async function fetchComments({
  client,
  issueNumber,
}): Promise<
  RestEndpointMethodTypes['issues']['listComments']['response']['data']
> {
  try {
    const { data: comments } = await client.issues.listComments({
      ...context.repo,
      issue_number: issueNumber,
    })
    return comments
  } catch (error) {
    console.warn('No issues found for id: ' + issueNumber)
    return []
  }
}

export async function extractURLs() {
  const gitHubToken = getToken
  const patterns = 'Follow its progress at'
  const previewURLIndex = 2
  const progressURLIndex = 3

  const client = getOctokit(gitHubToken)
  const issueNumber = context.payload.pull_request?.number

  let settings = {
    pattern: patterns?.[0],
    preview_index: previewURLIndex,
    progress_index: progressURLIndex,
  }
  const comments = await fetchComments({ client, issueNumber })
  const comment = getComment({ comments, pattern: settings.pattern })

  if (comment) {
    console.info('Comment found')
    const previewURL = getUrlFromComment(comment, {
      index: settings.preview_index,
    })
    const progressURL = getUrlFromComment(comment, {
      index: settings.progress_index,
    })
    console.info('Extracted Preview URL', previewURL)
    console.info('Extracted Progress URL', progressURL)
    return { preview: previewURL, progress: progressURL }
  }
  console.info('found_url', false)
}

export function serviceIdExtractor(
  url: any,
  regexPattern: string,
  regexFlags: string
) {
  const regex = new RegExp(regexPattern, regexFlags ?? '')
  const matches = url.match(regex)
  return matches[0]
}
