import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import NotFoundScreen from './not-found-screen';

describe('NotFoundScreen', () => {
  it('render correctly', () => {
    const preparedComponent = withHistory(<NotFoundScreen />);

    render(preparedComponent);

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});
