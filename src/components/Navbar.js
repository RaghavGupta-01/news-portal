import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/newsSlice';
import signin from '../signin.svg';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchTerm);
        dispatch(setSearchQuery(searchTerm));
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#011E29', minHeight: '120px' }}>
            <div className="container-fluid">
                <div className="row w-100 align-items-center">
                    <div className="col-12 col-lg-3 text-lg-start text-center mb-3 mb-lg-0">
                        <a className="navbar-brand" href="/" style={{ fontSize: '3rem' }}>News Portal</a>
                    </div>
                    <div className="col-12 col-lg-9">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-12 col-md-6 d-flex justify-content-md-start justify-content-center mb-3 mb-md-0">
                                <form className="d-flex w-100" onSubmit={handleSearch} style={{ maxWidth: '500px' }}>
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search news"
                                        aria-label="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button className="btn btn-outline-light" type="submit">Search</button>
                                </form>
                            </div>
                            <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center align-items-center">
                                <img src={signin} alt='signin' style={{ height: '24px', width: '24px', marginRight: '8px' }} />
                                <span className="text-white">Sign In</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
