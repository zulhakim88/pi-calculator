# The PI calculator

A simple PI and Circumference calculator app.

## Features

- Create and login with a User (Managed by Firebase).
- Upgrade a user from a free tier to a paid tier. User tier will affect the API calls.
- Calculate PI to the Nth decimal point precision.
- Use that PI value to calculate the circumfrence of any given Radius.

## Client side app flow diagram

![alt text](https://github.com/zulhakim88/pi-calculator/blob/master/client/public/app-flow-diagram.png?raw=true)

## The Journey

### Why PI?

I was simply curious 😅.

### The PI algorithm

[Fabrice Bellard's](https://bellard.org/quickjs/pi.html) take on [Chudnovsky's algorithm](https://en.wikipedia.org/wiki/Chudnovsky_algorithm).

### The Stack

- ViteJS and React Typescript as the frontend.
- NodeJS Express for the backend.
- Firebase for user authentication.

### The Test

- I've generated up to 1,000,000 PI decimal points and works as expected.

- I've compared the PI generated to [1 million digits of PI](https://pi2e.ch/blog/2017/03/10/pi-digits-download/).

### The Issues

- It is slower when trying to make the API call when the backend reaches ~1.5mil decimal points of PI.

## How to run the project

### The Requirements

You will need this to run the project:

- npm
- vite (to build the frontend)
- tailwind css as the design framework
- firebase app credentials on the client side for authentication processes (register, login, logout users)
- firebase-admin credentials on the server side for user management functions (add custom claims, update user information)

### Start the server

```
cd server
npm i
npm run dev
```

### Start the app

```
cd client
npm i
npm run dev
```

Frontend: http://localhost:5173

## The Limitations

- PI and circumference values are not persisted. So if the backend is re-run, both values will reset.

## The Future

- Probably find a better(faster) PI generating algorithm and run it as a separate service. Sharing service with the API app is not ideal.
- I decided to use Node/Express as it's the easiest/fastest for me to start of with. Probably using a more robust/high performance languages like Rust or Go.
- Write test for the implementation of both APIs and Frontend app.
- Scalibility (Never really thought about it).
