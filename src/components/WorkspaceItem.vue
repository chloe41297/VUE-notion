<template>
  <li>
    <div 
    :style="{ paddingLeft : `${14 * depth}px`}" 
    class="title"
    @click="$router.push({
      name:'Workspace',
      params: {
        id:workspace.id
      }
    })">
    <span 
    :class="{active:showChildren}"
    class="material-icons" @click="showChildren = !showChildren">play_arrow</span>
    <span class="text">{{workspace.title || '제목없음'}}</span>
    <div class="actions">
      <span class="material-icons" @click="createWorkspace">add</span>
      <span class="material-icons" @click="deleteWorkspace">delete</span>
    </div>
    </div>
    <div 
    v-if="!hasChildren && showChildren" 
    :style="{paddingLeft: `${14 * depth + 22}px`}"
    class="no-children">
      하위 페이지가 없습니다.
    </div>
    <ul v-if="hasChildren && showChildren">
      <WorkspaceItem 
      v-for="ws in workspace.documents"
      :key="ws.id"
      :workspace="ws"
      :depth="depth + 1"
      />
    </ul>
  </li>
</template>

<script>
export default {
  props:{
    workspace: {
      type: Object,
      default: ()=> ({})
    },
    depth:{
      type:Number,
      default: 1
    }
  },
  data(){
    return {
      showChildren :false
    }
  },
  computed : {
    hasChildren(){
      return this.workspace.documents && this.workspace.documents.length
    }
  },
  methods: {
   async createWorkspace(){
     await this.$store.dispatch('workspace/createWorkspace',{
        parentId: this.workspace.id
      })
      this.showChildren = true
    },
    deleteWorkspace(){
      this.$store.dispatch('workspace/deleteWorkspace',{
        id: this.workspace.id
      })
    }
  }
}
</script>
<style lang="scss" scoped>
li{
  .title{
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0px 14px;
    color: rgba($color-font, 0.7);
    &:hover{
      background-color: $color-background--hover1;
      padding-right: 4px;
      .actions{
        display:flex;
      }
    }
    .material-icons{
      font-size: 18px;
      color: $color-icon;
      margin-right: 4px;
      &:hover{
        background-color: $color-background--hover2;
      }
      &.active{
        transform: rotate(90deg);
      }
    }
    .text{
      flex-grow: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .actions{
      display: none;
      align-items: center;
    }
  }
  .no-children{
    color: rgba($color-font, 0.35);
    height: 30px;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    }
}
  
</style>