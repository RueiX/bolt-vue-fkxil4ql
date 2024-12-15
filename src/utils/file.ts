/**
 * 下载文件
 * @param resUrl 文件URL
 * @param fileName 文件名
 */
export function downloadFile(resUrl: string, fileName: string): void {
  if (!resUrl) return

  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = resUrl
  link.setAttribute('download', fileName)
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(resUrl)
}