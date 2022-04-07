import axios from 'axios';
//https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary
export const getPlacesData = async(type,bounds)=>{
      try{
            const {data : {data}} = await axios.get(``,{
                params: {
                  bl_latitude: bounds.sw.lat,
                  tr_latitude: bounds.ne.lat,
                  bl_longitude: bounds.sw.lng,
                  tr_longitude: bounds.ne.lng,
                },
                headers: {
                  'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                  'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
                }
            });
            return data;
      }catch(error){
            console.log(error);
      }
}
