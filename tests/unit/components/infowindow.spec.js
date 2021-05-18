import { shallowMount } from '@vue/test-utils'
import Infowindow from '@/components/Infowindow.vue'

describe('components/Infowindow.vue', () => {

  let wrapper;
  beforeEach(()=>{
    var mockgoogle = jest.fn().mockImplementation(()=>{return {then: ()=>{}}});
    wrapper = shallowMount(Infowindow, {propsData: {data:{}, markers:[]}, methods: {$gmapApiPromiseLazy: mockgoogle} });
  });

  test("creazione Infowindow", () => {
    expect(wrapper).not.toBe(undefined);
  });

  test("creazione contenuto Infowindow nel caso grafico1", () => {
    wrapper.vm.data_selezionata = "a";
    wrapper.vm.orario_selezionato = "b";
    wrapper.vm.data = { "a": {"b": {"c": {flow: 11}}} };
    wrapper.vm.getGrafico1 = jest.fn().mockImplementation(()=>{});
    wrapper.vm.numeroGraficoCorrente = 1;
    let result = wrapper.vm.createContent("c");
    expect(result).not.toBe(undefined);
  });

  test("creazione contenuto Infowindow nel caso grafico2", () => {
    wrapper.vm.data_selezionata = "a";
    wrapper.vm.orario_selezionato = "b";
    wrapper.vm.data = { "a": {"b": {"c": {flow: 11}}} };
    wrapper.vm.getGrafico1 = jest.fn().mockImplementation(()=>{});
    wrapper.vm.numeroGraficoCorrente = 1;
    let result = wrapper.vm.createContent("c");
    expect(result).not.toBe(undefined);
  });
  
  test("creazione grafico1", () => {
    wrapper.vm.data_selezionata = "2019-01-01";
    wrapper.vm.infoContent1 = {
      'flow-average' : {
        'TUESDAY' : [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,88,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9]
      }
    }
    var result = wrapper.vm.getGrafico1();
    expect(result).toMatch("88");
  });
  
  test("creazione grafico2", () => {
    wrapper.vm.infoContent2 = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,88,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9];
    var result = wrapper.vm.getGrafico2();
    expect(result).toMatch("" + (6/88.));
  });

});
