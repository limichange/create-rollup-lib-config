const buble = require('rollup-plugin-buble')
const uglify = require('rollup-plugin-uglify')
const postcss = require('rollup-plugin-postcss')

module.exports = function createConfig ({
  input = 'src/index.js',
  distDir = 'dist',
  author = '',
  name,
  version = '1.0.0',
  typeList = ['umd', 'cjs', 'es']
}) {
  if (!name) {
    throw new Error('options: need a lib name')
  }

  if (!typeList.length || typeList.length === 0) {
    throw new Error('options: need a type')
  }

  const banner =
    '/*!\n' +
    ' * ' + name + '.js v' + version + '\n' +
    ' * (c) 2018-' + new Date().getFullYear() + ` ${author}\n` +
    ' * Released under the MIT License.\n' +
    ' */'

  let config = [{
    input,
    plugins: [
      buble(),
      postcss({
        extract: true
      })
    ],
    output: []
  }]

  const typeCheck = {
    umd: typeList.includes('umd'),
    cjs: typeList.includes('cjs'),
    es: typeList.includes('es')
  }

  if (!(typeCheck.umd || typeCheck.es || typeCheck.cjs)) {
    return []
  }

  if (typeCheck.es) {
    config[0].output.push({
      file: `${distDir}/${name}.esm.js`,
      format: 'es',
      banner
    })
  }

  if (typeCheck.cjs) {
    config[0].output.push({
      file: `${distDir}/${name}.common.js`,
      format: 'cjs',
      banner
    })
  }

  if (typeCheck.umd) {
    config[0].output.push({
      file: `${distDir}/${name}.js`,
      format: 'umd',
      name,
      banner
    })

    config.push({
      input,
      plugins: [
        buble(),
        uglify(),
        postcss({
          extract: true
        })
      ],
      output: [
        {
          file: `${distDir}/${name}.min.js`,
          format: 'umd',
          name,
          banner
        }
      ]
    })
  }

  return config
}
