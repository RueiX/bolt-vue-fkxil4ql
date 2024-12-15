import { reactive } from 'vue'

interface State {
  settings: {
    dynamicTitle: boolean;
    title: string;
  }
}

const state = reactive<State>({
  settings: {
    dynamicTitle: true,
    title: '默认标题'
  }
})

export default {
  state
}