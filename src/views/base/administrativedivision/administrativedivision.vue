<template>
  <div>administrativedivision

      <div class="tree" @click="gettree()">gettree</div>
  </div>
</template>
<script>
export default {
  methods: {
    gettree() {
      this.$http.post(this.$api.areatree,{ areaId: "100000000000000000000000000000000000000000000000000000000000" }).then(res=>{
          console.log(res,11);
      });
    },
  },
};
</script>
<style  scoped>
.tree{
    text-align: left;
}
</style>