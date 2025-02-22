import Head from 'next/head'
import React from 'react'
import { addPath } from '@components/image'

const favicon = require('@assets/images/favicon.png')
const appleTouchIcon = require('@assets/images/touch-icon.png')
const DEFAULT = {
  desc: `Blockstack is a decentralized computing network and app ecosystem that puts users in control of their identity and data.`
}

const Meta = ({
  title,
  description = DEFAULT.desc,
  ogTitle = title,
  ...rest
}) => {
  const ogImageUrl = `https://meta.blockstack.sh/${encodeURI(
    ogTitle
  )}.png?theme=dark&md=1&fontSize=115px`
  return (
    <Head>
      <meta name="description" content={description} />
      <link
        rel="shorticon icon"
        href={addPath(favicon.src)}
        type="image/x-icon"
      />
      <link rel="icon" href={addPath(favicon.src)} type="image/x-icon" />
      <link
        rel="apple-touch-icon-precomposed"
        href={addPath(appleTouchIcon.src)}
      />
      <meta property="og:image" content={ogImageUrl} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta property="og:site_name" content="Blockstack.org" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@blockstack" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Head>
  )
}

export { Meta }
