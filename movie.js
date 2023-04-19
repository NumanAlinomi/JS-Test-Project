const API_KEY ="api_key=664ea7c8d82b8ff03d7be2dcfa9d5616";
const BASE_URL ="https://api.themoviedb.org/3";
const API_URL=BASE_URL+ "/discover/movie?sort_by=popularity.desc&"+API_KEY

const image_URL="https://image.tmdb.org/t/p/w500";

const main=document.getElementById("main");
const form=document.getElementById("form");
const search=document.getElementById("search");
const searchURL=BASE_URL+"/search/movie?"+API_KEY

function getMovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        console.log(data.results)
        showMovie(data.results)
        
    })
}
getMovies(API_URL);

function showMovie(data){

    main.innerHTML=""
    data.forEach(movie => {
    const {title,poster_path,vote_average,overview,release_date}=movie    
    const moviE1=document.createElement("div");
    moviE1.classList.add("movie");
    moviE1.innerHTML=`
    <img src="${image_URL+poster_path}" alt="${title}">
    <div class="movie-info">
        <h3>${title}</h3>
        
        <span class="${getColor(vote_average)}">${vote_average}</span>
         
        </div>


    <div class="overview">
        <h3>overvie</h3>
        ${overview}
            `
            main.appendChild(moviE1);
    })
}
function getColor(vote){
  if(vote>=8){
    return "green"
  }else if(vote>=5){
    return "red"
  }else{
    return "orange"
  }
}
form.addEventListener("submit" , (x)=>{
  x.preventDefault();
  const searchTerm=search.value;
  if(searchTerm){
    getMovies(searchURL+"&query="+searchTerm)
  }else{
    getMovies(API_URL)
  }

})