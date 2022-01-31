# Reading form data in a guard

Every now and again you may find that you want to read the properties send in a form-data request inside a guard. Because guards run before interceptors, the `FileInterceptor` from Nest won't cut it, and we'll need to read the incoming data in a different fashion. The quickest and easiest way to do this is to bind `multer` as a middleware for the specified route so that on the incoming request, before the guard is hit, the request is already parsed and ready for consumption.

## Binding multer as a middleware instead of an interceptor

To bind multer, have both `multer` and `@types/multer` installed, and in your bootstrap method add the following code

```ts
async function bootstrap() {
  const app = ...

  app.use('/path/to/route', multer(multerOptions).single('form-field'))

  ...

  app.listen(port)
}
```

In my case, the `/path/to/route` was `/api/form-data` and the `form-field` was `form`. 

## Reading the data in the guard

Now just as you usually would, you can read `req.body` inside the guard and have access to what you need. 

## Test this out locally

Clone the whole repo, install dependencies, and run `nx serve form-data-guard` (you may need `npm run`/`yarn`/`pnpm` before `nx` if `nx` is not installed globally)

In a separate terminal use

```sh
curl http://localhost:3333/api/form-data -F 'form=@package.json' -F 'foo=bar'
```

To get a 403 (body.foo and query.foo do not match) and

```sh
curl http://localhost:3333/api/form-data/?foo=bar -F 'form=@package.json' -F 'foo=bar'
```

to get a 200 success.
