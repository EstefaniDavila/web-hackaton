import api from "./api";

const useCrud = (endpoint) => {

  const getModel = async (_endpoint = endpoint) => {
    try {
      const response = await api.get(_endpoint)
      return response.data
    } catch (error) {
      console.error("Error fetching data:", error)
      return Promise.reject(error.response?.data || error)
    }
  }

  const deleteModel = async (_endpoint = endpoint) => {
    
      try {
        const response = await api.delete(_endpoint)
        return response.data
      } catch (error) {
        const backendMessage = error.response.data?.message || "Error desconocido"
        console.error('Error al eliminar el registro:', backendMessage)
        throw error
      }
  }

  const insertModel = async (_data, _endpoint = endpoint) => {
    try {
      const response = await api.post(_endpoint, _data)
      return response.data
    } catch (error) {
      if (error.response) {
        const backendMessage = error.response.data?.message || "Error desconocido"
        console.error('Error al registrar el registro:', backendMessage)
        throw error
      } else {
        console.error('Network error or server is not responding:', error)
        return Promise.reject({ message: error.response.message })
      }
    }
  }

  const updateModel = async (_data, _endpoint = endpoint) => {
    try {
      const response = await api.put(_endpoint, _data)
      return response.data
    } catch (error) {
      if (error.response) {
        const backendMessage = error.response.data?.message || "Error desconocido"
        console.error('Error al actualizar el registro:', backendMessage)
        throw error
      } else {
        console.error('Network error or server is not responding:', error)
        return Promise.reject({ message: 'Network error or server is not responding' })
      }
    }
  }

  return {
    getModel,
    insertModel,
    deleteModel,
    updateModel,
  }
}

export default useCrud
