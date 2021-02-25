import { render, screen, waitFor } from '@testing-library/react';

import UserCard from './UserCard';

describe('<UserCard />', () => {
  it('fetch user and displays its data', async () => {
    render(<UserCard />);
    const button = screen.getByText(/fetch user/i);
    button.click();
    await waitFor(() => screen.getByText(/hello Leanne Graham/i));
    screen.getByText(/User e-mail: Sincere@april.biz/i);
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/user fetched/i);
  });
});
