<script>
    import { Doughnut} from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['chartData'],
  mounted () {
    this.renderChart(this.chartData)
  },
  watch:{
    chartData(){
      this.renderChart(this.chartData)
    }
  }
}
</script>
