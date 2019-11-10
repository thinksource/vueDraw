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
}

export class SVGElement {
  name: string
  p: Array<string>
  color: string
  allColor = ['Azure', 'Beige', 'Blcak', 'Blue', 'Brown', 'Chocolate']
  constructor (name: string, parameters: Array<string>, color?: string) {
    this.name = name
    this.p = parameters
    this.color = color || this.allColor[Math.floor(Math.random() * this.allColor.length)]
  }

  toSVGItem () {
    switch (this.name) {
      case 'circle':
        return `<circle cx="${this.p[0]}" cy="${this.p[1]}" r="${this.p[2]}" fill="${this.color}"/>`
      case 'rect':
        return `<rect x="${this.p[0]}" y="${this.p[1]}" width="${this.p[2]}" height="${this.p[3]} fill="${this.color}"/>`
      case 'polygon':
        let joinarray = this.p.join(' ')
        return `<polygon points="${joinarray}" fill="${this.color}">`
    }
  }
}
