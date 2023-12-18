import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function NotFoundScreen() {
  return (
    <div className="page-content">
      <Helmet>
        <title>WTW. Page not found</title>
      </Helmet>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Main}>Вернуться на главную</Link>
    </div>
  );
}
