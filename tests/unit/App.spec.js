import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import DateTimePicker from '@/components/DateTimePicker'

describe('App.vue', () => {
  test("riceve e salva la data nuova emessa da DateTimePicker", () => {
    const wrapper = shallowMount(App, {propsData: {}});
    wrapper.findComponent(DateTimePicker).vm.$emit("pickedDate", "2019-07-06");
    expect(wrapper.vm.data_selezionata).toBe("2019-07-06");
  });
  test("riceve e salva il nuovo orario emesso da DateTimePicker", () => {
    const wrapper = shallowMount(App, {propsData: {}});
    wrapper.findComponent(DateTimePicker).vm.$emit("pickedTime", "11:30");
    expect(wrapper.vm.orario_selezionato).toBe("11:30");
  });
})
