# Node JS Note

## zod 
npm i zod  
https://www.npmjs.com/package/zod  

## joi
npm install joi  
https://www.npmjs.com/package/joi  

## express
npm i express  
npm install --save-dev @types/express  
https://www.npmjs.com/package/express  

## prisma
npm install --save-dev prisma  
https://www.prisma.io/  
npx prisma init  
npm install @prisma/client  
npx prisma generate  
npx prisma migrate dev --create-only : to see the changes  
npx prisma migrate dev : to do migrate  

## bcrypt
npm install bcrypt  
npm install --save-dev @types/bcrypt  
https://www.npmjs.com/package/bcrypt  

## uuid
npm install uuid  
npm install --save-dev @types/uuid  
https://www.npmjs.com/package/uuid  

## jest
npm install --save-dev jest @types/jest  
https://www.npmjs.com/package/jest  

```json
"scripts": {
    "test": "jest -i"
}
```
jest run paralel, to avoid that (db race condition), add -i  
https://stackoverflow.com/questions/42827054/how-do-i-run-a-single-test-using-jest  
./node_modules/jest/bin/jest  
npm test  
npx jest for all test  
npx jest test/user-api.test.js  
npx jest --runTestsByPath test/api-test/user-api.test.js for test in file  
npx jest --testNamePattern "should register user" or npx jest -t "should register user"  

## babel
npm install --save-dev babel-jest @babel/preset-env  
https://babeljs.io/setup#installation  

## supertest
npm install --save-dev supertest @types/supertest  
https://www.npmjs.com/package/supertest  

## cookie-parser
npm i cookie-parser  

## timeout
npm install connect-timeout  

## file upload to handle uploading file
npm i express-fileupload  

## file type to checking type of file
npm install file-type  

## eslint
npm i eslint --save-dev  
https://eslint.org/  
extention on vs code eslint  
create configuration file eslint.config.js  

## redis
npm i ioredis  

## rabbitmq
https://www.rabbitmq.com/tutorials/tutorial-one-javascript  
npm install amqplib  

## kafka
https://kafka.js.org/  
npm install kafkajs  

## jwt
https://www.npmjs.com/package/jsonwebtoken  
npm i jsonwebtoken  