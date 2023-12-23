import React, { useState } from 'react';
import axios from 'axios';


export default function Searching () {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(true);
    // const searchResults = [
    //     {
    //         "id": 1,
    //         "name": "QKhanh"
    //     },
    //     {
    //         "id": 2,
    //         "name": "Izo"
    //     }
    // ]

    const handleSearch = () => {
        // Xử lý tìm kiếm ở đây, ví dụ: console.log(searchTerm);
        // alert(`Performing search for: ${searchTerm}`);

      axios.get('http://localhost:5000/api/search?q=sport')
      .then(response => {
          // setSearchResults(response.data); // Lưu kết quả từ API vào state searchResults
          // setShowResults(true); // Hiển thị kết quả
          console.log(response.data)
      })
      .catch(error => {
          // console.error('Error fetching data:', error);
          console.log("error")
      });
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Enter your search term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Search
        </button>

        {showResults && (
        <div className="mt-2">
          <ul className="border border-gray-300 rounded-md p-2">
            {searchResults.map((result) => (
              <a href='http://localhost:3000/detail-document'><li key={result.id}>{result.name}</li></a>
            ))}
          </ul>
        </div>
        )}
      </div>
    );
}