# Bull Producer NestJS App

This NestJS Application is responsible for enqueuing jobs onto a `test` queue. A Job will be enqueued once calling `POST /produce`.

Ensure redis is running either on the host machine or run it with `docker-compose up`.

Start the NestJS Application with `npx nx serve bull-separate-apps-producer`.
