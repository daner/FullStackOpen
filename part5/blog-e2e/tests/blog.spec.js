const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, createUser, resetDatabase } = require('./helper')

const backendUrl = 'http://localhost:3001'
const frontendUrl = 'http://localhost:5173'

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await resetDatabase(request, backendUrl)
        await createUser(request, backendUrl, 'daniel', 'Daniel Eriksson', 'secret')
        await page.goto(frontendUrl)
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page).toHaveTitle('Bloglist');
        await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
        await expect(page.getByTestId('username-input')).toBeVisible();
        await expect(page.getByTestId('password-input')).toBeVisible();
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'daniel', 'secret')          

            await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'daniel', 'wrongsecret')

            await expect(page.getByTestId('notification')).toContainText('Wrong username or password')
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'daniel', 'secret')
        })

        test('a new blog can be created', async ({ page }) => {
            await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
        })

        test('can like blog', () => {

        })

        test('can delete blog', () => {

        })

        test('can not delete blog created by another user', ({ page, request }) => {

        })

        test('blogs are sorted by likes', () => {

        })
    })
})