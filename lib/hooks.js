import {useEffect} from 'react'
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
  let parsedData = {}
  try {
    const storageData = localStorage.getItem("user");

    if (storageData) {
      parsedData = JSON.parse(storageData) || {};
    }
  } catch (e) {
    console.error(e)
  }

  const token = parsedData.token?.access_token

  const {data, error} = useSWR('/users/profile', (url) => fetcher(url, token))
  const user = data?.user
  if (user) user.token = token

  const finished = Boolean(data)
  const hasUser = Boolean(user)

  useEffect(() => {
    if (!redirectTo || !finished) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo)
    }
  }, [redirectTo, redirectIfFound, finished, hasUser])

  return error ? null : user
}
