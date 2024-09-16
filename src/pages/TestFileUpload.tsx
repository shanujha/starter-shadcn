import FileUpload from '@/components/blocks/fileupload'
import { useEffect, useState } from 'react'

const TestFileUpload = () => {

  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setUrl('http://localhost:9000/certify/1722172439553-check.png')
    }, 3000)
  }, [])

  return (
    <div>
      <FileUpload uploadUrl={""} isUploaded={url !== null} onReset={()=> {}} cb={setUrl}>
        {url && <img src={url} />}
        {url && url}
      </FileUpload>
    </div>
  )
}

export default TestFileUpload
