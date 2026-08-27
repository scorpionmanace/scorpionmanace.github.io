import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JSONParser from '../components/JSONParser';

describe('JSONParser', () => {
  it('beautifies valid JSON', async () => {
    const user = userEvent.setup();
    render(<JSONParser />);

    await user.type(screen.getByLabelText('Input'), '{{"a":1}');
    await user.click(screen.getByRole('button', { name: /validate & format/i }));

    expect((screen.getByLabelText('Formatted') as HTMLTextAreaElement).value).toBe(
      '{\n  "a": 1\n}',
    );
  });

  it('reports invalid JSON instead of emitting output', async () => {
    const user = userEvent.setup();
    render(<JSONParser />);

    await user.type(screen.getByLabelText('Input'), 'not json');
    await user.click(screen.getByRole('button', { name: /validate & format/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/invalid json/i);
    expect((screen.getByLabelText('Formatted') as HTMLTextAreaElement).value).toBe('');
  });

  it('disables the action until there is input', () => {
    render(<JSONParser />);
    expect(screen.getByRole('button', { name: /validate & format/i })).toBeDisabled();
  });
});
