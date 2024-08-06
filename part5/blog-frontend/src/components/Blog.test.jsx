import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

const blog = {
    title: "Title",
    author: "Author",
    url: "example.com",
    likes: 42,
    user: {
        name:"Testname",
        username: "test"
    }
}

const user = {}

test('only renders author and title', () => {

    const { container } = render(<Blog blog={blog} user={user} updateHandler={() => {}} errorHandler={() => {}} deleteHandler={() => {}} />)

    expect(container.querySelector('.blog')).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(screen.queryAllByText(`${blog.url}`).length).toBe(0)
    expect(screen.queryAllByText(`likes ${blog.likes}`).length).toBe(0)
})


test('show url and likes after clicking button', async () => {
    
    render(<Blog blog={blog} user={user} updateHandler={() => {}} errorHandler={() => {}} deleteHandler={() => {}} />)

    const button = screen.getByText("view")
    const userEvents = userEvent.setup()

    await userEvents.click(button)

    expect(screen.queryAllByText(`${blog.url}`).length).toBe(1)
    expect(screen.queryAllByText(`likes ${blog.likes}`).length).toBe(1)
})

test("updatehandler called after like button is clicked", async () => {

    let likes = 0;

    const updateHandler = () => {
        likes += 1
    }

    render(<Blog blog={blog} user={user} updateHandler={updateHandler} errorHandler={() => {}} deleteHandler={() => {}} />)

    const showButton = screen.getByText("view")
    const userEvents = userEvent.setup()

    await userEvents.click(showButton)

    const likeButton = screen.getByText("like")

    await userEvents.click(likeButton)
    await userEvents.click(likeButton)

    expect(likes).toBe(2)
})
