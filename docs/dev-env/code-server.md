# Setting up an cloud dev environment in Code Server

While Gitpod is recommended option for having an development environment in the cloud, but if you prefer to stay in your favorite PaaS service that supports Dockerfiles, you can use `code-server` option.

## Deploying `code-server`

1. [Use this template](https://github.com/code-server-boilerplates/nodejs-yarn/generate) to get started.
2. See `guides` directory for documentation on how to deploy for your favorite PaaS service.
3. For PaaS deployments, set the `GIT_REPO` variable into `https://github.com/YOUR-USERNAME/oasis` after [forking the repo](https://github.com/oasis-sh/oasis/fork). For VPS deployments, copy your machine's public IP and go to it. (Because we use the `--link` flag on startup, you need to authenicate your GitHub account to `cdr.io` first.)
4. Profit!

## Next steps

See [the rest of our contributing gudelines](/docs/guidelines/CONTRIBUTING.md) for next steps, among other things.

## Updating `code-server`

### PaaS deployments

1. Do `touch .trigget-deploy` on your local copy of your `code-server-boilerplates/nodejs-yarn` repo.
2. Check [image tags for `codercom/code-server`][image-tags] and look for latest version released (tl;dr: Not `latest` tag, use latest version (e.g. `3.9.3` as of time of writing). Edit L2 of the Dockerfile and replace the text after `:` with the latest version you see after the `latest` tag
2. Commit and push.
3. Depending on your PaaS provider, you may need to manually press the deploy button or do the deploy command using their CLI. (Divio users, probably.)

[image-tags]: https://hub.docker.com/r/codercom/code-server/tags?page=1&ordering=last_updated

### VPS deployments

Just re-run the install script. Don't worry, your data is fine.

```sh
curl -fsSL https://code-server.dev/install.sh | sh
```
