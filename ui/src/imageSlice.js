import { createSlice } from '@reduxjs/toolkit'

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    role: "",
    id: "",
    feedbackMessage: "",
    selectedImages: []
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload
    },
    setId: (state, action) => {
      state.id = action.payload
    },
    setFeedbackMessage: (state, action) => {
      state.feedbackMessage = action.payload
    },
    setSelectedImages: (state, action) => {
      state.selectedImages = [...state.selectedImages, action.payload]
    },
  }
})
export const { setRole, setId, setFeedbackMessage, setSelectedImages } = imageSlice.actions
export default imageSlice