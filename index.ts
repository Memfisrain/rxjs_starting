import {Observable} from 'rxjs';

const MOVIES_URL = 'movies.json';

let output = document.getElementById('output');
let button = document.getElementById('button');

let clickSource = Observable.fromEvent(button, 'click');

clickSource
    .flatMap(e => load(MOVIES_URL))
    .subscribe(renderMovies);

function load(url: string) {
  return Observable.create(observer => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      let movies = JSON.parse(xhr.responseText);
      observer.next(movies);
      observer.complete();
    });

    xhr.open('GET', url);
    xhr.send();
  });
}

function renderMovies(movies) {
  movies.forEach(movie => {
    let div = document.createElement('div');
    div.innerText = movie.title;
    output.appendChild(div);
  });
}

