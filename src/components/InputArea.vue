<template>
  <div>
    <h2>Realtime draw SVG elements:</h2>
    <textarea v-model="desc" @change="txtChange" rows="8" cols="50"></textarea>
    <div>
      <h2>Errors in TextArea:</h2>
    </div>
    <ul id="alertList">
      <li v-for="item in alertItems" :key="item">{{ item.toString() }}</li>
    </ul>
    <button @click="drawSVG" class="makedraw">Draw SVG</button>
    <button @click="clean" class="clear">Clear</button>
    <div id="SVGcontainer" ref="SVGcontainer" class="draw">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { SVGError, SVGElement } from '../store/types'
import { it } from 'mocha'

@Component
export default class InputArea extends Vue {
   @Prop() desc!: string;
  alertItems: Array<SVGError>=[]
  @Watch('desc')
  txtChange (value: string, oldValue: string) {
    if (typeof value === 'string') {
      let sItems = value.split(/\n/)
      this.alertItems = this.alertList(sItems)
    }
  }

  clean () : void {
    this.alertItems = []
    this.desc = ''
    let DOM = this.$refs.SVGcontainer as HTMLElement
    DOM.innerHTML = ''
  }

  drawSVG () : void {
    let DOM = this.$refs.SVGcontainer as HTMLElement
    if (!this.desc) {
      this.fillCanvasTxt('Empty TextArea!', DOM)
      return
    }
    let svgtxt = this.desc.split('\n')
    let result = ''
    if (this.alertItems.length === 0) {
      for (let i in svgtxt) {
        let elem = SVGElement.readFromString(svgtxt[i]) as SVGElement
        if (typeof elem === 'object') {
          result += elem.toSVGItem()
        }
      }

      // console.log(result)
      DOM.innerHTML = `<svg width="250" height="250" xmlns="http://www.w3.org/2000/svg">${result}</svg>`
    } else {
      this.fillCanvasTxt('Errors during parse SVG Items', DOM)
    }
  }

  private fillCanvasTxt (txt: string, dom: HTMLElement) {
    dom.innerHTML = `<canvas width="250" id="myCanvas" height="200"
    style="border:1px solid #d3d3d3;"
    </canvas>`
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
    var ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.font = '16px Arial'
    ctx.fillStyle = 'red'
    ctx.fillText(txt, 10, 50)
  }

  private alertList (items: Array<string>) {
    let ret: Array<SVGError> = []
    for (let i = 0; i < items.length; i++) {
      let error = SVGError.readtxtWithErrors(items[i], i)
      if (error as SVGError) {
        ret.push(error as SVGError)
      }
    }
    return ret
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.makedraw {
  color: white;
  background-color: #4CAF50;
}

.clear {
  color: white;
  background-color: gray;
}

button {
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.draw {
  text-align: center;
  height: 250px;
  width: 250px;
  border-style: solid;
  margin: auto;
}
</style>
