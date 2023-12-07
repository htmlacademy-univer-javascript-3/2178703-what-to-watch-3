import { makeFakeSmallFilmCard } from '../../utils/mocks';
import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import SmallFilmCard from './small-film-card';

describe('Component: SmallFilmCard', () => {
  it('render correctly', () => {
    const smallFilmCard = makeFakeSmallFilmCard();
    const smallFilmCardId = smallFilmCard.id;
    const smallFilmCardName = smallFilmCard.name;
    const smallFilmCardPreviewImage = smallFilmCard.previewImage;
    const smallFilmCardPreviewVideoLink = smallFilmCard.previewVideoLink;
    const isPlayingPreviewVideo = smallFilmCard.isPlayingPreviewVideo;
    const onSmallFilmCardMouseOut = smallFilmCard.onSmallFilmCardMouseOut;
    const onSmallFilmCardMouseOver = smallFilmCard.onSmallFilmCardMouseOver;

    const smallFilmCardImageId = 'small-film-card-image';

    const preparedComponent = withHistory(
      <SmallFilmCard
        id={smallFilmCardId}
        name={smallFilmCardName}
        previewImage={smallFilmCardPreviewImage}
        previewVideoLink={smallFilmCardPreviewVideoLink}
        isPlayingPreviewVideo={isPlayingPreviewVideo}
        onSmallFilmCardMouseOut={onSmallFilmCardMouseOut}
        onSmallFilmCardMouseOver={onSmallFilmCardMouseOver}
      />
    );

    render(preparedComponent);

    expect(screen.getByText(smallFilmCardName)).toBeInTheDocument();
    expect(screen.getByTestId(smallFilmCardImageId)).toBeInTheDocument();
  });
});
