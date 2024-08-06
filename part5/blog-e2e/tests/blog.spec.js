const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {

        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Daniel Eriksson',
                username: 'daniel',
                password: 'secret'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {

    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {

        })

        test('fails with wrong credentials', async ({ page }) => {

        })
    })
})