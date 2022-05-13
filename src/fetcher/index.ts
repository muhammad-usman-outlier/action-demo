/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import {context, getOctokit} from '@actions/github'
import {getComment, getUrlFromComment} from './commentsHelper'
import {RestEndpointMethodTypes} from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types'
import {
  commentPattern,
  getToken,
  previewURLIndex,
  progressURLIndex,
  regexFlags,
  regexPattern
} from '../constants'

interface FetchCommentsProps {
  client: any
  issueNumber: number | undefined
}

async function fetchComments({
  client,
  issueNumber
}: FetchCommentsProps): Promise<
  RestEndpointMethodTypes['issues']['listComments']['response']['data']
> {
  try {
    const {data: comments} = await client.issues.listComments({
      ...context.repo,
      issue_number: issueNumber
    })
    return comments
  } catch (error) {
    console.warn('No issues found for id: ' + issueNumber)
    return []
  }
}

interface StringMap {
  [key: string]: string | undefined
}

type ExtractURLs = StringMap | void

export async function extractURLs(): Promise<ExtractURLs> {
  const gitHubToken = getToken

  const client = getOctokit(gitHubToken)
  const issueNumber = context.payload.pull_request?.number

  const settings = {
    pattern: commentPattern?.[0],
    preview_index: previewURLIndex,
    progress_index: progressURLIndex
  }
  const comments = await fetchComments({client, issueNumber})
  const comment = getComment({comments, pattern: settings.pattern})

  if (comment) {
    console.info('Comment found')
    const previewURL = getUrlFromComment(comment, {
      index: settings.preview_index
    })
    const progressURL = getUrlFromComment(comment, {
      index: settings.progress_index
    })
    const regex = new RegExp(regexPattern, regexFlags ?? '')
    const matches: any = progressURL?.match(regex)
    console.info('Extracted Preview URL', previewURL)
    console.info('Extracted Progress URL', progressURL)
    console.info('Extracted Service ID', matches[0])
    return {serviceId: matches[0], previw: previewURL}
  }
  console.info('found_url', false)
}
