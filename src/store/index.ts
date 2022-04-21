import ConsoleMessage from '@/sketch/app/data/console-message'
import { createStore } from 'vuex'

export default createStore({
    state: {
        messages: Array<ConsoleMessage>(),
    },
    getters: {
        messages: state => state.messages,
    },
    mutations: {
        ADD_MESSAGE(state, message: ConsoleMessage)
        {
            state.messages.push(message);
        }
    },
    actions: {
        addMessage(context, message: ConsoleMessage)
        {
            context.commit('ADD_MESSAGE', message);
        }
    },
})
