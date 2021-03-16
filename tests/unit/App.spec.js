import { shallowMount, mount } from '@vue/test-utils'
import App from '@/App.vue'
import DateTimePicker from '@/components/DateTimePicker'

const jsonDataObj = {
  "ciao": "ciao",
  "m": [1,3]
}
global.fetch = jest.fn().mockImplementation( (data) =>
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
  test("controlla che data sia ben formato", () => {
    expect( wrapper.vm.received_data_is_valid( {} ) )
    .toBe( false );
    expect( wrapper.vm.received_data_is_valid( {"2019":{}} ) )
    .toBe( true );
  });
  test("dati non ricevuti fetch", async (done) => {
    wrapper.vm.$refs.Map.update_map = jest.fn().mockImplementation(() => {});
    var data_clone;
    wrapper.vm.parseDataAndUpdateMap = jest.fn().mockImplementation(
      data => data_clone = data
    );
    await wrapper.vm.fetchData();
    var jsonDataObj2 = jsonDataObj;
    jsonDataObj2.m = 2;
    expect(data_clone).toBe(jsonDataObj2);
    expect(wrapper.vm.$refs.Map.update_map).toHaveBeenCalledTimes(2);
    expect(wrapper.vm.parseDataAndUpdateMap).toHaveBeenCalled();
    done();
  });
})
