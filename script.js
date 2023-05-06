const API_KEY="api_key=6d20b2b40d672ca15712da86059ec51f";
const BASE_URL="https://api.themoviedb.org/3";
//const API_URL=BASE_URL+ "/discover/movie?with_genres=18&primary_release_year=2014&"+API_KEY;
const API_URL=BASE_URL+ "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&"+API_KEY;

const Search_url=BASE_URL+"/search/movie?"+API_KEY;
const Image_URL="https://image.tmdb.org/t/p/w500/"

const main=document.getElementById("main");
const form=document.getElementById('form');

const search=document.getElementById('search');

function getMovie(url)
{
    fetch(url).then(res=>res.json()).then(data=>
        {
            console.log(data);
            show(data.results);
        })
}

getMovie(API_URL);

function show(data)
{
    main.innerHTML='';

    data.forEach(movie=>{
        const{title,poster_path,vote_average,overview,release_date}=movie
        const movieEl=document.createElement("div");
        movieEl.classList.add('movie');
        movieEl.innerHTML=
        `<img src="${Image_URL+poster_path}" alt="${title}">
        <div class="movieInfo">
            <h3>"${title}"</h3>
            <span class="${getColor(vote_average)}">"${vote_average}"</span>
        </div>
        <div class="overview">
            "${overview}"
        </div>
        `

        main.appendChild(movieEl);
    })
}

function getColor(vote)
{
    if(vote>=8)
    {
        return "green";
    }
    else if(vote>=5)
    {
        return "orange";
    }
    else{
        return "red";
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const search_term=search.value;
    if(search_term)
    {
        
    getMovie(Search_url+'&query='+search_term);
    }
    else{
        getMovie(API_URL);
    }
})

