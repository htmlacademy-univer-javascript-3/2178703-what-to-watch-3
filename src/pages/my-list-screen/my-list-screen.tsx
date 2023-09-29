import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import SmallFilmCard from '../../components/small-film-card/small-film-card';

function MyListScreen(): JSX.Element {
  return(
    <div className="user-page">
      <Header />

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <SmallFilmCard />
          <SmallFilmCard />
          <SmallFilmCard />
          <SmallFilmCard />
          <SmallFilmCard />
          <SmallFilmCard />
          <SmallFilmCard />
          <SmallFilmCard />
          <SmallFilmCard />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;

