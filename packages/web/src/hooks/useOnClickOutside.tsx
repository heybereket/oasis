import { useEffect } from "react"

const useOnClickOutside = (ref:React.MutableRefObject<HTMLInputElement>, handler:() => void):void => {
  useEffect(() => {
    const listener = (ev: MouseEvent) =>{
      if (ref?.current?.contains(ev.target as Node)) return;
      handler()
    }
    if (ref.current) {
      document.addEventListener("mousedown", listener);
    }
    return () => {
 document.removeEventListener("mousedown", listener);
    }
  },[ref,handler])
}

export default useOnClickOutside;
