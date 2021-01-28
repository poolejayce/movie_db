import React, {useState} from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import TypeaheadResults from './TypeaheadResults/TypeaheadResults';
import './Typeahead.css';

const Typeahead = () => {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState([]);

    let cache = {};

    const handleInputChange = query => {
        setQuery(query);
    }

    const handlePagination = (e, shownResults) => {
        const currentState = {
            loading: loading,
            query: query,
            options, options,
        };
        const cachedQuery = cache;

        if (
            cachedQuery.options.length > shownResults ||
            cachedQuery.options.length === cachedQuery.total_count
        ) {
            return;
        }

        setLoading(true);

        const page = cachedQuery.page + 1;


    }

    // const makeAndHandleRequest(query, page = 1) {
    //     return fetch(`${SEARCH_URI}?q=${query}`)
    // }

    return(
        <div className='async-typeahead-wrapper'>
            <AsyncTypeahead 
                isLoading={loading} 
                delay={250}
                id='async-typeahead'
                labelKey='search'
                maxResults={20}
                minLength={2}
                onInputChange={handleInputChange}
                onPaginate={() => {}}
                onSearch={() => {}}
                paginate
                placeholder="Search movies, TV shows, and celebrities"
                renderMenuItemChildren={option => (
                    <TypeaheadResults props={option}></TypeaheadResults>
                )}>
            </AsyncTypeahead>
        </div>
    );
}

export default Typeahead;