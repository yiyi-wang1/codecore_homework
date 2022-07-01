## Installation

1. Clone the repo 
```
git clone 
```

2. install NPM package
```
npm install
```

3. create database 
```
createdb --echo super-team-picker
```

4. create table and generate test data, run the following
```
knex migrate:latest
knex seed:run
```


5. start the application, run the following, see the web running on http://localhost:3000 on your browser
```
npm start
```
