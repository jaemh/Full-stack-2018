import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog.js'

configure({ adapter: new Adapter() })


describe.only('<SimpleBlog />', () => {
  it('renders title', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Liisa',
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleDiv = blogComponent.find('.title')
    const likesDiv = blogComponent.find('.likes')
    
    expect(titleDiv.text()).toContain(blog.title);
    expect(likesDiv.text()).toContain(blog.likes);
  })

    it('', () => {
    const blog = {
        title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
        author: 'Liisa',
        likes: 5
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
        <SimpleBlog
            blog={blog}
            onClick={mockHandler}
        />
    )

    const button = blogComponent.find('button')
      button.simulate('click')
      button.simulate('click')

      expect(mockHandler.mock.calls.length).toBe(2)

    })
  })