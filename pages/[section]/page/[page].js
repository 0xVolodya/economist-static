import Head from 'next/head'
import React from "react";
import {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';

import {useRouter} from "next/router";
import Link from "next/link";
import {fetchURL} from "../../../lib/helpers/fetch";
import {useUser} from "../../../lib/hooks";

export default function Index() {
  const user = useUser({ redirectTo: '/', redirectIfFound: false })

  const [articles, setArticles] = useState([])
  const router = useRouter()
  let {section, page} = router.query
  page = Number(page)
  const queryParams = {section, page: 1, perPage: 1000}

  useEffect(async () => {
    try {
      if (!section || !user?.token) return

      const res = await fetch(
        fetchURL(`/articles?` + new URLSearchParams(queryParams)),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`
          },
          method: 'GET'
        }
      )
      if (res.status === 200) {
        const result = await res.json()
        setArticles(result);
      } else {
        throw new Error(await res.text())
      }
    } catch (e) {
      console.error(e)
    }

  }, [section, user?.token, page])

  if (!user) return <div>Please Login to view all articles</div>
  if (articles.length === 0) return <div>No articles</div>
  const filteredArticles = articles.filter((article, index) =>
    (page - 1) * 12 <= index && index < (page) * 12
  )
  var articleComponent
  const getUrl = article => {
    const {section, date, _id} = article
    const splitted = date.split('T')[0].split('-')
    return `/${section}/${splitted[0]}/${splitted[1]}/${splitted[2]}/${_id}`
  }

  articleComponent = filteredArticles.map((article, index) =>
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

  const onPageChange = (data) => {
    router.push(`/${section}/page/${data.selected + 1}`)
  }

  return (
    <>
      <Head>
        <title>Economist</title>
      </Head>
      <div className="content-wrapper">
        <div className="content-header"><h1>{section}</h1></div>
        <div className="article-wrapper">
          {articleComponent}
        </div>
        <div className="pagination-container">
          <ReactPaginate
            onPageChange={onPageChange}
            pageCount={Math.ceil(articles.length / 12)}
            disableInitialCallback={true}
            forcePage={page - 1}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            containerClassName={'pagination'}
            activeClassName={'pagination-active'}
          />
        </div>
      </div>
    </>
  )
}
