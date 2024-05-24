export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "ulfepjct") //Ensure you have set up an upload preset in Cloudinary
  formData.append("folder", "e-commerce-sda2") // Specify the folder where you want to store the image

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/dmlesn73m/image/upload`, {
      method: "POST",
      body: formData
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }
    const data = await response.json()
    return data.secure_url // Return the secure URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error)
    throw error
  }
}
