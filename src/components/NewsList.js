import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const isValidArticle = (article) => {
    return article.title && article.title !== '[Removed]' &&
        article.description && article.description !== '[Removed]' &&
        article.content && article.content !== '[Removed]';
};

const NewsList = ({ articles }) => {
    const searchQuery = useSelector(state => state.news.searchQuery) || '';
    const validArticles = articles.filter(isValidArticle);
    const filteredArticles = validArticles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                {filteredArticles.map((article, index) => (
                    <div key={index} className="col-md-6 col-lg-7 mb-4">
                        <div className="card h-100 shadow-sm">
                            {article.urlToImage && (
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="card-img-top"
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text flex-grow-1">{article.description}</p>
                                <Link
                                    to={`/article/${encodeURIComponent(article.url)}`}
                                    className="btn btn-primary mt-auto w-25"
                                    style={{ minWidth: '150px' }}
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsList;
