# NestJS Basic Authentication

Just a simple application to show basic authentication working.

With Basic authentication, we can send requests with an `Authorization` header
that has a value of `Basic <bas64Encodeduser:passString>`. To generate this
base64 encoded value, I used the Node REPL. The credentials in this example are
hard coded. **DO NOT DO THIS IN PRODUCTION**.

To test the applciation after running it with `pnpm nx run basic-auth:serve`
send a request with your favorite HTTP client with the header `Authorization`,
that has value `Basic bmVzdDpOM3N0UjBjayQ= to the `GET /api/protected` endpoint
and you'll get a JSON response of `{ authenticated: true }`.
