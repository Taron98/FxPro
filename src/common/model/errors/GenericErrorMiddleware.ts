/** @format */

import { StatusError } from './StatusError';

export default app => {
  app.use((error, _, response, next) => {
    if (error) {
      response.contentType('application/json');
      if (error instanceof StatusError) {
        response.statusCode = error.status;
        response.end(
          JSON.stringify({
            status: error.status,
            name: error.name,
            message: error.message,
          }),
        );
      } else {
        response.statusCode = 500;
        if (process.env.NODE_ENV === 'production') {
          response.end(
            JSON.stringify({
              status: 500,
              name: 'InternalServerError',
              message: 'Something went wrong.',
            }),
          );
        } else {
          response.end(
            JSON.stringify({
              status: 500,
              name: 'InternalServerError',
              message: error.toString(),
            }),
          );
        }
      }

      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }
    }
  });
};
