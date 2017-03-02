# bar-lord
Making drinking accessible
#####[Trello Board](https://trello.com/b/qWNrrwoB/bar-lord)

---
## List of Resources

### Awesome Lists
* [Awesome Redux](https://github.com/xgrommx/awesome-redux)
* [Awesome React](https://github.com/enaqx/awesome-react)

### File Structure
* [A Better File Structure For React/Redux Applications](https://marmelab.com/blog/2015/12/17/react-directory-structure.html)

### Official Docs
* [Redux](http://redux.js.org/)
* [react](https://facebook.github.io/react/)
* [Sequelize](http://docs.sequelizejs.com/en/v3/)
* [Express 4](http://expressjs.com/en/4x/api.html)
* [Webpack 2](https://webpack.js.org/configuration/)
* [Lodash](https://lodash.com/docs/4.17.4)
* [ESLint](http://eslint.org/)

## Git Notes

#### Commits
  * [prog] - progress on specific feature has been made
  * [feat] - implementation of specific feature
  * [fix] - fixing bugs 
  * [style] - styling changes
  * [setup] - changes to readme,gitignore,package.json, webpack
  * [refactor] - code does the same thing but it is better code

#### Useful commands
* **Adding upstream:** git remote add [upstream] https://github.com/lazer-beam/bar-lord.git
* **Rebasing:** git pull --rebase [upstream] master
* **Delete local branch:** git branch -d [branchName]

## Postgres Notes

##### How to connect to postgres in terminal
```sql
psql "DB_CONNECTION_URL"
```

##### show all tables in database
```sql
\dt
```

##### list table schema
```sql
\d <table_name>
\d+ <table_name>
```

* **Cheatsheet:** https://gist.github.com/apolloclark/ea5466d5929e63043dcf

* **CamelCased Tables:** Have to be in quotes
```sql
SELECT * FROM "tableName"
```

## Testing Links
* **Mocha:** https://mochajs.org/
* **Chai:** http://chaijs.com/api/
* **SuperTest:** https://github.com/visionmedia/supertest
* **SuperAgent:** https://github.com/visionmedia/superagent
* **Sinon:** http://sinonjs.org/

## Database
![Database](http://i.imgur.com/5HQ4YQv.png "DB")