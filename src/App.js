import React, {useEffect, useState} from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData } from './api';

const App = () =>{

      const [places, setPlaces] = useState([]);
      const [coordinates, setCoordinates] = useState();
      //const [coordinates, setCoordinates] = useState({});
      const [bounds, setBounds]= useState({});
      const [childClicked,setChildClicked] = useState(null);

      const[isLoading,setIsLoading]=useState(false);

      const [type , setType]= useState('restaurants');
      const [rating , setRating]= useState('0');

      const [filteredPlaces, setFilteredPlaces] = useState([]);

      useEffect(()=>{
            navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
                  setCoordinates({lat: latitude, lng: longitude});
            })
      },[]);

      useEffect(()=>{
            const filteredPlaces = places.filter((place)=> place.rating>rating);
            setFilteredPlaces(filteredPlaces);
      },[rating]);
       
      useEffect(()=>{
            //console.log(coordinates);
            if(bounds.sw && bounds.ne){
                  setIsLoading(true);
                  getPlacesData(type,bounds)
                  .then((data) =>{
                              setPlaces(data);
                              setFilteredPlaces([]);
                              setIsLoading(false);
                        })
            }
      },[bounds,type]);

      return (
            <>
            <CssBaseline/>
            <Header/>
            <Grid container spacing={3} style={{width: '100%'}}>
                  <Grid item xs={12} md={4}>
                        <List 
                        places = {filteredPlaces.length ? filteredPlaces : places} 
                        childClicked={childClicked} 
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                        />
                  </Grid>
                  <Grid item xs={12} md={8}>
                        <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places = {filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        />
                  </Grid>
            </Grid>
            </>
      );    
      
}

export default App;