import React, {useState} from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import TypeaheadResults from './TypeaheadResults/TypeaheadResults';
import './Typeahead.css';

const apiKey = '6e92bc67004a571503673da0fd8facc1';
const searchUrl = 'https://api.themoviedb.org/3/';

const Typeahead = () => {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState([]);

    let cache = {};

    const makeAndHandleRequest = async (query, page = 1) => {
        return await fetch(`${searchUrl}search/multi?language=en-US&query=${query}&api_key=${apiKey}&page=${page}&region=USA&include_adult=false`)
        .then(resp => resp.json())
        .then(({page, results, total_results, total_pages}) => {
            const options = results.map(i => ({
                id: i.id,
                posterPath: i.poster_path,
                mediaType: i.media_type,
                name: i.name
            }));
            return {options, page, total_results, total_pages};
        })
    }

    const handleInputChange = (query) => {
        setQuery(query);
        if (query.length > 1){
            handleSearch(query);
        }
    }

    const handlePagination = (e, shownResults) => {
        const cachedQuery = cache[query];

        if (
            cachedQuery.options.length > shownResults ||
            cachedQuery.options.length === cachedQuery.total_count
        ) {
            return;
        }

        setLoading(true);

        const page = cachedQuery.page + 1;

        makeAndHandleRequest(query, page).then(resp => {
            const options = cachedQuery.options.concat(resp.options);
            cache[query] = { ...cachedQuery, options, page};
            setLoading(false);
            setOptions(options);
        })

    };

    const handleSearch = (query) => {
        console.log('search');
        if (cache[query]) {
            setOptions(cache[query].options);
            return;
        }

        setLoading(true);
        makeAndHandleRequest(query).then(resp => {
            cache[query] = { ...resp, page: 1};
            setLoading(false);
            setOptions(resp.options);
        });
    };

     

    return(
        <div className='async-typeahead-wrapper'>
            <AsyncTypeahead 
                id='async-typeahead'
                labelKey='name'
                maxResults={20}
                onInputChange={handleInputChange}
                onPaginate={handlePagination}
                onSearch={handleSearch}
                options={options}
                paginate
                placeholder='Search movies, TV shows, and celebrities'
                searchText="Searching.."
                renderMenuItemChildren={(option) => (
                    <TypeaheadResults id={option.id} name={option.name}></TypeaheadResults>
                )}
                query={query}>
            </AsyncTypeahead>
        </div>
    );
}

export default Typeahead;