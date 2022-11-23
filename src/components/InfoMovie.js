import style from './Movies.module.css'

import { useAuth } from '../context/AuthenticationProv';

function InfoMovie({movie}) {
  const activeUser = useAuth();
  return (
    <>
      <div>
        <h2>{movie.title}</h2>
        
      </div>
      <div>
        <p>{movie.plot}</p>
      </div>
      <div>
        <p>{movie.year}</p>
        <p><i>{movie.category}</i> &ensp; |&ensp;  ★ {movie.rating}</p>
      </div>
     
    </>
    )
  }


export default InfoMovie;