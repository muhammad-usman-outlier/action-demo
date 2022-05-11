# GitHub Render Deploy and Dispatch Action

This action fetches Render deploy links from PR, awaits their deploy and 
dispatches the preview to a given repo using repository_dispatch.

## Inputs

## `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

## `time`

The time we greeted you.

## Example usage

uses: actions/hello-world-javascript-action@v1.1
with:
  who-to-greet: 'Mona the Octocat'