import { render, screen, fireEvent } from '@testing-library/react';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  it('renders with placeholder', () => {
    render(<InputComponent onEnter={jest.fn()} placeholder="Search..." />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('calls onEnter when Enter is pressed', () => {
    const mockOnEnter = jest.fn();
    render(<InputComponent onEnter={mockOnEnter} />);

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', chjarCode: 13 });

    expect(mockOnEnter).toHaveBeenCalledTimes(1);
  });

  it('does not call onEnter on other keys', () => {
    const mockOnEnter = jest.fn();
    render(<InputComponent onEnter={mockOnEnter} />);

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'A', code: 'KeyA' });

    expect(mockOnEnter).not.toHaveBeenCalled();
  });
});
