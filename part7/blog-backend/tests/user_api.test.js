const { test, describe, after, beforeEach, before } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const fixure = require('./test_fixture')

let api

before(async () => {
    api = await fixure.before()
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Daniel',
            name: 'Daniel Eriksson',
            password: 'supersecret',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map((u) => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails without password', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Daniel',
            name: 'Daniel Eriksson',
        }

        await api.post('/api/users').send(newUser).expect(400)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with to short password', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Daniel',
            name: 'Daniel Eriksson',
            password: 'sh',
        }

        await api.post('/api/users').send(newUser).expect(400)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with to short username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Da',
            name: 'Daniel Eriksson',
            password: 'secret',
        }

        await api.post('/api/users').send(newUser).expect(400)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with duplicate username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Root',
            password: 'secret',
        }

        await api.post('/api/users').send(newUser).expect(400)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
    await User.deleteMany({})
    await fixure.after()
})
