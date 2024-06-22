import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews, setSelectedCategory } from '../redux/newsSlice';
import Navbar from '../components/Navbar';
import NewsList from '../components/NewsList';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const {
    articles,
    categories,
    selectedCategory,
    searchTerm,
    currentPage,
    status,
    error
  } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews({q: searchTerm, category: selectedCategory, page: currentPage }));
  }, [dispatch, selectedCategory, currentPage]);

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3 p-3 bg-light border rounded d-flex justify-content-center">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div className="page-container">
        {status === 'loading' && (
          <div className="loading-container">
            <h2 className="loading-text">Loading...</h2>
          </div>


        )}
        {status === 'failed' && <p className="alert alert-danger">{error}</p>}
        {status === 'succeeded' &&
          <NewsList articles={articles} searchTerm={searchTerm}
          />}
        <div className="pagination-container">
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Home;