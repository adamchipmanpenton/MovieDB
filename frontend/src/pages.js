import React from "react";
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import './App.css';
import {Link, useLocation} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export function Home({movies, setMovies}) {
    console.log(movies)


    function handleRemove(name) {
        console.log(name)
        const remove = async () => {
            const result = await  fetch("/api/removeMovie",{
                method: "POST",
                body: JSON.stringify({name: name}),
                headers:{"Content-Type": "application/json",}
            });
            const body = await result.json();
            console.log(body);
            setMovies(body.movies)
        }
        remove();
        setMovies()
      }
    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="addReview">Movie Reviews</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">See Reviews</Nav.Link>
                        <Nav.Link href="addReview">Add Review</Nav.Link>
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <nav>
                <Link to="addReview">Add a Review</Link>
            </nav>
            <h1>Star Wars Reviews</h1>
            { movies.map( (movie) => (
                <><h2>{movie.name}</h2>
                <img src={"./images/" + movie.poster} />
                <p>Release Date: {movie.date}</p>
                <p>Main Actors: {movie.actors}</p>
                <p>Rating: {movie.rating}</p>
                <button className="delete" onClick={() => handleRemove(movie.name)}>Delete</button>
                <br></br></>
            ))}           
        </div>
    );
}

export function AddReview({movies, setMovies}) {
    const [movieName, setMovieName] = useState("The Phantom Menace");
    const [releaseDate, setReleaseDate] = useState("");
    const [actors, setActors] = useState([""]);
    const [movieRating, setMovieRating] = useState("1");
    let poster = "swep1.jpg"
    const handleSubmit = (event) => {
        if (movieName == "The Phantom Menace"){
            poster = "swep1.jpg"
        }else if(movieName == "Attack of the Clones"){
            poster = "swep2.jpg"
        }else if(movieName == "Revenge of the Sith"){
            poster = "swep3.jpg"
        }else if(movieName == "Solo: A Star Wars Story"){
            poster = "swsolo.jpg"
        }else if(movieName == "Rogue One"){
            poster = "swrougeone.png"
        }else if(movieName == "Star Wars"){
            poster = "swep4.jpg"
        }else if(movieName == "The Empire Strikes Back"){
            poster = "swep5.jpg"
        }else if(movieName == "Return of the Jedi"){
            poster = "swep6.jpg"
        }else if(movieName == "The Force Awakens"){
            poster = "swep7.jpg"
        }else if(movieName == "The Last Jedi"){
            poster = "swep8.jpg"
        }else if(movieName == "The Rise of Skywalker"){
            poster = "swep9.jpg"
        }
        let newMovie = [
            ...movies,{
                "name" : movieName,
                "date" : releaseDate,
                "actors" : actors,
                "poster" : poster,
                "rating" : movieRating
            }
        ]
      
        const add = async () => {
            const result = await  fetch('/api/addMovie',{
                method: "POST",
                body: JSON.stringify({name: movieName, date: releaseDate, actors: actors, poster: poster, rating: movieRating}),
                headers:{"Content-Type": "application/json",}
            });
    
            const body = await result.json();
            console.log(body);
            setMovies(body.movies)
        }
        add();
        console.log(`Movie name, ${movieName}, Relase date ${releaseDate}, actors ${actors}, poster ${poster}, rating ${movieRating}`) 
        //event.preventDefault();        
      }

    const handleChangeName = (event) => {
        setMovieName(event.target.value)
    }
    const handleChangeRating = (event) => {
        setMovieRating(event.target.value)
    }
     
    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="addReview">Movie Reviews</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">See Reviews</Nav.Link>
                        <Nav.Link href="addReview">Add Review</Nav.Link>
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <nav>
                <Link to="/">View All Reviews</Link>
            </nav>
            <h1>Add a Star Wars Review</h1>
            <p>Choose the Star Wars movie you wish to review and fill out the rest of the information.<br/>You can then see it under all reviews.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Which Star Wars movie?
                    <select value={movieName} onChange={handleChangeName}>
                        <option selected value="The Phantom Menace">The Phantom Menace</option>
                        <option value="Attack of the Clones">Attack of the Clones</option>
                        <option value="Revenge of the Sith">Revenge of the Sith</option>
                        <option value="Solo: A Star Wars Story">Solo: A Star Wars Story</option>
                        <option value="Rogue One">Rogue One</option>
                        <option value="Star Wars">Star Wars</option>
                        <option value="The Empire Strikes Back">The Empire Strikes Back</option>
                        <option value="Return of the Jedi">Return of the Jedi</option>
                        <option value="The Force Awakens">The Force Awakens</option>
                        <option value="The Last Jedi">The Last Jedi</option>
                        <option value="The Rise of Skywalker">The Rise of Skywalker</option>
                    </select>
                </label>
                <br/>
                <label>
                    Release Date:
                    <input type="text" name="releaseDate" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Main Actors:
                    <input type="text" name="actors" value={actors} onChange={(e) => setActors(e.target.value)}/>
                </label>
                <br/>
                <label>
                    Rating:
                    <select value={movieRating} onChange={handleChangeRating}>
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export function PageNotFound() {
    let location = useLocation();
    return (
        <div className="App">
            <nav>
                <Link to="/">View All Reviews</Link>
            </nav>
            <nav>
                <Link to="addReview">Add a Review</Link>
            </nav>
            <h1>Error, this page does not exist!</h1>
            <h2>{location.pathname}</h2>
        </div>
    );
}