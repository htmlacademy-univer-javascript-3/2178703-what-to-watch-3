import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import FilmList from '../../components/film-list/film-list';
import { PreviewFilm } from '../../types/preview-film';

type MyListScreenProps = {
  smallFilmCards: PreviewFilm[];
}

export default function MyListScreen({smallFilmCards}: MyListScreenProps) {
  return(
    <div className="user-page">
      <Helmet>
        <title>WTW. My list</title>
      </Helmet>

      <Header />

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={smallFilmCards} genre='' />
      </section>

      <Footer />
    </div>
  );
}
