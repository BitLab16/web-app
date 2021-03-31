<template>
    <div>
    </div>
</template>

<script>

export default {
    name: 'Grafico',
    data() {
        return {
            infoContent: [],
        }
    },
    props: {
        string: {type: String, require: true}
    },
    methods: {
        async fetchContent (/*code*/) { 
            const infoContent = await (
                await fetch("http://localhost:3000/points/"/*code*/)
                .catch( error => {
                    //TODO: sistemare il caso in cui non ricevo dati!
                    alert("errore nel fetch");
                    console.error("Errore nel fetch " + error);
                })
            ).json();
            this.createContent(infoContent);
        },
        createContent(infoContent) {
            var string = "";
            //const mediaFlow = this.daysFlow(infoContent);
            //for(let i; i<infoContent[0].gatherings.length; i++) {
                string = '<h1>' + infoContent[0].name + '</h1>' +
                    '<h2> Description: </h2>' +
                    //'<p>' + infoContent[0].description + '</p>' +
                    '<link rel="stylesheet" href="https://unpkg.com/charts.css/dist/charts.min.css">'+
                    '<table id="grafico" class="charts-css column show-heading show-labels show-primary-axis show-data-on-hover">' +
                        '<caption> Flusso di persone </caption>' +
                        '<tbody>' +
                        '<tr>' +
                            '<th scope="row"> LUN </th>' +
                            '<td style="--size: calc( 1/ 100 )"> 10 </td>' +
                        '</tr>'+
                        '<tr>'+
                            '<th scope="row"> MAR </th>'+
                            '<td style="--size: calc( 20/ 100 )"> 20 </td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th scope="row"> MER </th>'+
                            '<td style="--size: calc( 30/ 100 )"> 30 </td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th scope="row"> GIO </th>'+
                            '<td style="--size: calc( 40/100 )"> 40 </td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th scope="row"> VEN </th>'+
                            '<td style="--size: calc( 50/ 100 )"> 50 </td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th scope="row"> SAB </th>'+
                            '<td style="--size: calc( 60/ 100 )"> 60 </td>'+
                        '</tr>'+
                        '<tr>'+
                            '<th scope="row"> DOM </th>'+
                            '<td style="--size: calc( 70/ 100 )"> 70 </td>'+
                        '</tr>'+
                        '</tbody>'+
                    '</table>'
           // }
            this.$emit("updateString", string);
        },
    }
}

</script>