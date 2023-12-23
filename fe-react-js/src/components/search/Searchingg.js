import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import { Link } from 'react-router-dom';


function Searchingg() {
  const [myData, setData] = useState([]);
  const [error, setError] = useState(null);
  const [str, setStr] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestTerm, setSuggestTerm] = useState('');
  
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [suggestList, setSuggest] = useState([]);


  // Oke
  // useEffect(() => {
  //   // Gọi API từ ứng dụng Spring Boot
  //   axios.get('http://localhost:8082/page/0')
  //     .then((response) => {
  //       setData(response.data.content);
  //       console.log(response.data.content)
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     });
  // }, []);

  // Searching
  // useEffect(() => {
  //   // Gọi API từ ứng dụng Spring Boot
  //   if (searchTerm) {
  //     axios.get(`http://127.0.0.1:5000/search?q=${searchTerm}`)
  //     // axios.get(`http://127.0.0.1:5000/search?q=woman`)
  //     .then((response) => {
  //       // response.data = list object
  //       setData(response.data);
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       console.log("error")
  //     });
  //   }
  // }, [searchTerm]);
  

  // Suggestion
  useEffect(() => {
    // Gọi API từ ứng dụng Spring Boot
    if (suggestTerm == '') {
      setShowResults(false);
    } else {
      axios.get(`http://127.0.0.1:5000/suggest?q=${suggestTerm}`)
      .then((response) => {
        setSuggest(response.data);
        setShowResults(true);
        // setSearchResults(response.data)
        // console.log('Response: ', response.highlights)
        // console.log(response.data)
      })
      .catch((error) => {
        setError(error);
        console.log("error when suggestion api")
      });
    }

  }, [suggestTerm]);

  const handleSearch = (e) => {
    // console.log("[Process] Calling API to search")
    // setSearchTerm(e.target.value)

    if (searchTerm) {
      axios.get(`http://127.0.0.1:5000/search?q=${searchTerm}`)
      // axios.get(`http://127.0.0.1:5000/search?q=woman`)
      .then((response) => {
        // response.data = list object
        setData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        setError(error);
        console.log("error")
      });
    }
    
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // if (myData) {
  //   const result = myData.map(res => {
  //     console.log(res)
  //   })
  // }

  const handleItemClick = function(abc) {

  }
  
  const handleSuggestion = (e) => {
    setSearchTerm(e.target.value)
    setSuggestTerm(e.target.value)
  }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter your search term..."
          value={searchTerm}
          onChange={handleSuggestion}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Search
        </button>
        {showResults && (
        <div className="p-8 mt-2 m-8">
          <div className='font-semibold'>Suggestions</div>
          <div className="border border-gray-300 rounded-md p-2 bg-[white]">
            {suggestList.map((item, index) => (
              <div>
                <button onClick={handleSearch}>
                  <li key={index}>{item}</li>
                </button>
              </div>
            ))}
          </div>
          <div className='font-semibold'>History</div>
          <div className="border border-gray-300 rounded-md p-2 bg-[white]">
            {suggestList.map((item, index) => (
              <div>
                <button onClick={handleSearch}>
                  <li key={index}>{item}</li>
                </button>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
      
      <div>
        <ul>
          {myData && myData.map((item, index) => (
              <div className='mb-4' key={index}>
                <Item category={item.category} filename={item.filename} list={item.highlights}/>
              </div>
          ))}
        </ul>
      </div>
    </>


  );
}

export default Searchingg;
