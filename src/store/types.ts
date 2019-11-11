export class SVGError {
  msg: string;
  line: number;
  p: number;
  constructor (msg: string, line: number, p: number) {
    this.msg = msg
    this.line = line
    this.p = p
  }

  toString () {
    return `${this.line}:${this.p}:${this.msg}`
  }

  static readtxtWithErrors (txt: string, line: number) {
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
          return SVGError.checkNumber(itemtxt, line, index)
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
          return SVGError.checkNumber(itemtxt, line, index)
        }
      case 'e':
        if (itemtxt.length !== 5) {
          return new SVGError(
            'Ellipse should have 4 parameters',
            line,
            index + itemtxt[0].length + 1
          )
        } else {
          return SVGError.checkNumber(itemtxt, line, index)
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
              if (!SVGError.numberValid(demensions[0])) {
                console.log(demensions[0])
                return new SVGError('Can not parse x demension', line, index)
              }
              if (!SVGError.numberValid(demensions[1])) {
                return new SVGError('Can not parse y demension', line, index)
              }
              return undefined
            }
          }
        }
        break
      default: {
        if (txt !== '') {
          return new SVGError(`The SVG object can not begin with ${itemtxt[0]}`, line, 0)
        } else {
          return undefined
        }
      }
    }
  }

  static checkNumber (itemtxt: Array<string>, line: number, index: number) {
    const max = 250

    for (let i = 1; i < itemtxt.length; i++) {
      index += itemtxt[i - 1].length + 1
      if (!SVGError.numberValid(itemtxt[i])) {
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

  static numberValid (x: string) {
    const numberform = new RegExp('^[0-9]+$')
    if (numberform.test(x)) {
      return true
    } else return false
  }
}

export class SVGElement {
  name: string
  p: Array<string>
  color: string
  allColor = ['Azure', 'Beige', 'Blcak', 'Blue', 'Brown', 'Chocolate', 'Coral', 'Cornsilk', 'Cyan', 'Gray', 'Green', 'Ivory', 'Lime', 'Linen', 'Magenta', 'Navy', 'Olive', 'Orange', 'Orchid', 'Peru', 'Pink', 'Plum', 'Purple', 'Red', 'Silver', 'Tan', 'Violet', 'Wheat', 'Yellow']
  constructor (name: string, parameters: Array<string>, color?: string) {
    this.name = name
    this.p = parameters
    this.color = color || this.allColor[Math.floor(Math.random() * this.allColor.length)]
  }

  toSVGItem () {
    switch (this.name.toLowerCase()) {
      case 'circle':
        return `<circle cx="${this.p[0]}" cy="${this.p[1]}" r="${this.p[2]}" fill="${this.color}"/>`
      case 'rect':
        return `<rect x="${this.p[0]}" y="${this.p[1]}" width="${this.p[2]}" height="${this.p[3]}" fill="${this.color}"/>`
      case 'polygon':
        let joinarray = this.p.join(' ')
        return `<polygon points="${joinarray}" fill="${this.color}"/>`
      case 'ellipse':
        return `<ellipse cx="${this.p[0]}" cy="${this.p[1]}" rx="${this.p[2]}" ry="${this.p[3]}" fill="${this.color}"/>`
      default:
        return ''
    }
  }

  toString () {
    this.toSVGItem()
  }
}
