
import React, { useEffect, useState } from 'react';
import { Select, Button } from '@contentstack/venus-components';
import Stack from '../api/stack';

function FilterOptions(props) {
    const [tags, setTags] = useState([]);
    const [contentTypes, setContentTypes] = useState([]);

    //TODO: This is a temporary fix for the issue of the select component.
    const getTags = () => {
        Stack.getEntry("tags")
            .then((result) => {
                let input = [];
                for (let i = 0; i < result[0][0].entry_tags.length; i++) {
                    input[i] = {
                        value: result[0][0].entry_tags[i],
                        label: result[0][0].entry_tags[i]
                    }
                }
                setTags(input);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //TODO: This is a temporary fix for the issue of the select component.
    const getContentTypes = () => {
        Stack.getContentTypes()
            .then((result) => {
                let input = [];
                for (let i = 0; i < result.length; i++) {
                    input[i] = {
                        value: result[i].uid,
                        label: result[i].title
                    }
                }
                setContentTypes(input);
            })
            .catch((error) => {
                console.log(error)
            })
    }


    useEffect(() => {
        getTags();
        getContentTypes();
    }, [])

    return (
        <div>
            <Select
                selectLabel={"Select Content Type(s)"}
                value={props.contentType}
                onChange={(data) => { console.log("DATA: ", data);props.setContentType(data) }}
                options={contentTypes}
                hideSelectedOptions={true}
                noOptionsMessage={() => 'No tags available'}
            />
            <Select
                selectLabel={"Select Tag"}
                value={props.tag}
                onChange={(data) => { props.setTag(data) }}
                options={tags}
                hideSelectedOptions={true}
                noOptionsMessage={() => 'No tags available'}
            />
        </div>
    )

}

export default FilterOptions;

