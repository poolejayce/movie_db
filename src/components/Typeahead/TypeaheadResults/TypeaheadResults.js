import React, {useState} from 'react';

import './TypeaheadResults.css';

const TypeaheadResults = (props) => {

    return(
       <div key={props.id}>
            <img></img>
            <span>{props.name}</span>
        </div>
    );
}

export default TypeaheadResults;