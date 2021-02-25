import { rest } from 'msw';

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users/:id', (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
      }),
    ),
  ),
];
