import { mount } from "@vue/test-utils";
import IndexPage from "@/pages/index.vue";

test('should first', () => { 
    mount(IndexPage, {
        stubs: ['fa']
    })

 })