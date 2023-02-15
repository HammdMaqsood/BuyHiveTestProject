<template>
    <div >
  <!-- <button @click="showModal = true" class="button">Show Modal</button> -->
  <transition name="fade" appear>
    <div class="modal-overlay" 
         v-if="showModal" 
         @click="showModal = false"></div>
    
  </transition>
  <transition name="pop" appear> 
    <div class="modal" 
         role="dialog" 
         v-if="showModal"
         >
      <h1>Vue Transitions</h1>
      <p>The <code>&lt;transition&gt;</code> component in Vue can create wonderful animated entrances and exits.</p>
      <button @click="showModal = false" class="button">Hide Modal</button>

    </div>
  </transition>
</div>
   
</template>

<script>
export default {
  data() {
    return { 
        showModal:false,
    }
  },
  methods:{
}
}
</script>

<style scoped>

html {
  height: 100%;
  background: rgba(242, 242, 242, 255);
  color: #000;
  font-size: 62.5%;
}

body {
  min-height: 100%;
  margin: 0;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
}

.button {
  border: none;
  color: rgba(242, 242, 242, 255);
  background: #42b983;
  appearance: none;
  font: inherit;
  font-size: 1.8rem;
  padding: .5em 1em;
  border-radius: .3em;
  cursor: pointer;
}

.modal {
 
  /* position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
   box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  /* background:rgba(242, 242, 242, 255); */
  z-index:999;
  transform: none;
  background-color: rgba(242, 242, 242, 255);
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0px auto 0px 62px;
  border-radius: 10px;
   position: fixed;

}
.modal h1 {
  margin: 0 0 1rem;
}

.modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  
  opacity: 0.6;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}


</style>
