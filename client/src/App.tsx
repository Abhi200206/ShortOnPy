import { useState } from "react"
import axios from "axios";
import { Header } from "./components/Header";

function App() {
  const [url, setUrl] = useState<string>("");
  const [shorturl, setShorturl] = useState<string>("");
  const send = async () => {
    try {
      let res = await axios.post(`http://127.0.0.1:5000/add`, {
        url
      });
      alert("successfullt shorted the url !!!");
      setShorturl(`http://127.0.0.1:5000/${res.data.short_url}`);
    }
    catch (err) {
      alert("error at server!!!");
    }
  }
  return (
    <div className="flex justify-center">
      <div>
        <div><Header /></div>
        <div className="flex gap-2 items-center my-8">
          <div><input onChange={(e: any) => setUrl(e.target.value)} className="border-[1px] min-w-48 md:w-80  p-1 rounded my-4 " type="text" placeholder="Enter url to shorten it" /></div>
          <div onClick={send} className="bg-cyan-600 hover:bg-cyan-800 text-white rounded items-center  flex justify-center px-2 cursor-pointer border-[1px] text-center font-sans p-1">
            <p>Shorten url</p>
          </div>
        </div>
        <div className="flex gap-2 items-center my-8 font-sans text-xl p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-700">Shortened URL is:</p>
          <p className="text-green-500 font-semibold truncate">{shorturl}</p>
        </div>
        <div className=' flex gap-1 justify-center items-center mt-[100px] mb-2'>
          <div><p>Made with </p></div>
          <div><svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="cursor-pointer size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
          </div>
          <div>
            <p>by <a className='text-blue-500' target='blank' href="https://github.com/abhi200206/">@abhi200206</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
