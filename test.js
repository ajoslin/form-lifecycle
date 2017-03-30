'use strict'

var test = require('tape')
var spok = require('spok')
var form = require('./')

test('create', t => {
  spok(t, form.create(), {
    pristine: true,
    pending: false,
    error: null,
    fields: {}
  })
  spok(t, form.create(), form.reset())
  t.end()
})

test('create with arg', t => {
  spok(t, form.create({
    pristine: false,
    fields: {foo: 'bar'}
  }), {
    pristine: false,
    pending: false,
    error: null,
    fields: {foo: 'bar'}
  })
  t.end()
})

test('submit', t => {
  spok(t, form.submit(form.create()), {
    pristine: true,
    pending: true,
    error: null,
    fields: {}
  })
  t.end()
})

test('error', t => {
  spok(t, form.error(form.create(), 123), {
    pristine: false,
    pending: false,
    error: 123,
    fields: {}
  })
  t.end()
})

test('success', t => {
  const erroredForm = form.error(form.create(), 123)
  spok(t, form.success(erroredForm), {
    pristine: true,
    pending: false,
    error: null,
    fields: {}
  })
  t.end()
})

test('edit', t => {
  spok(t, form.edit(form.create(), {username: 'andrew'}), {
    pristine: true,
    pending: false,
    error: null,
    fields: {
      username: 'andrew'
    }
  })
  t.end()
})

test('atObjectPath', t => {
  var state = {
    login: {
      form: form.create()
    },
    other: {}
  }
  var loginForm = form.atObjectPath('login.form')
  var newState = loginForm.submit(state)

  spok(t, newState, {
    other: {},
    login: {
      form: {
        pristine: true,
        pending: true,
        error: null,
        fields: {}
      }
    }
  })

  t.ok(state !== newState, 'state ref changed')
  t.ok(state.other === newState.other, 'ref to other didn\'t change')
  t.ok(state.login !== newState.login, 'ref to login changed')
  t.ok(state.login.form !== newState.login.form, 'ref to login form changed')
  t.end()
})

test('atObjectPath with one key', t => {
  var state = {
    form: form.create(),
    other: {}
  }
  var myForm = form.atObjectPath('form')
  var newState = myForm.submit(state)

  spok(t, newState, {
    other: {},
    form: {
      pristine: true,
      pending: true,
      error: null,
      fields: {}
    }
  })
  t.end()
})
