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
      data: Array,
  },
  components: {
  },
  mounted() {
  },
  updated() {
      //console.log("UPDATED");
  },
  methods: {

  }
}
</script>