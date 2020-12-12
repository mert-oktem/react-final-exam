import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PEOPLEBOATS } from '../../queries'

import { List } from 'antd'

import Boat from '../listItems/Boat'

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

const Boats = (props) => {
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_PEOPLEBOATS, {
        variables: { personId: props.personId },
    })
    if (loading) return 'Loading...'
    if (error) return `Errror! ${error.message}`
    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {data.getBoats.map(({ id, year, make, model, price, personId }) => (
                <List.Item key={id}>
                    <Boat id={id} year={year} make={make} model={model} price={price} personId={personId} />
                </List.Item>
            ))}
        </List>
    )
}

export default Boats
