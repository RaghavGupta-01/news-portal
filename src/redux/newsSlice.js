import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'c6df29c823c1415b835d43419e871c49';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async ({ searchQuery = '', category = '', page = 1, pageSize = 6 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/top-headlines`, {
                params: {
                    country: 'us',
                    q: searchQuery,
                    category: category || undefined,
                    page,
                    pageSize: pageSize * 2,
                    apiKey: API_KEY,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 429) {
                return rejectWithValue("Rate limit exceeded. Please try again later.");
            }
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const isValidArticle = (article) => {
    return article.title && article.title !== '[Removed]' &&
        article.description && article.description !== '[Removed]' &&
        article.content && article.content !== '[Removed]';
};

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        articles: [],
        categories: ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'],
        selectedCategory: '',
        searchTerm: '',
        currentPage: 1,
        totalResults: 0,
        totalPages: 1,
        pageSize: 6,
        status: 'idle',
        error: null,
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            state.currentPage = 1;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const validArticles = action.payload.articles.filter(isValidArticle);
                state.articles = validArticles.slice(0, state.pageSize);
                state.totalResults = action.payload.totalResults;
                state.totalPages = Math.ceil(action.payload.totalResults / state.pageSize);
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setSelectedCategory, setCurrentPage, setSearchQuery } = newsSlice.actions;

export default newsSlice.reducer;