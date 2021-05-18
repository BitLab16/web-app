import { shallowMount } from '@vue/test-utils'
import Map from '@/components/Map.vue'

describe('components/Map.vue', () => {

  let wrapper;
  beforeEach(()=>{
    var mockgoogle = jest.fn().mockImplementation(()=>{return {then: ()=>{}}});
    wrapper = shallowMount(Map, {propsData: {data: {}}, methods: {$gmapApiPromiseLazy: mockgoogle}});
  });


  test("creazione Mappa", () => {
    expect(wrapper).not.toBe(undefined);
  })

  test("update map senza markers", () => {
    wrapper.vm.$gmapApiPromiseLazy = jest.fn().mockImplementation(()=>{return {then: ()=>{}}});
    wrapper.vm.update_map();
    expect(wrapper.vm.$gmapApiPromiseLazy).toHaveBeenCalledTimes(2);
  })

  test("update map con markers", () => {
    wrapper.vm.$gmapApiPromiseLazy = jest.fn().mockImplementation(()=>{return {then: ()=>{}}});
    wrapper.vm.markers = [1,2];
    wrapper.vm.update_map();
    expect(wrapper.vm.$gmapApiPromiseLazy).toHaveBeenCalledTimes(1);
  })

  test("pointsGenerator no data risultato vuoto",  () => {
    var result = wrapper.vm.pointsGenerator();
    expect(Object.keys(result).length).toBe(0);
  });

  test("pointsGenerator con data risultato non vuoto",  () => {
    wrapper.vm.data = {
      "11-1-1": {
        "18:30": [{flow:2}, {flow:4}, {flow:3}]
      }
    }
    wrapper.vm.data["11-1-1"]["18:30"].map = (a)=>{ return {11:22} };
    wrapper.vm.data_selezionata = "11-1-1";
    wrapper.vm.orario_selezionato = "18:30";
    var result = wrapper.vm.pointsGenerator();
    expect(Object.keys(result).length).not.toBe(0);
  });
  
  test("recupero dati pointsGenerator",  () => {
    wrapper.vm.data = {
      "11-1-1": {
        "18:30": [{flow:2}, {flow:4}, {flow:3}]
      }
    }
    wrapper.vm.data["11-1-1"]["18:30"].map = (a)=>{ return {11:22} };
    wrapper.vm.data_selezionata = "11-1-1";
    wrapper.vm.orario_selezionato = "18:30";
    var result = wrapper.vm.pointsGenerator();
    expect(result).toStrictEqual({11:22});
  });

})
