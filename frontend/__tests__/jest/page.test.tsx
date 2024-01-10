import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../../src/app/settings/page';

test('making sure jest is configured properly', () => {
  expect(true).toBe(true);
});

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
