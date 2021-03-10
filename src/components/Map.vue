<template>
    <div>
        <br/><br/><br/><br/><br/><br/><br/>
        <p>ciao {{data}} </p>

    </div>
</template>

<script>
export default {
  name: 'Map',
  props: {
      data: Object,
  },
  components: {
  },
  created() {
      //TODO:
      // mettere la mappa con API google
      // chiamare update_map affinchè si popoli la prima heatmap
  },
  updated() {
  },
  methods: {
      update_map() {
          console.log("UPDATED_MAP::" + JSON.stringify(this.data).substr(0,400))
          //TODO:
          // in funzione di data_selezionata e orario_selezionato
          // creare il nuovo array di dati da visualizzare e applicarla
          // chiama setMap(dati_per_nuova_heatmap) per applicarli
      },
      setMap(/*dati_nuova_heatmap*/) {
          //TODO:
          // in funzione di dati_nuova_heatmap
          // mettere la nuova heatmap con API google
      }
  }
}
</script>