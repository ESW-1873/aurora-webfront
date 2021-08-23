export const readAsDataURLAsync = (blob: Blob) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const { result } = reader
      if (typeof result !== 'string') {
        resolve('')
        return
      }
      resolve(result)
    }
    reader.readAsDataURL(blob)
  })
