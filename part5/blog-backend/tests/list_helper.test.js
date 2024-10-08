const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const lists = require('./data/blogs')

test('dummy returns one', () => {
    const result = listHelper.dummy(lists.emptyList)
    assert.strictEqual(result, 1)
})

describe('totalLikes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(lists.emptyList)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(lists.withOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(lists.withMultipleBlogs)
        assert.strictEqual(result, 36)
    })

})

describe('favoriteBlog', () => {
    test('of empty list should return null', () => {
        const result = listHelper.favoriteBlog(lists.emptyList)
        assert.strictEqual(result, null)
    })

    test('when list has only one blog return that', () => {
        const result = listHelper.favoriteBlog(lists.withOneBlog)
        assert.deepStrictEqual(result, { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5 })
    })

    test('of bigger list return first with most likes', () => {
        const result = listHelper.favoriteBlog(lists.withMultipleBlogs)
        assert.deepStrictEqual(result, { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 })
    })
})

describe('mostBlogs', () => {
    test('of empty list should return null', () => {
        const result = listHelper.mostBlogs(lists.emptyList)
        assert.strictEqual(result, null)
    })

    test('when list has only one blog return author of that blog', () => {
        const result = listHelper.mostBlogs(lists.withOneBlog)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
    })

    test('of bigger list return first author with most blogs', () => {
        const result = listHelper.mostBlogs(lists.withMultipleBlogs)
        assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
    })

})

describe('mostLikes', () => {
    test('of empty list should return null', () => {
        const result = listHelper.mostLikes(lists.emptyList)
        assert.strictEqual(result, null)
    })

    test('when list has only one blog return author and likes of that blog', () => {
        const result = listHelper.mostLikes(lists.withOneBlog)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 })
    })

    test('of bigger list return first author with most likes', () => {
        const result = listHelper.mostLikes(lists.withMultipleBlogs)
        assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
    })
})