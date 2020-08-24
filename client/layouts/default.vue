<template>
  <div>
    <Navbar/>
    <Nuxt />
    <Footer/>

  </div>
</template>

<script>
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export default {
  componets:{
    Navbar,
    Footer
  }
}
</script>
<style>

</style>
