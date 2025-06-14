import { render, screen } from '@testing-library/react';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  const baseProps = {
    keyId: 'card-1',
    title: 'Repository Title',
    description: 'This is a test description.',
  };

  it('renders title and description correctly', () => {
    render(<CardComponent {...baseProps} />);
    expect(screen.getByText('Repository Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test description.')).toBeInTheDocument();
  });

  it('renders score and star icon when score is provided', () => {
    render(<CardComponent {...baseProps} score={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('does not render score section when score is not provided', () => {
    render(<CardComponent {...baseProps} />);
    expect(screen.queryByText('⭐')).not.toBeInTheDocument();
  });
});
