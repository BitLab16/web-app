import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import DateTimePicker from '@/components/DateTimePicker'

const jsonDataObj = {
  "ciao": "ciao",
  "m": [1,3]
}
global.fetch = jest.fn().mockImplementation( () =>
  Promise.resolve({
    catch: () => Promise.resolve( {} ),
    json: () => Promise.resolve( jsonDataObj )
  })
)

describe('App.vue', () => {

  let wrapper;
  beforeEach(()=>{
    wrapper = shallowMount(App, {propsData: {}});
  });

  test("creazione App", () => {
    expect(wrapper).not.toBe(undefined);
  })
  
  test("riceve e salva la data nuova emessa da DateTimePicker", () => {
    wrapper.findComponent(DateTimePicker).vm.$emit("pickedDate", "2019-07-06");
    expect(wrapper.vm.data_selezionata).toBe("2019-07-06");
  });
  test("riceve e salva il nuovo orario emesso da DateTimePicker", () => {
    wrapper.findComponent(DateTimePicker).vm.$emit("pickedTime", "11:30");
    expect(wrapper.vm.orario_selezionato).toBe("11:30");
  });
  test("dataOggi ritorna la data di oggi", () => {
    var date = new Date();
    expect(wrapper.vm.dataOggi())
    .toBe(date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate());
  });
  test("controlla che array dati sia ben formato", () => {
    wrapper.vm.dati_ricevuti_grezzi = ({'18:00':[]});
    expect( wrapper.vm.received_data_is_valid(wrapper.vm.dati_ricevuti_grezzi) )
    .toBeTruthy;
  });
  test("dati non ricevuti nel fetch", async (done) => {
    wrapper.vm.received_data_is_valid = jest.fn().mockImplementation( () => false );
    wrapper.vm.parseDataAndUpdateMap = jest.fn().mockImplementation( () => {} );
    wrapper.vm.$refs.Map.update_map = jest.fn().mockImplementation( ()=>{} );
    await wrapper.vm.fetchData();
    expect(wrapper.vm.parseDataAndUpdateMap).not.toHaveBeenCalled();
    done();
  });
  test("dati ricevuti nel fetch, ma non validi", async (done) => {
    wrapper.vm.received_data_is_valid = jest.fn().mockImplementation(
      () => false
    );
    wrapper.vm.parseDataAndUpdateMap = jest.fn().mockImplementation(
      () => {}
    );
    await wrapper.vm.fetchData();
    expect(wrapper.vm.parseDataAndUpdateMap).toHaveBeenCalledTimes(0);
    done();
  });
})
