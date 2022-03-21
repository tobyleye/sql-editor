import {mount} from "@vue/test-utils"
import EditorLayout from "@/components/EditorLayout";

describe('EditorLayout component', () => { 
    test('renders without crashing',()=>{
        mount(EditorLayout,{
            stubs: ['fa'],
        })

    })
 })