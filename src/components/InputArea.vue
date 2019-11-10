<template>
  <div>
    <textarea v-model="desc" @change="txtChange" rows="8" cols="50"></textarea>
    <div>
      <h2>Errors in TextArea:</h2>
    </div>
    <ul id="alertList">
      <li v-for="item in alertItem" :key="item">{{ item.toString() }}</li>
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
  alertItem: Array<SVGError>=[]
  @Watch('desc')
  txtChange (value: string, oldValue: string) {
    if (typeof value === 'string') {
      let sItems = value.split(/\r?\n/)
      // this.data.apply({
      //   desc: value,
      //   alertitems: this.alertList(sItems)
      // })
      // this.data. sItems
      this.alertItem = this.alertList(sItems)
    }
  }

  drawSVG () : void {
    let DOM = document.getElementById('SVGcontainer') as HTMLElement
    let svgtxt = this.desc.split('\n')
    let result = ''
    for (let i in svgtxt) {
      let elem = this.SVGTrans(svgtxt[i]) as SVGElement
      result += elem.toSVGItem()
    }
    // if(DOM as Document){
    console.log(result)
    DOM.innerHTML = `<svg width="250" height="250" xmlns="http://www.w3.org/2000/svg">${result}</svg>`
    // }
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
      default:
        return undefined
    }
  }

  private alertList (items: Array<string>) {
    let ret: Array<SVGError> = []
    for (let i = 0; i < items.length; i++) {
      let error = this.errorText(items[i], i)
      if (error as SVGError) {
        ret.push(error as SVGError)
      }
    }
    return ret
  }

  private errorText (txt: string, line: number) {
    let itemtxt = txt.split(' ')
    let index = 0
    switch (itemtxt[0].toLowerCase()) {
      case 'r':
        if (itemtxt.length !== 5) {
          return new SVGError(
            'Rectangle should have 4 parameters',
            line,
            index + itemtxt[0].length + 1
          )
        } else {
          return this.checkNumber(itemtxt, line, index)
        }
      case 'c':
        if (itemtxt.length !== 4) {
          console.log(itemtxt.length)
          return new SVGError(
            'Circle should have 3 parameters',
            line,
            index + itemtxt[0].length + 1
          )
        } else {
          return this.checkNumber(itemtxt, line, index)
        }
      case 'p':
        if (itemtxt.length < 3) {
          return new SVGError('Polygon should have more than 3 point', line, txt.length - 1)
        } else {
          for (let i = 1; i < itemtxt.length; i++) {
            index += itemtxt[i - 1].length + 1
            let demensions = itemtxt[i].split(',')
            if (demensions.length !== 2) {
              return new SVGError('Can not divided into 2 demension point', line, index)
            } else {
              if (!this.numberValid(demensions[0])) {
                console.log(demensions[0])
                return new SVGError('Can not parse x demension', line, index)
              }
              if (!this.numberValid(demensions[1])) {
                return new SVGError('Can not parse y demension', line, index)
              }
              return undefined
            }
          }
        }
        break
      default: {
        if (itemtxt.length > 0) {
          return new SVGError(`The SVG object can not begin with ${itemtxt[0]}`, line, 0)
        } else {
          return undefined
        }
      }
    }
  }

  private checkNumber (itemtxt: Array<string>, line: number, index: number) {
    const max = 250

    for (let i = 1; i < itemtxt.length; i++) {
      index += itemtxt[i - 1].length + 1
      if (!this.numberValid(itemtxt[i])) {
        return new SVGError('The number is not validat', line, index)
      }
      let num = parseInt(itemtxt[i], 10)
      if (num < 0) {
        return new SVGError(
          'The point position below 0 is invalidate',
          line,
          index
        )
      } else if (num > max) {
        return new SVGError(
          `The point position over ${max} is invalidate`,
          line,
          index
        )
      }
    }
    return undefined
  }

  private numberValid (x: string) {
    const numberform = new RegExp('^[0-9]+$')
    console.log(numberform.test(x))
    if (numberform.test(x)) {
      return true
    } else return false
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
