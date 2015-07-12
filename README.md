# Sketch Gallery

Show off your sketches in this open art gallery.

[![dependencies](https://david-dm.org/nihey/sketch-gallery.png)](https://david-dm.org/nihey/sketch-gallery)

# Contribute with art

If you feel like contributing to this project as an artist, draw your sketch
[here](http://nihey.github.io/sketch-gallery/). It will be publicly displayed -
and if is very good, it can stay at this gallery permanently.

# Removal Critera

Only sketches that contain "beauty" will be displayed at this gallery
permanently. I know "beauty" is a philosophical matter, some might not
agree with the curator ([nihey](http://github.com/nihey)).

Before removing a sketch, a backup will be made, so restoration is possible.

If you believe a sketch that has been removed should be restored,
open an [issue](https://github.com/nihey/sketch-gallery/issues) and it'll be
discussed.

# Rules

Any kind of art may be published in this gallery, it doesn't matter how hideous
it is - its art after all. I just ask you to not flood the gallery - because if
it does get flooded, I'll have to change this project so that only approved
sketches are displayed.

# Storage

This project has it's data currently being stored at [Firebase](https://www.firebase.com),
using it's free plan (`hacker plan`). This greatly reduces the latency when
retrieving a sketch, but it limits it to 100MB storage and 5GB transfer.

This means that at some point, the maximum storage or tranfer could be hit, and
the service will be going down - but if it does that means this became quite
popular.

But if these limit keep being hit frequently, I'll transfer the data to a
private server with a higher latency but larger tranfer and storage.

# Building

It is recommended to have the [`webpack`](http://webpack.github.io/) module installed and up to date:
```
$ npm install -g webpack
```
Then, the project may be built by running:
```
$ npm install
$ webpack
```

# Running

Run any `http` server on the `dist` directory:
```
$ cd dist
$ python -m SimpleHTTPServer # visit the app on http://localhost:8000
```
