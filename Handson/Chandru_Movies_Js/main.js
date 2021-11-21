const url = "http://localhost:3000/movies";
const favourites_url = "http://localhost:3000/favourites";

const movieList = document.querySelector('.movies-list')
const favouriteList = document.querySelector('.favourites-list')
const comingSoonList = document.querySelector('.comingsoon-list')
const MoviesInTheatreList = document.querySelector('.moviesInTheatre-list')
const TopRatedIndianList = document.querySelector('.topRatedIndian-list')
const TopRatedMoviesList = document.querySelector('.topRatedMovies-list')
const Description = document.querySelector(".description") 
const CurrentSection = document.querySelector(".current-section") 

var movieListOutput = ""; 
var favourteListOutput = ""; 
var comingSoonOutput = "";
var moviesInTheatreOutput = "";
var topRatedIndianOutput = "";
var topRatedMoviesOutput = "";
var descriptionOutput = "";

var currentdate = new Date();

fetch(url)
    .then(res => res.json())
    .then(data => MovieListFunctionCall(data))

function MovieList(){
    CurrentSection.innerHTML = "Movies List"
    movieListOutput = "";
    fetch(url)
      .then(res => res.json())
      .then(data => MovieListFunctionCall(data))
  }
  
function FavouriteList(){
    CurrentSection.innerHTML = "Favourites"
    favourteListOutput = ""
    fetch(favourites_url)
        .then(res => res.json())
        .then(data => FavouriteslistFunctionCall(data))
  }
  

const MovieListFunctionCall = (data) => {
    data.forEach(element => {
        movieListOutput += `
            <div class="card m-2" style="width: 17rem;">
            <img src="${element.image}" width="200px" height="300px" onclick="movieDescription(${element.Id})" class="card-img-top" alt="...">        
            <div class="card-body">
                    <h5 class="card-title text-danger">${element.Name}</h5>
                    <p class="card-text"> Actor : ${element.Actor} </p>
                    <p class="card-text"> Director : ${element.Director} </p>
                    <a href="#" class="btn btn-outline-warning" onclick="AddtoFavourites(${element.Id})"><i class="fas fa-heart heart-color">&nbsp;</i>Add to favourites</a>
                </div>
            </div>
        `;
    });
    movieList.innerHTML = movieListOutput;
    favouriteList.innerHTML = "";
    comingSoonList.innerHTML = "";
    TopRatedIndianList.innerHTML = "";
    TopRatedMoviesList.innerHTML = "";
    MoviesInTheatreList.innerHTML = "";
    Description.innerHTML = "";
}

const FavouriteslistFunctionCall = (data) => {
    console.log("DATA",data)
    if(data.length == 0){
        CurrentSection.innerHTML = "No movies added in Favourites";
    }else{
    data.forEach(element => {
        favourteListOutput += `
        <div class="card m-2" style="width: 17rem;">
        <img src="${element.image}" width="200px" height="300px" onclick="movieDescription(${element.Id})" class="card-img-top" alt="...">        
        <div class="card-body">
                <h5 class="card-title text-danger">${element.Name}</h5>
                <p class="card-text"> Actor : ${element.Actor} </p>
                <p class="card-text"> Rating : ${element.Rating} </p>
                <a href="#" class="btn btn-outline-warning" onclick="RemoveFromFavourites(${element.id})">Remove</a>
            </div>
        </div>
        `;
    });
    }
    favouriteList.innerHTML = favourteListOutput;
    movieList.innerHTML = "";
    comingSoonList.innerHTML = "";
    TopRatedIndianList.innerHTML = "";
    TopRatedMoviesList.innerHTML = "";
    MoviesInTheatreList.innerHTML = "";
    Description.innerHTML = "";
}

const RemoveFromFavourites = (id) => {
    fetch(`${favourites_url}/${id}`,{
        method : 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
        FavouriteList();
    })
    alert("Movie Removed From Favourites")
}

