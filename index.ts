import {Observable} from 'rxjs';

let numbers = [1,3,5];
let source = Observable.create(function(observer) {

  let index = 0;
  let producer = () => {
    if (index < numbers.length) {
      observer.next(numbers[index++]);

      setTimeout(producer, 200);

    } else {
      observer.complete();
    }
  };

  producer();
})
    .map(n => n * 10)
    .filter(n => n <= 30)

source.subscribe({
  next: v => console.log(`value is ${v}`),
  error: e => console.log(`error is ${e}`),
  complete: () => console.log('complete')
});

