import * as Core from '@actions/core'
import { extractURLs, serviceIdExtractor } from './fetcher'
import { getEmail, getPassword, regexFlags, regexPattern } from './constants'
import {
  createDeployment,
  findDeploy,
  findServer,
  getContext,
  logIn,
  waitForDeploy,
} from './render'

async function run(): Promise<void> {
  try {
    const {preview, progress} = extractURLs()
    const serviceId = serviceIdExtractor(progress, regexPattern, regexFlags)
    Core.info('Starting Render Wait Action')
    await logIn(getEmail, getPassword)
    const context = getContext()
    const serverId = await findServer(context, serviceId)
    const render = await findDeploy(context, serverId)
    const github = await createDeployment(context, render)
    await waitForDeploy({ render, github })
    Core.setOutput("comment_url", preview);
  } catch (error) {
    Core.setFailed(error.message)
  }
}

run()
