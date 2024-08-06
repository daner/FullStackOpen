const loginWith = async (page, username, password) => {
    await page.getByTestId('username-input').fill(username)
    await page.getByTestId('password-input').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, author, title, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('author-input').fill(author)
    await page.getByTestId('title-input').fill(title)
    await page.getByTestId('url-input').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
}

const createUser = async (request, baseUrl, username, name, password) => {
    await request.post(baseUrl + '/api/users', {
        data: {
            name: name,
            username: username,
            password: password
        }
    })
}

const resetDatabase = async (request, baseUrl) => {
    await request.post(baseUrl + '/api/testing/reset')
}


export { loginWith, createBlog, createUser, resetDatabase }