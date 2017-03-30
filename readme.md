# form-lifecycle [![Build Status](https://travis-ci.org/ajoslin/form-lifecycle.svg?branch=master)](https://travis-ci.org/ajoslin/form-lifecycle)

> Lifecycle logic for forms: edit, submit, error, success, pending. Good with redux. <1kb.


## Install

```
$ npm install --save form-lifecycle
```

## Usage

- [With Redux](#with-redux)

```js
var form = require('form-lifecycle')

var form = form.create()
// => {pristine: true, error: false, pending: false, fields: {}}

var form2 = form.edit(form, {username: 'robot'})
// => {pristine: true, error: false, pending: false, fields: { username: 'robot' }})

var form4 = form.submit(form3)
// => {pristine: true, error: null, pending: true, fields: { username: 'robot' }})

var form5 = form.error(form4, 'error!')
// => {pristine: false, error: 'error!', pending: false, fields: { username: 'robot' }})
```

## API

Every action returns a new form object, never mutating the existing one.

#### `Lifecycle.create(initial)` -> `form`

Also available as alias: `form.reset(initial)`

Creates a basic form, extended by `initial` if desired.

```js
{
  pristine: true
  pending: false
  error: null
  fields: {}
}
```

#### `Lifecycle.edit(form, newFields) -> newForm`

Extends `fields` with `newFields`.

#### `Lifecycle.submit(form) -> newForm`

- `pending` to true
- `pristine` to true
- `error` to null
- `fields` unchanged

#### `Lifecycle.error(form, [error]) -> newForm`

- `pending` to false
- `pristine` to false
- `error` to supplied error or null
- `fields` unchanged

#### `Lifecycle.success(form) -> newForm`

- `pending` to false
- `pristine` to true
- `error` to null
- `fields` unchanged

#### `Lifecycle.atObjectPath(path) -> lifecycleAtPath`

Given a string or array path, returns a lifecycle of functions that take an object as the first argument instead of a form.

The form will make changes to the object at the given path, and return the changed object.

Example:

```js
var Form = require('form-lifecycle')
var state = {
  login: {
    form: Form.create()
  }
}
var loginForm = Form.atObjectPath('login.form')

// Creates a new state object, with all references the same except for the path to state.login.form.
var newState = loginForm.submit(state)
```

### With Redux

```js
var Form = require('form-lifecycle')
var initialState = {
  login: {
    form: Form.create()
  }
}
var loginForm = Form.atObjectPath('login.form')

function myReducer (state, action) {
  switch(action.type) {
    case 'LOGIN': return loginForm.submit(state)
    case 'LOGIN_SUCCESS': loginForm.success(state)
    case 'LOGIN_ERROR': loginForm.error(state, action.payload)
    case 'LOGIN_EDIT_FORM': loginForm.edit(state, action.payload)
  }
}
```

## License

MIT © [Andrew Joslin](http://ajoslin.com)
