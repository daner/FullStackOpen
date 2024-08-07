const { expect } = require('@playwright/test')

const loginWith = async (page, username, password) => {
    await page.getByTestId('username-input').fill(username)
    await page.getByTestId('password-input').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const logout = async (page) => {
    await page.getByRole('button', { name: 'logout' }).click()
}

const createBlog = async (page, author, title, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('author-input').fill(author)
    await page.getByTestId('title-input').fill(title)
    await page.getByTestId('url-input').fill(url)
    await page.getByRole('button', { name: 'create' }).click()
    await expect(page.getByTestId('notification')).toContainText(`${title} by ${author} added to blogs`)
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

const setLikes = async (request, baseUrl, title, likes) => {
    const blogsResponse = await request.get(baseUrl + '/api/blogs')
    const blogs = await blogsResponse.json()
    blogs.forEach(async blog => {
        if (blog.title === title) {
            await request.put(baseUrl + `/api/blogs/${blog.id}`, {
                data: {
                    likes: likes
                }
            })
        }
    });
}

const resetDatabase = async (request, baseUrl) => {
    await request.post(baseUrl + '/api/testing/reset')
}


export { loginWith, createBlog, createUser, resetDatabase, logout, setLikes }