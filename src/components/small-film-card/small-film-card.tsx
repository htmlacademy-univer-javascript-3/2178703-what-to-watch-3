import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import VideoPlayer from '../video-player/video-player';

export type SmallFilmCardProps = {
  id: string;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  isPlayingPreviewVideo: boolean;
  onSmallFilmCardMouseOver: () => void;
  onSmallFilmCardMouseOut: () => void;
}

export default function SmallFilmCard({id, previewImage, name, previewVideoLink, isPlayingPreviewVideo, onSmallFilmCardMouseOver, onSmallFilmCardMouseOut}: SmallFilmCardProps) {
  return (
    <article className="small-film-card catalog__films-card" onMouseOver={onSmallFilmCardMouseOver} onMouseOut={onSmallFilmCardMouseOut}>
      <div className="small-film-card__image">
        <VideoPlayer
          isPlaying={isPlayingPreviewVideo}
          src={previewVideoLink}
          poster={previewImage}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.FilmData}/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}
