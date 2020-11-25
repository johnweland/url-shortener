const router = require('express').Router();
const controller = require('@controllers/user');
const auth = require('@middleware/auth');

/**
 * @api                 {get}       /user               Get user information
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission                   Authenticated       Logged in user with valid token access only
 * @apiHeader           {string}    x-auth-token        Users unique access-key.
 * @apiHeaderExample    {json} Header-Example:
 * {
 *      "x-auth-token ": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ..."
 * }
 * @apiSuccess (2xx)    {json}      Success             200 OK; User profile data
 * @apiError   (4xx)    {json}      NotFound            404 Not Found; User of <code>id</code> was not found.
 * @apiUse InternalServerError
 */
router.get('/', auth, controller.get);

/**
 * @api                 {post}      /user/login         Authenticate an exisiting user
 * @apiVersion 1.0.0
 * @apiName PostUserLogin
 * @apiGroup User
 * @apiParam            {string}    Email               User's email address
 * @apiParam            {string}    Password            Password
 * @apiParamExample Example Body:
 * {
 *      email: "bob.ross@example.com",
 *      password: 12345
 * }
 * @apiSuccess (2xx)    {json}      Success             200 OK; Authorization Token && User profile data
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *      token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 ...
 *      user: {
 *          email: "bob.ross@example.com",
 *          displayName: "Bob"
 *      }
 * }
 * @apiError   (4xx)    {json}      Unauthorized        401 Unauthorized; Invalid credentials.
 * @apiUse InternalServerError
 */
router.post('/login', controller.login);

/**
 * @api                 {post}      /user/register      Register a new user account
 * @apiVersion 1.0.0
 * @apiName PostUserRegister
 * @apiGroup User
 * @apiParam            {string}    Email               User's email address
 * @apiParam            {string}    Password            Password
 * @apiParam            {string}    ConfirmPassword     Confirmation Password
 * @apiParam            {string}    [DisplayName=email] Display Name, if not provided user's email will be used.
 * @apiParamExample Example Body:
 * {
 *      email: "bob.ross@example.com",
 *      password: 12345,
 *      passwordCheck: 12345,
 *      displayName: "Bob"
 * }
 * @apiSuccess (2xx)    {json}      Created             201 Created; User profile data
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 Created
 * {
 *      email: "bob.ross@ example.com"
 *      displayName: "Bob"
 * }
 * @apiError   (4xx)    {json}      ValidationFailed   400 Bad Request; Validation of data has failed.
 * @apiError   (4xx)    {json}      Conflict           409 Conflict; An account with this email already exists.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *      message: "Password and Password Confirmation do not match"
 * }
 * @apiUse InternalServerError
 */
router.post('/register', controller.register);

/**
 * @api                 {post}      /user/validate      Validate user auth token
 * @apiVersion 1.0.0
 * @apiName PostUserValidate
 * @apiGroup User
 * @apiSuccess (2xx)    {json}      Success             200 OK; True
 * @apiError   (4xx)    {json}      BadRequest          400 Bad Request; Missing x-auth-token.
 * @apiError   (4xx)    {json}      Forbidden           401 Forbidden; x-auth-token unable to be verified.
 * @apiError   (4xx)    {json}      NotFound            404 Not Found; user <code>id</code> not found.
* @apiErrorExample Error-Response:
 * HTTP/1.1 401 Bad Request
 * {
 *      false
 * }
 * @apiUse InternalServerError
 */
router.post('/validate', controller.validate);

/**
 * @apiDefine InternalServerError
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiError   (5xx)    {json}      InternalServerError 500 Internal Server Error; Something went wrong.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 Not Found
 * {
 *   "message": "Something went wrong."
 * }
 */
module.exports = router;