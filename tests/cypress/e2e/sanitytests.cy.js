import BlitsExampleContent from '../locators/BlitsExample'
import { navigateToNextSection, themingScreenNavigation, navigateToFireBoltScreen, navigateToFireBoltInternalScreens } from '../utils/commonMethods'

describe('Demos', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'))
    cy.wait(3000)
  })

  it('HomeScreen', () => {
    cy.wait(4000)
    cy.compareSnapshot({name : 'Home screen',  testThreshold: 0.1})
    cy.wait(2000)
  })

  it('ThemingScreen', () => {
    navigateToNextSection(2, 'ThemingScreen', 1000)
  })

  it('ThemingScreen_1', () => {
    themingScreenNavigation('ThemingScreen_1', 'rightArrow')
  })

  it('ThemingScreen_2', () => {
    themingScreenNavigation('ThemingScreen_2', 'upArrow')
  })

  it('ThemingScreen_3', () => {
    themingScreenNavigation('ThemingScreen_3', 'rightArrow' ,'upArrow')
  })

  it('SpritesScreen', () => {
    navigateToNextSection(4, 'SpritesScreen', 1000)
  })

  it('FocusScreen', () => {
    navigateToNextSection(5, 'FocusScreen', 1000)
  })

  it('MemoryGameScreen', () => {
    navigateToNextSection(6, 'MemoryGameScreen', 1000)
  })
  // TODO
  // it('Video Player screen', () => {
  //   navigateToNextSection(7, 'Video Player Screen', 3000)
  // })
})

describe('Examples and Tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'))
    cy.wait(3000)
    BlitsExampleContent.getBody.type('{downArrow}')
  })

  it('GradientsScreen', () => {
    navigateToNextSection(2, 'GradientsScreen')
  })

  it('KeyInputScreen', () => {
    navigateToNextSection(8, 'KeyInputScreen', 750)
  })

  it('ShowScreen', () => {
    navigateToNextSection(12, 'ShowScreen')
  })

  it('EventScreen', () => {
    navigateToNextSection(13, 'EventsScreen', 500)
  })

  it('RouterHooksScreen', () => {
    navigateToNextSection(18, 'RouterHooksScreen')
  })

  it('TranslationsScreen', () => {
    navigateToNextSection(20, 'TranslationsScreen', 2000)
  })

  it('FireBoltScreen', () => {
    navigateToFireBoltScreen(21)
    cy.compareSnapshot({ name:  'FireBoltHomeScreen', testThreshold: 0.05 })
  })
  it('FireBoltScreen-DeviceScreen', () => {
    navigateToFireBoltInternalScreens(21,'FireBolt-DeviceMake', 2000, 0.05, 0)
  })

  it('FireBoltScreen-DeviceScreen', () => {
    navigateToFireBoltInternalScreens(21,'FireBolt-DeviceModel', 2000, 0.05, 1)
  })

  it('FireBoltScreen-DeviceScreen', () => {
    navigateToFireBoltInternalScreens(21,'FireBolt-DeviceName', 2000, 0.05, 2)
  })

  it('FireBoltScreen-DeviceScreen', () => {
    navigateToFireBoltInternalScreens(21,'FireBolt-Network', 2000, 0.05, 3)
  })

  it('FireBoltScreen-DeviceScreen', () => {
    navigateToFireBoltInternalScreens(21,'FireBolt-Platform', 2000, 0.05, 4)
  })

})

