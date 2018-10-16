<template id="hello">
  <div>
    <h1>Hello</h1>
    <p>This is the tutorial about Hello.</p>
  </div>
</template>

<script>
export default {
  '/hello': 'Hello',
  mounted() {
    this.getCourses()
  },
  methods: {
    getCourses(){
      this.$axios.get('/api/course')
                 .then(response=>{
                   console.log(response)
                 })
                 .catch(err=>{
                   console.log(err)
                 });
    }
  },
}
</script>