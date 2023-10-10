import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

export default function NotFoundScreen(): ReactNode {
  return (
    <div className="page-content">
      <Helmet>
        <title>WTW. Page not found</title>
      </Helmet>
      <h1>404. Page not found</h1>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
}
