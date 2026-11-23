# qc-throwaway-db

Run a command against a disposable PostgreSQL database. The tool starts a Docker
container on a free loopback port, waits for PostgreSQL, runs your command with
`DATABASE_URL` set, then removes the container and its data volume. It returns
your command's exit code.

Use Node.js 24 and a running Docker daemon. From the project whose command you
want to run, use the Git commit of qc-throwaway-db you want to install.

```text
npx --yes github:shawrylk/qc-throwaway-db#<sha> -- npm test
```

The tool reads the optional `throwawayDb` settings in the current directory's
`qc.config.json`. It defaults to `postgres:17-alpine`, database `app`, and an
automatically selected port that avoids 5432. Use `--port` or `--database`
before `--` to override a setting for one run. Set `throwawayDb.schemaCommand`
to initialize the database before the command runs.

Extracted from [architecture-kit at `7883543`](https://github.com/shawrylk/architecture-kit/tree/7883543f506a93917600f1012605982ae63f8ed5).
