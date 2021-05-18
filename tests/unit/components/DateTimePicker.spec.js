import { shallowMount } from '@vue/test-utils'
import DateTimePicker from '@/components/DateTimePicker.vue'
import datetime from '@/components/DateTimePicker/datetime-picker.vue';
import VueSlideBar from 'vue-slide-bar';

describe('components/DateTimePicker.vue', () => {

  let wrapper;
  beforeEach(()=>{
    wrapper = shallowMount(DateTimePicker, {propsData: {}, methods: {} });
  });

  test("creazione DateTimePicker", () => {
    expect(wrapper).not.toBe(undefined);
  });

  test("creazione sottocomponenti DateTimePicker", () => {
    let datetimeRef = wrapper.findComponent(datetime);
    let VueSlideBarRef = wrapper.findComponent(VueSlideBar);
    expect(datetimeRef.exists()).toBe(true);
    expect(VueSlideBarRef.exists()).toBe(true);
  });


});
