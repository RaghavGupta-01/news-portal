import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ArticleDetail = () => {
  const { url } = useParams();
  const { articles } = useSelector((state) => state.news);
  const article = articles.find((a) => a.url === decodeURIComponent(url));

  if (!article) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          Article not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <Link to="/" className="btn btn-outline-primary mb-3">
            ← Back to Home
          </Link>
          <article>
            <h1 className="mb-4">{article.title}</h1>
            {article.urlToImage && (
              <img 
                src={article.urlToImage} 
                alt={article.title} 
                className="img-fluid rounded mb-4"
              />
            )}
            <hr className="my-4" />
            <p>{article.content}</p>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary mt-3"
            >
              Read full article
            </a>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;