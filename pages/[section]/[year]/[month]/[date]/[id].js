import Head from 'next/head'
import React from "react";
import {useEffect, useState} from "react";

import {useRouter} from "next/router";
import {fetchURL} from "../../../../../lib/helpers/fetch";
import Header from "../../../../../components/header";
import styles from './style.module.css'

export default function Index() {
  const [article, setArticle] = useState()
  var router = useRouter()
  const {id} = router.query

  useEffect(async () => {
    try {
      if (!id) return
      const res = await fetch(
        fetchURL(`/articles/${id}`),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MGFlNzBkZjNjYWFkOTU5MjY4MTk1ZWEifQ.jb7oHCUnoVrvkP98UzrbBBqy1h8UfzKeGzt834Lf6rg`
          },
          method: 'GET'
        }
      )
      const result = await res.json()
      setArticle(result);
    } catch (e) {
      console.error(e)
    }

  }, [id])

  const onSectionClick = () => {
    router.push(`/${article.section}`)
  }
  if (!article) return <div>Loading</div>

  var textArray = article.bodyText.map(x => <p>{x}</p>)
  return (
    <>
      <div>
        <Head>
          <title>Economist</title>
        </Head>
        <Header/>
        <div className={styles.container}>
          <h1 onClick={onSectionClick}>{article.section}</h1>
          <div className="subheadline">{article.subheadline}</div>
          <div className="headline">{article.headline}</div>
          <div>{article.description}</div>
          <div className="image-preview-container">
            <img className="image-preview" src={article.imageUrl} alt=""/>
          </div>
          {textArray}
        </div>
      </div>
    </>
  )
}
