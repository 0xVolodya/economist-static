import {useEffect, useState} from 'react'
import Router from 'next/router'

export function useUser({redirectTo, redirectIfFound} = {}) {
  const [user, setUser] = useState()
  useEffect(async () => {
    let parsedData
    try {
      const storageData = localStorage.getItem("user");

      if (storageData) {
        parsedData = JSON.parse(storageData);
      }
      if (!parsedData) {
        if (redirectTo && !redirectIfFound) await Router.push(redirectTo)
        return
      }

      if(redirectIfFound) return await Router.push(redirectTo)

      parsedData.token = parsedData.token?.access_token
      setUser(parsedData)
    } catch (e) {
      console.error(e)
    }
  }, [redirectTo, redirectIfFound]);

  return user
}