const AddtoFavourites = (id) => {
    let found = 0;
    fetch(favourites_url)
        .then(res => res.json())
        .then(data =>  {
            if(data.length == 0){
                console.log("Empty Json file")
            }else{
                data.forEach(element => {
                    if(element.Id == id){
                        alert(`Movie Already available in Fav`);
                        found = 1
                    }
                })
            }
            if(found == 0){
                fetch(url)
                    .then(res => res.json())
                    .then(data =>  {
                        data.forEach(element => {
                            if(element.Id == id){
                                fetch(favourites_url, {
                                    method : 'POST',
                                    headers : {'Content-Type' : 'application/json'},
                                    body : JSON.stringify({
                                        Id : element.Id,
                                        Name : element.Name,
                                        Actor : element.Actor,
                                        Rating : element.Rating,
                                        Director : element.Director,
                                        Music : element.Music,
                                        ReleaseDate : element.ReleaseDate,
                                        Country : element.Country,
                                        platform : element.platform,
                                        image : element.image,
                                        description : element.description
                                    })
                                })
                                alert("Movie Added to Favourites");
                            }
                        })
                    })
                }
            })
}


function ComingSoon(){
    CurrentSection.innerHTML = "ComingSoon Movies"
    comingSoonOutput = "";
    var comingsoonArray = [];
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                let releasedate = new Date(element.ReleaseDate);
                if(releasedate > currentdate)
                    comingsoonArray.push(element);
            });
            comingsoonArray.sort(function(a,b){
                return new Date(a.ReleaseDate) - new Date(b.ReleaseDate);
            });
            comingsoonArray.forEach(element => {
                comingSoonOutput += `
                <div class="card m-2" style="width: 17rem;">
                <img src="${element.image}" width="200px" height="300px" onclick="movieDescription(${element.Id})" class="card-img-top" alt="...">        
                <div class="card-body">
                        <h5 class="card-title text-danger">${element.Name}</h5>
                        <p class="card-text"> Actor : ${element.Actor} ReleaseDate : ${element.ReleaseDate} </p>
                        <a href="#" class="btn btn-outline-warning" onclick="AddtoFavourites(${element.Id})"><i class="fas fa-heart heart-color">&nbsp;</i>Add to favourites</a>
                    </div>
                </div>
            `;
            })
            comingSoonList.innerHTML = comingSoonOutput;
            favouriteList.innerHTML = "";
            movieList.innerHTML = "";
            TopRatedIndianList.innerHTML = "";
            TopRatedMoviesList.innerHTML = "";
            MoviesInTheatreList.innerHTML = "";
            Description.innerHTML = "";
        });
    }


function MoviesInTheatre(){
    CurrentSection.innerHTML = "Movies Release in Theatre"
    moviesInTheatreOutput = "";
    var moviesInTheatreArray = [];
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                if(element.platform == "Theatre"){
                    moviesInTheatreArray.push(element);
                }
            });
            moviesInTheatreArray.sort(function(a,b){
                return new Date(b.ReleaseDate) - new Date(a.ReleaseDate);
            });
            moviesInTheatreArray.forEach(element => {
                moviesInTheatreOutput += `
                <div class="card m-2" style="width: 17rem;">
                <img src="${element.image}" width="200px" height="300px" onclick="movieDescription(${element.Id})" class="card-img-top" alt="...">        
                <div class="card-body">
                        <h5 class="card-title text-danger">${element.Name}</h5>
                        <p class="card-text"> Actor : ${element.Actor} </p>
                        <p> Released Platform : ${element.platform} </p>
                        <a href="#" class="btn btn-outline-warning" onclick="AddtoFavourites(${element.Id})"><i class="fas fa-heart heart-color">&nbsp;</i>Add to favourites</a>
                    </div>
                </div>
            `;
            })
            MoviesInTheatreList.innerHTML = moviesInTheatreOutput;
            favouriteList.innerHTML = "";
            movieList.innerHTML = "";
            comingSoonList.innerHTML = "";
            TopRatedIndianList.innerHTML = "";
            TopRatedMoviesList.innerHTML = "";
            Description.innerHTML = "";
        });
    }


