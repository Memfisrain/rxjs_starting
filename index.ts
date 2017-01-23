import {Observable} from 'rxjs';
import loadWithFetch from './loader';

const MOVIES_URL = 'movides.json';

let output = document.getElementById('output');
let button = document.getElementById('button');

let clickSource = Observable.fromEvent(button, 'click');

loadWithFetch(MOVIES_URL)
    .subscribe(renderMovies, loadErrorHandler);

clickSource
    .flatMap(e => loadWithFetch(MOVIES_URL))
    .subscribe(renderMovies, loadErrorHandler);

function renderMovies(movies) {
  movies.forEach(movie => {
    let div = document.createElement('div');
    div.innerText = movie.title;
    output.appendChild(div);
  });
}

function loadErrorHandler(e) {
  console.log(`Error is ${e}`)
}

