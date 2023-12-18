import { render, screen } from '@testing-library/react';
import MainScreen from './main-screen';
import { withStore, withHistory } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';

describe('MainScreen', () => {
  it('render correctly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<MainScreen />),
      makeFakeStore()
    );
    render(withStoreComponent);

    expect(screen.getByTestId('page-content')).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
