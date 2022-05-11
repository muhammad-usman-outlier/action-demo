import * as Core from '@actions/core'

export const getToken = Core.getInput('token') 
export const getEmail = Core.getInput('email') 
export const getPassword = Core.getInput('password') 

export const regexPattern = '(?<=dashboard.render.com\/static\/srv-)[\s\S][^!.]*'
export const regexFlags = 'gim'