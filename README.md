# solution-factory-test

# config files
database.json - файл с настройками подключения к БД для db-migtare
config/db.config.js - файс с настройками подключения к БД для pg

# setup project
npm install

# creating database tables from migration
npm run migrate up

# compiles and hot-reloads for development
npm run dev

# queries:
POST http://localhost:3000/api/auth/signup - запрос на регистрацию. поля body запроса: login, password

POST http://localhost:3000/api/auth/signin - запрос на авторизацию. поля body запроса: login, password. возвращает access-token, необходимый для работы с остальными запросами

POST http://localhost:3000/api/book - запрос на добавление книги. поля body запроса: title, date, description, author, image. требует заголовок x-access-token, значение которого должно быть равно access-token

GET http://localhost:3000/api/books - запрос на извлечение книг. поля query запроса: groupby - поле, по которому нужно произвести группировку, orderby - поле, по которому нужно произвести сортировку, limit - ограничение на количество выдаваемых книг, offset - сдвиг. требует заголовок x-access-token, значение которого должно быть равно access-token
значение полей limit и offset должно быть положительным числом
поля groupby и orderby могут иметь следующие значения: id, title, date, author, description, image
если поле groupby установлено, то поле orderby может иметь значение, равное полю groupby

PUT http://localhost:3000/api/book/:id - запрос на изменение книги. поля body запроса: title, date, description, author, image. требует заголовок x-access-token, значение которого должно быть равно access-token