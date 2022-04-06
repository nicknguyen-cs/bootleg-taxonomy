import logo from './logo.svg';
import './App.css';
import Table from './components/table.js'
import '@contentstack/venus-components/build/main.css'
import FilterOptions from './components/FilterOptions.js'
import Stack from './api/stack';
import { useState, useEffect } from 'react';
import { Button, InfiniteScrollTable } from '@contentstack/venus-components';
function App() {

  const [tableData, setTableData] = useState([]);
  const [tag, setTag] = useState('');
  const [contentType, setContentType] = useState('');

  //table
  let [data, updateData] = useState([])
  let [itemStatusMap, updateItemStatusMap] = useState({})
  let [loading, updateLoading] = useState(false)
  let [viewBy, updateViewBy] = useState('Comfort')
  let [totalCounts, updateTotalCounts] = useState(0)


  async function handleSubmit(e) {
    e.preventDefault();
    fetchData();
  }


  const fetchData = async () => {
    try {
      let itemStatusMap = {}
      for (let index = 0; index <= 30; index++) {
        itemStatusMap[index] = 'loading the data... hang'
      }

      updateItemStatusMap(itemStatusMap)
      updateLoading(true)
      const response = await Stack.getEntry(contentType.value, tag);
      let tableData = response[0].map((entry, index) => {
        itemStatusMap[index] = 'loaded';
        var entryHREF = "https://app.contentstack.com/#!/stack/blt8f285fdea6372037/content-type/"+ contentType.value +"/en-us/entry/" + entry.uid + "/edit"
        return {
          title: <a href={entryHREF} target="_blank">{entry.title}</a>,
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
    <div className="App">
      <div>
        <FilterOptions setTag={setTag} tag={tag} setContentType={setContentType} contentType={contentType} />
        <Button
          buttonType="primary"
          icon="Send"
          iconAlignment={undefined}
          onClick={(e) => handleSubmit(e)}
        >
          Search
        </Button>
      </div>
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
      />
    </div>
  );
}

export default App;
