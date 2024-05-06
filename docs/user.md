# User Api Spec

## Register
Endpoint: POST /api/v1/user/register
Accept: application/json
Content-Type: application/json
Request Body:
```json
{
    "username": "username",
    "email": "email",
    "password": "password@A1"
}
```

Success:
Http status: 201
Response Body Success:
```json
{
    "data": {
        "username": "username",
        "email": "email"
    },
    "error": ""
}
```

Bad Request:
Http status: 400
Response Body Bad Request:
```json
{
    "data": "",
    "error": "wrong email format"
}
```

Internal server error:
Http status: 500
Response Body Internal Server Error:
```json
{
    "data": "",
    "error": "internal server error"
}
```

## Login
Endpoint: POST /api/v1/user/login
Accept: application/json
Content-Type: application/json
Request Body:
```json
{
    "email": "email",
    "password": "password@A1"
}
```

Success:
Http status: 200
Response Body Success:
```json
{
    "data": {
        "username": "username",
        "email": "email"
    },
    "error": ""
}
```
if client is web browser: set cookie to client
if client is mobile: put token on response body
```json
{
    "data": {
        "username": "username",
        "email": "email",
        "token": "unique-token"
    },
    "error": ""
}
```

Bad Request:
Http status: 400
Response Body Bad Request:
```json
{
    "data": "",
    "error": "wrong email or password"
}
```

Internal server error:
Http status: 500
Response Body Internal Server Error:
```json
{
    "data": "",
    "error": "internal server error"
}
```

## Check Authentication
Endpoint: POST /api/v1/check-authentication
Accept: application/json
Content-Type: application/json

Before login:
Http status: 401
Response Body Bad Request:
```json
{
    "data": "",
    "error": "unauthorized"
}
```

Internal server error:
Http status: 500
Response Body Internal Server Error:
```json
{
    "data": "",
    "error": "internal server error"
}
```

After login:
Header:
- Authorization: token

Success:
Http status: 200
Response Body Success:
```json
{
    "data": "successfully authenticated",
    "error": ""
}
```

## Check Permission
Endpoint: POST /api/v1/check-permission
Accept: application/json
Content-Type: application/json

Before login:
Http status: 401
Response Body Bad Request:
```json
{
    "data": "",
    "error": "unauthorized"
}
```

After login:
Header:
- Authorization: token

Success:
Http status: 200
Response Body Success:
```json
{
    "data": "successfully permitted",
    "error": ""
}
```

Forbidden:
Http status: 403
Response Body Success:
```json
{
    "data": "",
    "error": "forbidden"
}
```

Internal server error:
Http status: 500
Response Body Internal Server Error:
```json
{
    "data": "",
    "error": "internal server error"
}
```

## Update User
Endpoint: PATCH /api/v1/user
Accept: application/json
Content-Type: application/json
Header:
- Authorization: token
Request Body:
```json
{
    "username": "username",
    "email": "email"
}
```

Success:
Http status: 200
Response Body Success:
```json
{
    "data": {
        "username": "username",
        "email": "email"
    },
    "error": ""
}
```

Bad Request:
Http status: 400
Response Body Bad Request:
```json
{
    "data": "",
    "error": "wrong email format"
}
```

Internal server error:
Http status: 500
Response Body Internal Server Error:
```json
{
    "data": "",
    "error": "internal server error"
}
```

## Change Password
Endpoint: PATCH /api/v1/user/change-password
Accept: application/json
Content-Type: application/json
Header:
- Authorization: token
Request Body:
```json
{
    "oldPassword": "password",
    "newPassword": "password"
}
```

Success:
Http status: 204
Response Body Success:
```json
{
    "data": "successfully password changed",
    "error": ""
}
```

Bad Request:
Http status: 400
Response Body Bad Request:
```json
{
    "data": "",
    "error": "wrong password format"
}
```

Internal server error:
Http status: 500
Response Body Internal Server Error:
```json
{
    "data": "",
    "error": "internal server error"
}
```

## Logout
Endpoint: PATCH /api/v1/user/logout
Accept: application/json
Content-Type: application/json
Header:
- Authorization: token

Success:
Http status: 200
Response Body Success:
```json
{
    "data": "logout successfully",
    "error": ""
}
```

Internal server error:
Http status: 500
Response Body Internal Server Error:
```json
{
    "data": "",
    "error": "internal server error"
}
```