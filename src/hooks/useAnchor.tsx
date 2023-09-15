import { useEffect } from 'react'

const useAnchor = (props: any) => {
  useEffect(() => {
    const targeId = props.location.slice(1)
    if (targeId) {
      const targer = document.getElementById(targeId)
      if (targer) {
        targer.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [props.location])
}
export default useAnchor
