# URL Shorten-er

## Setup

### Deploy live
1. deploy to a service like Heroku
2. Set the following env variables
    - MONGO_URI
    - SESSION_SECRET
    - BASE_URL
3. point your domain to your Heroku app

> *MONGO_URI* must be to your MongoDB server or Mongo Atlas.
> 
> *ACCESS_TOKEN_SECRET* nice long mybe 64bytes to hex
>
> *REFRESH_TOKEN_SECRET* nice long mybe 64bytes to hex
>
> *SESSION_SECRET* nice long mybe 64bytes to hex
>
> *BASE_URL* should be the domain you want to use. The one you pointed to Heroku. If running on any port other than `:80` you must include that in the base url.

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
The above example looks for a request to /:url with a `GET` method.
If the URL exists it redirects to the large URL it links to.


### User Endpoints
To register a new API user...
```
POST user/register
{
    name: *what you want to be called*
    email: *valid email required*
    password: *gets hashed*
}
```
The above example looks for a request to /user/register with a `POST` method.

To authenticate and authorize an API user...

```
POST /user/login
{
    email: *valid email required*
    password: *is hashed*
}
```
The above example looks for a request to /user/login with a `POST` method.


### URL Endpoints

To Create a short URL using your base URL
```
POST /shorten
{
    full: http://long.amazon.com/url/with/lots/of?querystring=params,
}
```
The above example looks for a request to /shorten with a `POST` method.
Leaving urlCode as null, the API will automatically create one.
The example above would result in http://short.ly/RANDOM

To delete a short URL using its *_id* field...
```
DELETE /url/:id
```
The above example looks for a request to /url/:id with a `DELETE` method. :id is the id of the url as saved in Mongo DB.

To retrieve and array of URL...
```
GET /
```
The above example looks for a request to / with a `GET` method and will renderthe UI with URLs from MongoDB.

*All requests to /url requires authentication.*
