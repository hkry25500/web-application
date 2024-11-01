'use client'

import { useEffect, useState } from 'react';
import './styles.scss'
import axios from 'axios';
import { Rate } from 'antd';


export default function Homepage()
{
    const [movies, setMovies] = useState<any[]>();

    useEffect(() =>
    {
        if (!movies)
        {
            axios.get('/api/movies')
            .then(res => res.data)
                .then(movies => {
                    setMovies(movies);
                })
            .catch(err => console.error(err));
        }
    },
    []);

    return (
        <div className='w-full min-h-100-70'>

            <h2 className='subheader'>Most Popular Movies</h2>

            {/* <section className="movies">
                {
                    movies?.map(movie => {
                        return (
                            <div className="movie" onClick={() => location.href = `/movie/${movie.id}`}>
                                <img
                                    src={movie.poster.url}
                                    alt={movie.name}
                                    className="poster"
                                />
                                <div className="title">{ movie.name }</div>
                                <div className="info">
                                    <span className="length">117 min</span>
                                    <span className="year">2015</span>
                                </div>
                            </div>
                        )
                    })
                }
            </section> */}

            <div className="wrapper">
                {
                    movies?.map(movie => {
                        return (
                            <div className="card">
                                <div className="poster">
                                <img
                                    src={`${movie.poster.url}`}
                                    alt="Location Unknown"
                                />
                                </div>
                                <div className="details">
                                <h1>{ (movie.name.length>19)?`${movie.name.substring(0,16)}...`:movie.name }</h1>
                                <h2>2021 • R • 1hr 41min</h2>
                                <div className="rating">
                                    <Rate defaultValue={5} disabled />
                                    <span>4.7/5</span>
                                </div>
                                <div className="tags">
                                    <span className="tag yellow">Teen</span>
                                    <span className="tag">Comedy</span>
                                    <span className="tag blue">Drama</span>
                                </div>
                                <p className="desc">
                                    { movie.description }
                                </p>
                                <div className="cast">
                                    <h3>Cast</h3>
                                    <ul>
                                        <li>
                                            <img
                                            src="https://i.postimg.cc/xd3twv4B/cast-31.jpg"
                                            alt="Jessica Enduro"
                                            title="Jessica Enduro"
                                            />
                                        </li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}