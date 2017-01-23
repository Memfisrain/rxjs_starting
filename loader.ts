import {Observable} from 'rxjs';

export default function loadWithFetch(url: string) {
  return Observable.defer(() => {
    return Observable.fromPromise(
        fetch(url).then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            return Promise.reject(res);
          }
        }));
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
