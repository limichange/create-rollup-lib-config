const createRollupLibConfig = require('../../src/index.js')
const pkg = require('../../package.json')

const defaultConfig = {
  name: 'test',
  author: pkg.author,
  version: process.env.VERSION || pkg.version
}

describe('create rollup lib config', () => {
  it('default', () => {
    const rollupConfig = createRollupLibConfig(defaultConfig)

    expect(rollupConfig.length).toBe(2)
    expect(rollupConfig[0].input).toBe('src/index.js')
    expect(rollupConfig[1].input).toBe('src/index.js')
  })

  it('typeList is foo', () => {
    const rollupConfig = createRollupLibConfig({
      ...defaultConfig,
      typeList: [ 'foo' ]
    })

    expect(rollupConfig.length).toBe(0)
  })

  it('just umd', () => {
    const rollupConfig = createRollupLibConfig({
      ...defaultConfig,
      typeList: ['umd']
    })

    expect(rollupConfig.length).toBe(2)
  })

  it('just es', () => {
    const rollupConfig = createRollupLibConfig({
      ...defaultConfig,
      typeList: ['es']
    })

    expect(rollupConfig.length).toBe(1)
    expect(rollupConfig[0].output.length).toBe(1)
  })
})
