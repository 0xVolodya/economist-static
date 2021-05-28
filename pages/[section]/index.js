import Head from 'next/head'
import React from "react";
import {useEffect, useState} from "react";

import {useRouter} from "next/router";
import Link from "next/link";
import {fetchURL} from "../../lib/helpers/fetch";
import Header from "../../components/header";

export default function Index() {
  const [articles, setArticles] = useState()
  var router = useRouter()
  const {section} = router.query
  const queryParams = {section, page: 1, perPage: 12}

  useEffect(async () => {
    try {
      if (!section) return

      const res = await fetch(
        fetchURL(`/articles?` + new URLSearchParams(queryParams)),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MGFlNzBkZjNjYWFkOTU5MjY4MTk1ZWEifQ.jb7oHCUnoVrvkP98UzrbBBqy1h8UfzKeGzt834Lf6rg`
          },
          method: 'GET'
        }
      )
      const result = await res.json()
      setArticles(result);
    } catch (e) {
      console.error(e)
    }

  }, [section])

  var articleComponent
  const getUrl = article => {
    const {section, date, _id} = article
    const splitted = date.split('T')[0].split('-')
    return `/${section}/${splitted[0]}/${splitted[1]}/${splitted[2]}/${_id}`
  }

  if (articles) {
    articleComponent = articles.map((article, index) =>
      <Link href={getUrl(article)} key={index}>
        <a className="preview-container">
          <div className="image-preview-container">
            <img className="image-preview" src={article.imageUrl} alt=""/>
          </div>
          <div className="text-preview-container">
            <div className="subheadline">{article.subheadline}</div>
            <div className="headline">{article.headline}</div>
            <div>{article.description}</div>
          </div>
        </a>
      </Link>
    )

  }

  return (
    <>
      <div>
        <Head>
          <title>Economist</title>
        </Head>
        <Header/>
        <div className="content-wrapper">
          <div className="content-header"><h1>{section}</h1></div>
          <div className="article-wrapper">
            {articleComponent}
          </div>
        </div>
      </div>
    </>
  )
}
