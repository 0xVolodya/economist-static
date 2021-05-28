import Head from 'next/head'
import React from "react";

import {useUser} from "../lib/hooks";

export default function Index() {

  const user = useUser()

  return (
    <>
      <Head>
        <title>Economist</title>
      </Head>
      <div className="content-wrapper">
        <div className="article-wrapper">
          {!user &&<div>Please Login to view all articles</div>}
          {user &&<div>Click on the menu to see all sections</div>}
        </div>
      </div>
    </>
  )
}
