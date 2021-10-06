export default{
  namespaced : true,
  state() {
    return {
      workspaces: [],
      currentWorkspace: {}
    }
  },
  getters: {},
  mutations: {
    assignState(state, payload){
      Object.keys(payload).forEach(key=>{
        state[key] = payload[key]
      })
    }
  },
  actions: {
  async createWorkspace({dispatch}, payload = {}){
      const {parentId} = payload
     await fetch('https://kdt.roto.codes/documents',{
        method:'POST',
        headers: {
          'Content-Type' : 'application/json',
          'x-username':'heejin'
        },
        body: JSON.stringify({
          title: '',
          parent : parentId
        })
      }).then(res=>res.json())
     await dispatch('readWorkspaces')
    },
    async readWorkspaces({commit}){
     const workspaces = await fetch('https://kdt.roto.codes/documents',{
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'x-username':'heejin'
        }
      }).then(res=> res.json())
      commit('assignState',{
        workspaces : workspaces
      })
    },
    async readWorkspace({commit}, payload){
      const {id} = payload
     const workspace = await fetch(`https://kdt.roto.codes/documents/${id}`,{
        method : 'GET',
        headers:{
          'Content-Type' : 'application/json',
          'x-username':'heejin'
        }
      }).then(res=> res.json())
      commit('assignState',{
        currentWorkspace: workspace
      })
      await dispatch('readWorkspaces')
    },
   async updateWorkspace(context,payload){
      const{id,title,content} = payload
      await fetch(`https://kdt.roto.codes/documents/${id}`,{
        method: 'PUT',
        headers:{
          'Content-Type' : 'application/json',
          'x-username':'heejin'
        },
        body:JSON.stringify({
          title,
          content
        })
      }).then(res=>res.json())
      
    },
    async deleteWorkspace({dispatch},payload){
      const {id} = payload
      await fetch(`https://kdt.roto.codes/documents/${id}`,{
        method: 'DELETE',
        headers:{
          'Content-Type' : 'application/json',
          'x-username':'heejin'
        }
      }).then(res=>res.json())
      dispatch('readWorkspaces')
    }
  }
}