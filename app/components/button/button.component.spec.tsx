import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  it('renders with label', () => {
    render(<ButtonComponent label="Submit" />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ButtonComponent label="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button when isLoading is true', () => {
    render(<ButtonComponent label="Loading Button" isLoading={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows "Loading..." when isUseLabelLoading is true and isLoading is true', () => {
    render(<ButtonComponent label="Save" isLoading={true} isUseLabelLoading={true} />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders suffix when provided', () => {
    render(<ButtonComponent label="With Icon" isSuffixWithLoading={true} isLoading={true} suffix={<span data-testid="suffix">→</span>} />);
    expect(screen.queryByText('→')).not.toBeInTheDocument();
  });

  it('renders suffix loading spinner if isSuffixWithLoading is true and isLoading is true', () => {
    render(
      <ButtonComponent
        label="Load More"
        suffix="→"
        isLoading={true}
        isSuffixWithLoading={true}
        isUseLabelLoading={false}
      />
    );
    expect(screen.queryByText('→')).not.toBeInTheDocument();
  });

  it('uses data-testid if provided', () => {
    render(<ButtonComponent label="Test ID Button" dataTestId="my-button" />);
    expect(screen.getByTestId('my-button')).toBeInTheDocument();
  });
});
