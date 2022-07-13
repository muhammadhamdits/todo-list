<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-secondary">
      <q-toolbar>
        <q-toolbar-title class="row justify-center">
          <span class="text-h6">Todo List</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="width-adj">
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="row justify-center">
          <span class="text-subtitle2">
            Copyright &copy; {{ new Date().getFullYear() }} 
            <a href="http://github.com/muhammadhamdits" target="_blank" rel="noopener noreferrer" class="text-secondary no-text-decor">
              Muhammad Hamdi
            </a>
          </span>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<style lang="sass">
.no-text-decor
  text-decoration: none

.width-adj
  margin: 0 auto
  @media screen and (max-width: 683px)
    width: 100%
  @media screen and (min-width: 684px)
    @media screen and (max-width: 1026px)
      width: 80%
    @media screen and (min-width: 1027px)
      @media screen and (max-width: 1365px)
        width: 60%
      @media screen and (min-width: 1366px)
        width: 40%
</style>