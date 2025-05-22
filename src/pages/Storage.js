/*
 * Copyright 2025 Comcast Cable Communications Management, LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import Blits from '@lightningjs/blits'

const Item = Blits.Component('Item', {
  template: `
    <Element :color="$hasFocus ? '#60a5fa' : '#eff6ff'" w="200" h="200" :effects="[{type: 'radius', props: {radius: 12}}]">
      <Text
        :content="$name"
        :size="$hasFocus ? 38 : 32"
        :color="$hasFocus ? '#eff6ff' : '#2563eb'"
        placement="{x: 'center', y: 'middle'}"
      />
    </Element>
  `,
  props: ['name', 'cat'],
  state() {
    return {
      message: null,
    }
  },
  input: {
    enter() {
      this.$emit('add-to-cart', { name: this.name, cat: this.cat })
    },
  },
})

const Row = Blits.Component('Row', {
  components: {
    Item,
  },
  template: `
    <Element>
      <Text :content="$title" size="40" @loaded="$onItemLoaded" :y="$y" />
      <Item :for="(item, index) in $items" name="$item" cat="$title" x="$index * 250 + 150" ref="item" />
    </Element>
  `,
  props: ['title', 'items'],
  state() {
    return {
      focusIndex: -1,
      y: 100,
    }
  },
  hooks: {
    focus() {
      this.focusIndex = 0
      this.$trigger('focusIndex')
    },
    unfocus() {},
  },
  watch: {
    focusIndex(v) {
      this.$select('item' + v).$focus()
    },
  },
  input: {
    right() {
      this.focusIndex = Math.min(this.focusIndex + 1, this.items.length - 1)
    },
    left() {
      this.focusIndex = Math.max(this.focusIndex - 1, 0)
    },
  },
  methods: {
    onItemLoaded(...args) {
      this.y = this.y - args[0].h / 2
    },
  },
})

const Button = Blits.Component('Button', {
  template: `
    <Element w="950" h="100" :color="$hasFocus ? '#087e13' : '#9feec3'" :effects="[{type: 'radius', props: {radius: 20}}]">
      <Text
        :content="$title"
        placement="middle"
        align="center"
        maxwidth="950"
        size="50"
        :color="$hasFocus ? '#FFFF99' : '#000080' "
      />
    </Element>
  `,
  props: ['title'],
  input: {
    enter() {
      this.$emit('on-button-click')
    },
  },
})

const Storage = Blits.Component('Storage', {
  components: {
    Row,
    Button,
  },
  template: `
    <Element width="100%" y="50">
      <Text placement="{x: 'center'}" size="50">Super Mart</Text>
      <Row title="Fruits" x="200" y="150" :items="['Apple', 'Banana', 'Orange', 'Grapes', 'Pineapple']" ref="row1" />
      <Row title="Snacks" x="200" y="400" :items="['Pizza', 'Sushi', 'Burger', 'Pasta', 'Tacos'] " ref="row2" />
      <Button x="600" y="700" ref="row3" title="Checkout" />

      <Element
        w="100"
        h="100"
        x="400"
        y="700"
        color="red"
        :effects="[{type: 'radius', props: {radius: 50}}]"
        :scale.transition="$scale"
      >
        <Text :content="$count" placement="middle" maxWidth="100" :x="$x" @loaded="$onCountLoaded" />
      </Element>
    </Element>
  `,
  state() {
    return {
      focusIndex: 1,
      fruits: {},
      snacks: {},
      count: 0,
      x: 50,
      scale: 1,
    }
  },
  watch: {
    focusIndex(v) {
      this.$select('row' + v).$focus()
    },
  },
  hooks: {
    ready() {
      this.$listen('add-to-cart', ({ name, cat }) => {
        if (cat === 'Snacks') {
          if (this.snacks[name] === undefined) {
            this.snacks[name] = 1
          } else {
            this.snacks[name] = this.snacks[name] + 1
          }
        } else if (cat === 'Fruits') {
          if (this.fruits[name] === undefined) {
            this.fruits[name] = 1
          } else {
            this.fruits[name] = this.fruits[name] + 1
          }
        }
        this.count++
        this.scale = 1.2
        this.$setTimeout(() => {
          this.scale = 1.0
        }, 250)
      })

      this.$listen('on-button-click', () => {
        this.$storage.set('fruits', this.fruits)
        this.$storage.set('snacks', this.snacks)
        this.$router.to('/examples/storage/checkout')
      })
    },
    focus() {
      this.$select('row1').$focus()
      this.$trigger('focusIndex')
    },
  },
  input: {
    up() {
      this.focusIndex = Math.max(this.focusIndex - 1, 1)
    },
    down() {
      this.focusIndex = Math.min(this.focusIndex + 1, 3)
    },
  },
  methods: {
    onCountLoaded(...args) {
      this.x = 50 - args[0].w / 2
    },
  },
})

const CartBox = Blits.Component('CartBox', {
  template: `
    <Element>
      <Text :content="$name" size="50" />
      <Element :for="(item, index) in $data" :y=" 100 + $index * 50" x="100">
        <Text content="$item.name" maxWidth="250" />
        <Text content="$item.count" x="250" />
      </Element>
      <Element w="200" h="50" :color="$hasFocus? '#ff0000' : '#aaaaaa' " x="300" :scale.transition="$scale">
        <Text content="Remove" maxwidth="200" align="center" placement="middle" :color="$hasFocus ? '#000' : '#000' " />
      </Element>
    </Element>
  `,
  props: ['name', 'data'],
  state() {
    return {
      scale: 0.9,
    }
  },
  hooks: {
    focus() {
      this.scale = 1.1
    },
    unfocus() {
      this.scale = 0.9
    },
  },
  input: {
    enter() {
      this.$emit('remove-cart-item', this.name)
    },
  },
})

const Cart = Blits.Component('Storage', {
  components: { CartBox, Button },
  template: `
    <Element width="100%" y="50">
      <Text content="Cart" maxwidth="1920" align="center" size="60" />
      <CartBox y="200" name="Fruits" :data="$fruits" ref="cart1" x="200" />
      <CartBox y="200" name="Snacks" :data="$snacks" ref="cart2" x="1200" />
      <Button x="600" y="700" ref="button" title="Clear All" />
    </Element>
  `,
  state() {
    return {
      snacks: [],
      fruits: [],
      focusIndex: 1,
    }
  },
  hooks: {
    ready() {
      this.processFruits()
      this.processSnacks()

      this.$listen('remove-cart-item', (item) => {
        if (item === 'Fruits') {
          this.$storage.remove('fruits')
          this.processFruits()
        } else if (item === 'Snacks') {
          this.$storage.remove('snacks')
          this.processSnacks()
        }
      })
      this.$listen('on-button-click', () => {
        this.$storage.clear()
        this.processFruits()
        this.processSnacks()
      })
    },
    focus() {
      this.$trigger('focusIndex')
    },
  },
  watch: {
    focusIndex(v) {
      this.$select('cart' + v).$focus()
    },
  },
  methods: {
    processFruits() {
      this.fruits = this.getFromStorage('fruits')
    },
    processSnacks() {
      this.snacks = this.getFromStorage('snacks')
    },
    getFromStorage(name) {
      const data = this.$storage.get(name)
      console.log(data)
      let list = []
      for (const item in data) {
        list.push({ name: item, count: data[item] })
      }
      console.log(list)
      return list
    },
  },

  input: {
    left() {
      this.focusIndex = Math.max(this.focusIndex - 1, 1)
    },
    right() {
      this.focusIndex = Math.min(this.focusIndex + 1, 2)
    },
    down() {
      this.$select('button').$focus()
    },
    up() {
      this.$trigger('focusIndex')
    },
  },
})

const StorageRoutes = [
  {
    path: '/examples/storage',
    component: Storage,
  },
  {
    path: '/examples/storage/checkout',
    component: Cart,
  },
]

export default StorageRoutes
