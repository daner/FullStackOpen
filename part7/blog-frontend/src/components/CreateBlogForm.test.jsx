import { render, screen } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

test('calls add blog handler with correct information', async () => {
    const createBlog = vi.fn()

    const testBlog = {
        author: 'Test Author',
        title: 'Test Title',
        url: 'example.com',
    }

    render(<CreateBlogForm createHandler={createBlog} />)

    const authorInput = screen.getByTestId('author-input')
    const titleInput = screen.getByTestId('title-input')
    const urlInput = screen.getByTestId('url-input')

    const userEvents = userEvent.setup()

    await userEvents.type(authorInput, testBlog.author)
    await userEvents.type(titleInput, testBlog.title)
    await userEvents.type(urlInput, testBlog.url)

    const button = screen.getByText('create')
    await userEvents.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe(testBlog.author)
    expect(createBlog.mock.calls[0][0].title).toBe(testBlog.title)
    expect(createBlog.mock.calls[0][0].url).toBe(testBlog.url)
})
