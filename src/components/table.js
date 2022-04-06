import React, { useState, InlineForms } from 'react';
import Stack from '../api/stack';
import { TextInput, InstructionText, InfiniteScrollTable } from '@contentstack/venus-components';
import { TokenName } from '@contentstack/venus-components/build/variables.js'

function Table() {
    let [data, updateData] = useState([])
    let [itemStatusMap, updateItemStatusMap] = useState({})
    let [loading, updateLoading] = useState(false)
    let [viewBy, updateViewBy] = useState('Comfort')
    let [totalCounts, updateTotalCounts] = useState(null)

    const fetchData = async ({ sortBy, searchText, skip, limit, startIndex, stopIndex }) => {
        try {
            let itemStatusMap = {}
            for (let index = 0; index <= 30; index++) {
                itemStatusMap[index] = 'loading the data... hang'
            }

            updateItemStatusMap(itemStatusMap)
            updateLoading(true)
            const response = await Stack.getEntry("blog_post");
            let tableData = response[0].map((entry, index) => {
                itemStatusMap[index] = 'loaded';
                var entryHREF = "https://app.contentstack.com/#!/stack/blt8f285fdea6372037/content-type/blog_post/en-us/entry/" + entry.uid + "/edit"
                return {
                    title: <a href={entryHREF}>{entry.title}</a>,
                    uid: entry.uid
                }
            })
            updateData(tableData);
            updateItemStatusMap({ ...itemStatusMap })
            updateLoading(false)
            updateTotalCounts(tableData.length);
        } catch (error) {
            console.log('fetchData -> error', error)
        }
    }

    const columns = [
        {
            Header: 'Title',
            id: 'title',
            accessor: "title",
        },
        {
            Header: 'UID',
            id: "uid",
            accessor: "uid",
        }
    ]

    return (

        <InfiniteScrollTable
            data={data}
            columns={columns}
            uniqueKey={'uid'}
            fetchTableData={fetchData}
            loading={loading}
            totalCounts={totalCounts}
            itemStatusMap={itemStatusMap}
            columnSelector={false}
            equalWidthColumns={true}
            loadMoreItems={() => undefined}
            initialSortBy={[{ id: 'title', desc: true }]}
        />
    )
}


export default Table;