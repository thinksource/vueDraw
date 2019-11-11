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
    <button @click="drawSVG">Draw SVG</button>
    <div id="SVGcontainer" ref="SVG">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { SVGError, SVGElement } from '../store/types'
import { it } from 'mocha'

@Component
export default class InputArea extends Vue {
  desc: string=''
  alertItems: Array<SVGError>=[]
  @Watch('desc')
  txtChange (value: string, oldValue: string) {
    if (typeof value === 'string') {
      let sItems = value.split(/\n/)
      this.alertItems = this.alertList(sItems)
    }
  }

  drawSVG () : void {
    let DOM = document.getElementById('SVGcontainer') as HTMLElement
    let svgtxt = this.desc.split('\n')
    let result = ''
    if (this.alertItems.length === 0) {
      for (let i in svgtxt) {
        let elem = this.SVGTrans(svgtxt[i]) as SVGElement
        result += elem.toSVGItem()
      }

      // console.log(result)
      DOM.innerHTML = `<svg width="250" height="250" xmlns="http://www.w3.org/2000/svg">${result}</svg>`
    } else {
      DOM.innerHTML = `<canvas width="800" id="myCanvas" height="100"
      style="border:1px solid #d3d3d3;"
      </canvas>`
      const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
      var ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      ctx.font = '30px Arial'
      ctx.fillStyle = 'red'
      ctx.fillText('Errors during parse SVG Items', 10, 50)
    }
  }

  private SVGTrans (txt: string) {
    let itemtxt = txt.split(' ')
    switch (itemtxt[0].toLowerCase()) {
      case 'r':
        return new SVGElement('rect', itemtxt.slice(1))
      case 'c':
        return new SVGElement('circle', itemtxt.slice(1))
      case 'p':
        return new SVGElement('polygon', itemtxt.slice(1))
      case 'e':
        return new SVGElement('ellipse', itemtxt.slice(1))
      default:
        return undefined
    }
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

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