function TopRatedIndian(){
    CurrentSection.innerHTML = "Top Rated Indian Movies"
    topRatedIndianOutput = "";
    var topRatedIndianArray = [];
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                let releasedate = new Date(element.ReleaseDate);
                if(element.Rating > 7.9 && element.Country == "India" && releasedate < currentdate)
                    topRatedIndianArray.push(element);
            });
            topRatedIndianArray.sort(function(a,b){
                return b.Rating - a.Rating;
            });
            topRatedIndianArray.forEach(element => {
                topRatedIndianOutput += `
                <div class="card m-2" style="width: 17rem;">
                <img src="${element.image}" width="200px" height="300px" onclick="movieDescription(${element.Id})" class="card-img-top" alt="...">        
                <div class="card-body">
                        <h5 class="card-title text-danger">${element.Name}</h5>
                        <p class="card-text">Actor : ${element.Actor} </p>
                        <p class="card-text"><span> Country : ${element.Country} </span> <span> Rating : ${element.Rating} </span> </p>
                        <a href="#" class="btn btn-outline-warning" onclick="AddtoFavourites(${element.Id})"><i class="fas fa-heart heart-color">&nbsp;</i>Add to favourites</a>
                    </div>
                </div>
            `;
            })
            TopRatedIndianList.innerHTML = topRatedIndianOutput;
            favouriteList.innerHTML = "";
            movieList.innerHTML = "";
            comingSoonList.innerHTML = "";
            TopRatedMoviesList.innerHTML = "";
            MoviesInTheatreList.innerHTML = "";
            Description.innerHTML = "";
        });
    }


function TopRatedMovies(){
    CurrentSection.innerHTML = "Top Rated Movies"
    topRatedMoviesOutput = "";
    var topRatedMoviesArray = [];
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                let releasedate = new Date(element.ReleaseDate);
                if(element.Rating > 7.9 && releasedate < currentdate)
                    topRatedMoviesArray.push(element);
            });
            topRatedMoviesArray.sort(function(a,b){
                return b.Rating - a.Rating;
            });
            topRatedMoviesArray.forEach(element => {
                topRatedMoviesOutput += `
                <div class="card m-2" style="width: 17rem;">
                <img src="${element.image}" width="200px" height="300px" onclick="movieDescription(${element.Id})" class="card-img-top" alt="...">        
                <div class="card-body">
                        <h5 class="card-title text-danger">${element.Name}</h5>
                        <p class="card-text">Actor : ${element.Actor} </p>
                        <p class="card-text"><span> Country : ${element.Country} </span> <span> Rating : ${element.Rating} </span> </p>
                        <a href="#" class="btn btn-outline-warning" onclick="AddtoFavourites(${element.Id})"><i class="fas fa-heart heart-color">&nbsp;</i>Add to favourites</a>
                    </div>
                </div>
            `;
            })
            TopRatedMoviesList.innerHTML = topRatedMoviesOutput;
            favouriteList.innerHTML = "";
            movieList.innerHTML = "";
            comingSoonList.innerHTML = "";
            TopRatedIndianList.innerHTML = "";
            MoviesInTheatreList.innerHTML = "";
            Description.innerHTML = "";
        });
    }


function movieDescription(id){
    CurrentSection.innerHTML = "Movie Description"
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
               if(element.Id == id){
                Description.innerHTML = `
                    <div class="row mb-2">

                        <div class="col-12 col-sm-12 col-md-6 col-xl-6 col-lg-6">
                            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            
                                <div class="col-auto d-lg-block" style="width: 16rem;">
                                    <img src="${element.image}" width="200px" height="300px" class="card-img-top" alt="...">        
                                </div>
                
                                <div class="col d-flex p-3 flex-column position-static">
                                    <h3 class="d-inline-block mb-2 text-danger">${element.Name}</h3>
                                    <h5 class="d-inline-block mb-2 text-success">${element.Actor}</h3>
                                    <p class="card-text">Actor : ${element.Director} </p>
                                    <p class="card-text">Actor : ${element.Music} </p>
                                    <p class="card-text">Actor : ${element.Rating} </p>
                                    <p class="card-text">Actor : ${element.ReleaseDate} </p>
                                    <p class="card-text">Actor : ${element.Country} </p>
                                </div>

                            </div>
                        </div>
    
                        <div class="col-12 col-sm-12 col-md-6 col-xl-6 col-lg-6">
                            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                <div class="col p-4 d-flex flex-column position-static">
                                    <h5>Description</h5>
                                    <p class="card-text">${element.description}</p>
                                </div>
                            </div>
                        </div>

                    </div>    
                `;
                }
            });
            TopRatedMoviesList.innerHTML = "";
            favouriteList.innerHTML = "";
            movieList.innerHTML = "";
            comingSoonList.innerHTML = "";
            TopRatedIndianList.innerHTML = "";
            MoviesInTheatreList.innerHTML = "";
        });
}

