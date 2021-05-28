import Head from 'next/head'
import React from "react";
import {useEffect, useState} from "react";

import Header from "../components/header";
import {fetchURL} from "../lib/helpers/fetch";
import {useRouter} from "next/router";

export default function Index() {
  const [articles, setArticles] = useState()
  var router = useRouter()

  useEffect(async () => {
    try {
      const res = await fetch(
        fetchURL('/articles?section=Leaders'),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET'
        }
      )
      const result = await res.json()
      setArticles(result);
    } catch (e) {
      console.error(e)
    }

  }, [])

  const onCLick = async article => {
    const {section, date, _id} = article
    const splitted = date.split('T')[0].split('-')
    var url = `${section}/${splitted[0]}/${splitted[1]}/${splitted[2]}/${_id}`
    router.push(url)
  }

  var articleComponent
  if (articles) {
    articleComponent = articles.map((article, index) =>
      <div key={index} className="preview-container" onClick={()=>onCLick(article)}>
        <div className="image-preview-container">
          <img className="image-preview" src={article.imageUrl} alt=""/>
        </div>
        <div className="text-preview-container">
          <div className="subheadline">{article.subheadline}</div>
          <div className="headline">{article.headline}</div>
          <div>{article.description}</div>
        </div>
      </div>)

  }

  return (
    <>
      <div>
        <Head>
          <title>Economist</title>
        </Head>
        <Header/>
        <div className="content-wrapper">
          <div className="content-header"><h1>Leaders</h1></div>
          <div className="article-wrapper">
            {articleComponent}
          </div>
        </div>
      </div>
    </>
  )
}
