import { render, screen } from '@testing-library/react';

import App from './App';

describe('<App>', () => {
  it('should render greetings', () => {
    render(<App />);
    const greetings = screen.getByText(/^app$/i);
    expect(greetings).toBeVisible();
  });
});
