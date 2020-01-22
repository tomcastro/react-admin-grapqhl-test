import React, { useEffect, useState } from 'react'
import { Admin, Resource } from 'react-admin'
import buildGraphQLProvider from 'ra-data-graphql-simple'
import { ItemList } from './items'

const App = () => {
  const [dataProvider, setDataProvider] = useState(null)
  useEffect(() => {
    const buildProvider = async () => {
      const dataProvider = await buildGraphQLProvider({ clientOptions: { uri: 'http://172.29.169.189:3000/graphql' } })
      setDataProvider({ provider: dataProvider })
    }
    buildProvider()
  }, [])

  if (!dataProvider) return <div>Loading</div>

  console.log(dataProvider)

  return (
    <Admin dataProvider={dataProvider.provider}>
      <Resource name="Item" list={ItemList} />
    </Admin>
  )
}

export default App
