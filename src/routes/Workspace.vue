<template>
  <section>
    <div class="inner">
      <div contenteditable class="title" @input="onInput" ref="title">
        {{ title }}
      </div>
      <div contenteditable class="content" @input="onInput" ref="content" v-html="content">
      </div>
    </div>
  </section>
</template>
<script>
export default {
  computed:{
    title(){
      return this.$store.state.workspace.currentWorkspace.title
    },
    content(){
      return this.$store.state.workspace.currentWorkspace.content
    }
  },
  created(){
    this.$store.dispatch('workspace/readWorkspace', {
      id:  this.$route.params.id
    })
  },
  methods:{
    onInput(){
      this.$store.dispatch('workspace/updateWorkspace',{
        id: this.$route.params.id,
        title: this.$refs.title.textContent,
        content: this.$refs.content.innerHTML
      })
    }
  }
}
</script>