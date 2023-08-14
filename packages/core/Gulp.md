# Gulp 整理



## Plugins



## Questions

### 1. Did you forget to signal async completion?

> Tasks did not complete and you forget to signal async completion warning
>
> 问题参见: https://stackoverflow.com/questions/36897877/#answer-36899424

在Gulp 4.x 中, 你必须明确地发出任务完成信号。比如一个 流，或者 Promise，或者一个回调函数。

#### 1. Return a Stream
```js
var print = require('gulp-print');

gulp.task('message', function() {
  return gulp.src('package.json')
    .pipe(print(function() { return 'HTTP Server Started'; }));
});
```

#### 2. Return a Promise
```js
gulp.task('message', function() { 
  return new Promise(function(resolve, reject) {
    console.log("HTTP Server Started");
    resolve();
  });
});

// 或者

gulp.task('message', assync () { 
  console.log("HTTP Server Started");
});
```

#### 3. Call the callback function
```js
gulp.task('message', function(done) {
  console.log("HTTP Server Started");
  done();
});
```

#### 4. Return a child process
```js
var spawn = require('child_process').spawn;

gulp.task('message', function() {
  return spawn('echo', ['HTTP', 'Server', 'Started'], { stdio: 'inherit' });
});
```

#### 5. Return a RxJS Observable.
```js
var of = require('rxjs').of;

gulp.task('message', function() {
  var o = of('HTTP Server Started');
  o.subscribe(function(msg) { console.log(msg); });
  return o;
});
```

#### 6. Return an EventEmitter
```js
gulp.task('message3', function() {
  var e = new EventEmitter();
  e.on('msg', function(msg) { console.log(msg); });
  setTimeout(() => { e.emit('msg', 'HTTP Server Started'); e.emit('finish'); });
  return e;
});
```

