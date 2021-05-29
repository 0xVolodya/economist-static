import {useEffect, useState} from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import {fetchURL} from "./helpers/fetch";

const fetcher = (url, token) =>
  fetch(
    fetchURL(url),
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: 'GET'
    }
  )
    .then((r) => r.json())
    .then((data) => {
      return {user: data?.email ? data : null}
    })

export function useUser({redirectTo, redirectIfFound} = {}) {
  const [user, setUser] = useState()
  useEffect(async () => {
    let parsedData
    try {
      const storageData = localStorage.getItem("user");

      if (storageData) {
        parsedData = JSON.parse(storageData);
      }
      if(!parsedData) return
      parsedData.token = parsedData.token?.access_token
      setUser(parsedData)
    } catch (e) {
      console.error(e)
    }
  }, [redirectTo, redirectIfFound]);

  // useEffect(() => {
  //   if (!redirectTo) return
  //   if (
  //     // If redirectTo is set, redirect if the user was not found.
  //     (redirectTo && !redirectIfFound && !hasUser) ||
  //     // If redirectIfFound is also set, redirect if the user was found
  //     (redirectIfFound && hasUser)
  //   ) {
  //     Router.push(redirectTo)
  //   }
  // }, [redirectTo, redirectIfFound, hasUser])

  return user
}
