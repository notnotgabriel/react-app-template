import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';

import { server } from '../../__mocks__/server';
import UserCard from './UserCard';

describe('<UserCard />', () => {
  it('fetch user and displays its data', async () => {
    render(<UserCard />);
    const button = screen.getByText(/^fetch user$/i);
    button.click();

    await waitFor(() => screen.getByText(/hello Leanne Graham/i));
    screen.getByText(/User e-mail: Sincere@april.biz/i);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/user fetched/i);
    expect(screen.queryByRole('alert')).toBe(null);
  });

  it('should show error message', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/users/:id',
        (_, res, ctx) => res(ctx.status(500)),
      ),
    );
    render(<UserCard />);
    const button = screen.getByText(/^fetch user$/i);
    button.click();

    await waitFor(() => screen.getByRole('alert'));

    expect(screen.getByRole('alert')).toHaveTextContent('Failed to fetch user');
  });
});
