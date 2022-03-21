import { mount } from '@vue/test-utils'
import QueryResult from '@/components/QueryResult'

describe('QueryResult component', () => {
  test('renders without crashing', () => {
    mount(QueryResult,{
        stubs: ['fa'],
    })
  })
})
