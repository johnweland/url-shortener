# URL Shorten-er

## Setup

### Deploy live
1. deploy to a service like Heroku
2. Set the following env
    - MONGO_URI
    - JWT_KEY
    - BASE_URL

> Note: 
>
> *MONGO_URI* must be to your MongoDB server or Mongo Atlas.
>
> *JWT_KEY* should be a random string.
>
> *BASE_URL* should be the domain you want to use. If running on any port other that `:80` you must include that in the base url.

### Deploy Dev
clone this repository to you machine
```
git clone git@github.com:johnweland/url-shortener.git .
```
move to the directory
```
cd into the root api folder *here*
```
install depencancies
```
npm install
```
configure env
```
touch nodemon.json
```
add the above env variables to your nodemon.json file.

run
```
npm run dev
```


---
## Endpoints
We will use http://short.ly as your example domain name

### Default Endpoint
End Use
```
GET /:code
```
ex http://short.ly/RANDOM
The above example looks for a request to /:urlCode with a `GET` method.
If the URL exists it redirects to the large URL it links to.


### User Endpoints
To register a new API user...
```
POST /api/user/register
{
    email: *valid email required*
    password: *gets hashed*
}
```
The above example looks for a request to /api/url/create with a `POST` method.

To authenticate and authorize an API user...

```
POST /api/user/auth
{
    email: *valid email required*
    password: *is hashed*
}
```
The above example looks for a request to /api/user/auth with a `POST` method and returns a token

```
DELETE /api/user/:id
{
    email: *valid email required*
    password: *is hashed*
}
```

The above example looks for a request to /api/user/:id with a `DELETE` method. *:id* is the id of the user as saved in Mongo DB.

*For the /api/user endpoint this is the only protected route*

### URL Endpoints

To Create a short URL using your base URL
```
POST /api/url/create
{
    urlCode: *optional*,
    longURL: http://long.amazon.com/url/with/lots/of?querystring=params,
    token: *authentication-token*
}
```
The above example looks for a request to /api/url/create with a `POST` method.
Leaving urlCode as null, the API will automatically create one.
The example above would result in http://short.ly/RANDOM

However, if you specify one like 'twitch' would result in http://short.ly/twitch

To delete a short URL using its *_id* field...
```
DELETE /api/url/:id
{
    token: *authentication-token*
}
```
The above example looks for a request to /api/url/:id with a `DELETE` method. :id is the id of the url as saved in Mongo DB.

To retrieve and array of URL...
```
GET /api/url/list
{
    token: *authentication-token*
}
```
The above example looks for a request to /api/url/list with a `GET` method and will return a array of URLs.

*All requests to /api/url requires and authentication token.*
