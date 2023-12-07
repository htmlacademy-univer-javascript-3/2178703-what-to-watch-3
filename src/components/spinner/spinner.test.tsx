import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('render correctly', () => {

    const spinnerId = 'spinner';

    const preparedComponent = withHistory(<Spinner />);

    render(preparedComponent);

    expect(screen.getByTestId(spinnerId)).toBeInTheDocument();
  });
});
