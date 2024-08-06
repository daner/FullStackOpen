const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, createUser, resetDatabase, logout } = require('./helper')

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
            await createBlog(page, "Test author 1", "Test title 1", "example.com")
            await expect(page.locator('.blog')).toContainText('Test title 1 Test author 1');
            await createBlog(page, "Test author 2", "Test title 2", "example.com")           
            await expect(page.locator('.blog')).toContainText(['Test title 1 Test author 1', 'Test title 2 Test author 2']);
        })

        test('can like blog', async ({ page }) => {
            await createBlog(page, "Test author 1", "Test title 1", "example.com")
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText("likes 1")).toBeVisible()
        })

        test('can delete blog', async ({ page }) => {
            await createBlog(page, "Test author 1", "Test title 1", "example.com")
            await page.getByRole('button', { name: 'view' }).click()
            
            page.on('dialog', dialog => dialog.accept());

            await page.getByRole('button', { name: 'remove' }).click()

            await expect(page.getByTestId('notification')).toContainText(`Test title 1 by Test author 1 removed from blogs`)
            await expect(page.locator('.blog')).toHaveCount(0)
        })

        test('can not delete blog created by another user', ({ page, request }) => {

        })

        test('blogs are sorted by likes', ({ page }) => {

        })
    })
})