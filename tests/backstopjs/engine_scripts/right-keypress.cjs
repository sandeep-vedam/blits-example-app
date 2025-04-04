module.exports = async (page, scenario, args) => {
    console.log('SCENARIO > ' + scenario.label)
    console.log('SCENARIOS-------',scenario.scriptArgs!== undefined ? scenario.scriptArgs[0].value : 0 )
    let count = scenario.scriptArgs !== undefined ? scenario.scriptArgs[0].value : 0
    console.log('SCRIPT ARGS:', count)
    console.log('Waiting for 1 seconds before pressing the right arrow key...')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    for(let i = 0; i < count;i++ ){
      await page.keyboard.press('ArrowRight')
    }
    await new Promise((resolve) => setTimeout(resolve, 750))
  }