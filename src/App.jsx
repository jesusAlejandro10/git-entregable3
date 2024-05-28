 
import { useEffect, useRef, useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch';
import getRamdomNum from './services/getRamdomNum';
import ResidentCard from './components/ResidentCard';
import LocationInfo from './components/locationInfo';

function App() { 


  const [ locationId, settLocationId ] = useState(getRamdomNum(126))


const url =  `https://rickandmortyapi.com/api/location/${locationId}`
 const [ location, getLocation, hasError ] = useFetch(url)

 useEffect(() =>{
  getLocation()
 },[locationId])

 const inputId = useRef()

 const handleSubmit = e =>{
  e.preventDefault()
  settLocationId(inputId.current.value.trim())
 }

  return (
   <div>
    <h1>Rick and Morty</h1>
    <form onSubmit={handleSubmit}>
    <input ref={inputId} type="text" />
    <button>Search</button>
    </form>
    {
      hasError
        ? <h2>Hey! you must provide and id 1 to 126</h2>
        : (<><LocationInfo
          location={location}
          />
          <div className='card__container'>
            {
              location?.residents.map(url => (
                <ResidentCard
                  key={url}
                  url={url}
                />
              ))
            }
          </div></>
          
        )
    }

   </div>
     
  );
}

export default App
