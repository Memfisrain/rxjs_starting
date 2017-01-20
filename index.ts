import {Observable} from 'rxjs';

const MOVIES_URL = 'movies.json';

let output = document.getElementById('output');
let button = document.getElementById('button');

let clickSource = Observable.fromEvent(button, 'click');

loadWithFetch(MOVIES_URL);

clickSource
    .flatMap(e => loadWithFetch(MOVIES_URL))
    .subscribe(renderMovies);

function loadWithFetch(url: string) {
  return Observable.defer(() => {
    return Observable.fromPromise(
        fetch(url).then(res => res.json()));

  }).retryWhen(retryStrategy({attempts: 4, delay: 1200}));

}

function retryStrategy({attempts = 4, delay = 1000}) {
  return function(errors) {
    return errors
        .scan(acc => acc + 1, 0)
        .takeWhile(acc => acc < attempts)
        .delay(delay);
  }
}

function renderMovies(movies) {
  movies.forEach(movie => {
    let div = document.createElement('div');
    div.innerText = movie.title;
    output.appendChild(div);
  });
}

