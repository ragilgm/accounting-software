import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt';
import reducers from './'


const encryptor = encryptTransform({
  secretKey: 'rahasiabosss',
  onError: function (error) {
    // Handle the error.
  },
})

  const persistConfig = {
    key: 'root',
    storage: storage,
    transforms:[encryptor]
    
  }
  

const persistedReducer = persistReducer(persistConfig,reducers)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}