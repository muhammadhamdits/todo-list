<template>
  <q-page padding >
    <div class="q-pl-lg q-pr-lg">
      <q-input bottom-slots v-model="text" label="Activity" v-on:keyup.enter="addItem" autofocus>
        <template v-slot:before>
          <q-icon name="assignment" color="primary"/>
        </template>

        <template v-slot:append>
          <q-btn round dense flat icon="add" color="primary" @click="addItem"/>
        </template>
      </q-input>
    </div>

    <q-list separator padding class="scroll  max-height-window">
      <q-item v-for="item in items" :key="item.id" clickable @click="toggleItemState(item.id)">

        <q-item-section side>
          <q-checkbox v-model="item.is_done" color="primary"></q-checkbox>
        </q-item-section>

        <q-item-section>
          <q-item-label overline>
            {{
              new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
            }}
          </q-item-label>
          <q-item-label :class="'text-weight-medium text-h6 ' + (item.is_done ? 'text-strike' : '')">
            {{ item.text }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn round dense flat icon="delete" color="accent" @click.stop="deleteItem(item.id)"/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { io } from 'socket.io-client'

export default defineComponent({
  setup(){
    const $q = useQuasar()
    const items = ref([])
    const text = ref('')
    const socket = io('http://192.168.100.77:3000')

    socket.on("connect", () => {
      console.log("connected to the server")
      socket.emit("get-items")
    })

    socket.on("items", (data) => {
      items.value = data
    })

    socket.on("item-added", (data) => {
      items.value.unshift(data)
    })

    socket.on("item-updated", (data) => {
      const index = items.value.findIndex(item => item.id === data.id)
      items.value[index].is_done = !items.value[index].is_done
    })

    socket.on("item-deleted", (id) => {
      items.value = items.value.filter(item => item.id !== id)
    })

    const addItem = () => {
      socket.emit("add-item", { text: text.value })
      text.value = ''
    }
    
    const toggleItemState = (id) => {
      socket.emit("toggle-item-state", { id })
    }

    const deleteItem = (id) => {
      $q.dialog({
        title: 'Delete item',
        message: 'Are you sure you want to delete this item?',
        ok: 'Delete',
        cancel: true,
        persistent: true
      }).onOk(() => { socket.emit("delete-item", { id }) })
    }

    return {
      items,
      text,
      addItem,
      toggleItemState,
      deleteItem,
    }
  },
  name: 'IndexPage'
})
</script>

<style lang="sass">
.my-input-padding
  padding: 2rem
.max-height-window
  max-height: calc(100vh - 256px)
</style>