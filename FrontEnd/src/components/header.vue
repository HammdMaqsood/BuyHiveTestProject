<template>
    <header>
      <nav>
        <ul>
            <!-- <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/add">AddBlog</RouterLink></li> -->
            <li> LOGO </li>
            <li>Expert Sourcing</li>
            <li>Contract Manufacturing</li>
            <li>Buy</li>
            <li> Financing </li>
            <li>About US</li>
            <li id="reg">Register</li>
            <li>Sign in</li>
        </ul>
      </nav>      
    </header>
</template>

<script>
export default {
  data() {
    return { 
    }
  },
  methods:{
}
}
</script>

<style scoped>
 #reg
{
  border: 5px #444;

}
ul{
    list-style-type: none;
    text-align: center;
    margin: 0;
}
li{
    display: inline-block;
    /* margin: 0 10px; */
    margin-right: 50px;
}
a{
    color: #fff;
    text-decoration: none;
    padding: 6px 8px;
    border-radius: 10px;
}
nav{
    /* background: #444; */
    padding: 14px 0;
    width: 100%;
}
header
{
    width: 100%;
    margin: auto ;
   
}

</style>
