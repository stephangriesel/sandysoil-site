import React from 'react'
import { useRef, useState, useEffect } from "react"

// Navbar Styles
import Brand from '../../UI/Brand/Brand'

// TO DO: Query Update: Header
const query = `
{
  pageCollection {
    items {
      title
      logo {
        url
      }
    }
  }
}
`

// Environment variables
const { REACT_APP_SPACE_ID, REACT_APP_CDA_TOKEN } = process.env;

const BrandHeader = () => {

    // define the initial state
    const [page, setPage] = useState(null);

    useEffect(() => {
      window
        // Change to template string & use template literals to define environment variable
        .fetch(`https://graphql.contentful.com/content/v1/spaces/${REACT_APP_SPACE_ID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authenticate the request
            Authorization: `Bearer ${REACT_APP_CDA_TOKEN}`,
          },
          // send the GraphQL query
          body: JSON.stringify({ query }),
        })
        .then((response) => response.json())
        .then(({ data, errors }) => {
          if (errors) {
            console.error(errors);
          }
  
          // rerender the entire component with new data
          setPage(data.pageCollection.items[0]);
        });
    }, []);
  
    // show a loading screen case the data hasn't arrived yet
    if (!page) {
      return "Loading...";
    }

  return (
    <Brand>
        <img src={page.logo.url} className="logo" alt="logo" />
        <h1>
          {page.title}
        </h1>
    </Brand>
  )
}

export default BrandHeader