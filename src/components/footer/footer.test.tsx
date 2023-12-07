import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../../utils/mock-component';

describe('Component: Footer', () => {
  it('render correctly', () => {
    const expectedLogoLetterW = 'W';
    const expectedLogoLetterT = 'T';
    const expectedCopyright = /© 2019 What to watch Ltd./i;

    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    screen.getAllByText(expectedLogoLetterW).forEach((logoLetterW) => {
      expect(logoLetterW).toBeInTheDocument();
    });
    expect(screen.getByText(expectedLogoLetterT)).toBeInTheDocument();
    expect(screen.getByText(expectedCopyright)).toBeInTheDocument();
  });
});
