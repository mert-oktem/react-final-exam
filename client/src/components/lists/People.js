import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../queries'

import { List } from 'antd'

import Person from '../listItems/Person'
import AddBoat from '../forms/AddBoat'


const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const People = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_PEOPLE)
  console.log(data)
  if (loading) return 'Loading...'
  if (error) return `Errror! ${error.message}`
  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.people[0] ? ( <AddBoat /> ) : (<div></div>)
      }

      {data.people.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <Person key={id} id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  )
}

export default People
