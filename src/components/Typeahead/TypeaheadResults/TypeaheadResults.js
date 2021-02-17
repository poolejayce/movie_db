import React from 'react';

import './TypeaheadResults.css';

const TypeaheadResults = (props) => {

    console.log(props.name);
    return(
       <div key={props.id}>
            <span>{props.name}</span>
        </div>
    );
}

export default TypeaheadResults;