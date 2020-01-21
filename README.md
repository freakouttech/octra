#init

- npm i
- docker build ./db/
- docker-compose up --build
- npm run start


#endpoints

- GET http://localhost:3000/totalGainsByCustomerId?customerId={}&activityData=${}&stockId=${}
- GET http://localhost:3000/totalTransactionAmountByCustomer?customerId={}&activityData=${}&stockId=${}
- GET http://localhost:3000/totalNumberOfTradesByCustomer?customerId={}&activityData=${}&stockId=${}