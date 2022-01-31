# Reading form data in a guard

Every now and again you may find that you want to read the properties send in a form-data request inside a guard. Because guards run before interceptors, the `FileInterceptor` from Nest won't cut it, and we'll need to read the incoming data in a different fashion. The quickest and easiest way to do this is to bind `multer` as a middleware for the specified route so that on the incoming request, before the guard is hit, the request is already parsed and ready for consumption.
