import { Head } from '@inertiajs/react'
import { Box } from '@mui/material'

export default function About({ about }: { about: string }) {
  return (
    <>
      <Head title='About Us' />
      {/*<Header value='About Us'>*/}
      {/*  This page is rendered using markdown, you find it in{' '}*/}
      {/*  <code>resources/markdown/about.md</code> if you want to edit it.*/}
      {/*</Header>*/}
      <Box>
        <div
          dangerouslySetInnerHTML={{ __html: about }}
        />
      </Box>
    </>
  )
}
