import { useMemo } from 'react'
import { Generator, HtmlGenerator, parse } from 'latex.js'

import 'katex/dist/katex.css'

class CustomMacros {
  g: Generator

  constructor(generator: Generator) {
    this.g = generator
  }

  static args = {
    'includegraphics': ['H', 'k'],
  }
}

// @ts-ignore
CustomMacros.prototype.includegraphics = function(file: string) {
  const img = this.g.create('img')
  img.src = `${import.meta.env.VITE_API_URL}/${file}`

  return [img]
}

export default function Latex({ text }: { text: string }) {
  const html = useMemo(() => {
    const generator = new HtmlGenerator({
      hyphenate: false,
      CustomMacros: CustomMacros,
    })
    // TODO: do this some other way
    const t = text.replace(/\\(begin|end)\{equation\*\}/g, '$$$$')
    const doc = parse(t, { generator: generator })
    const domFragment = doc.domFragment()

    return domFragment.firstChild.outerHTML
  }, [text])

  return (
    <div className='latex' dangerouslySetInnerHTML={{ __html: html }}></div>
  )
}
