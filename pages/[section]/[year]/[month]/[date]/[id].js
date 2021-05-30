import Head from 'next/head'
import React from "react";
import {useEffect, useState} from "react";
import Link from "next/link";

import {useRouter} from "next/router";
import {fetchURL} from "../../../../../lib/fetch";
import styles from './style.module.css'
import {useUser} from "../../../../../lib/hooks";

export default function Index() {
  const user = useUser({redirectTo: '/', redirectIfFound: false})

  const [article, setArticle] = useState()
  const router = useRouter()
  const {id, section} = router.query

  useEffect(async () => {
    try {
      if (!id || !user?.token) return
      const res = await fetch(
        fetchURL(`/articles/${id}`),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`
          },
          method: 'GET'
        }
      )
      const result = await res.json()
      setArticle(result);
    } catch (e) {
      console.error(e)
    }

  }, [id, user?.token])
  if (!user) return <div>Please Login to view article</div>
  if (!article) return <div>Loading</div>

  const formatDate = (string) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};

    const date = new Date(string)
    return date.toLocaleDateString("en-US", options)
  }
  const textArray = article?.bodyText?.map((x, index) => <p key={index}>{x}</p>)
  return (
    <>
      <Head>
        <title>Economist</title>
      </Head>
      <div className={styles.container}>
        <Link href={`/${section}/page/1`}>
          <a>
            <h1>{section}</h1>
          </a>
        </Link>
        <div className="subheadline">{article.subheadline}</div>
        <div className="headline">{article.headline}</div>
        <div>{formatDate(article.date)}</div>
        <div>{article.description}</div>
        <div >
          <img className="image-preview" src={article.imageUrl} alt=""/>
        </div>
        {textArray}
      </div>
    </>
  )
}
