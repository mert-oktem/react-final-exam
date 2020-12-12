import React, { useState } from 'react'
import { Card, List } from 'antd'

import { EditOutlined } from '@ant-design/icons'
import UpdateBoat from '../forms/UpdateBoat'
import RemoveBoat from '../buttons/RemoveBoat'

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

const Boat = props => {
    const [id] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const [editMode, setEditMode] = useState(false)
    const styles = getStyles()

    const boatInfo = () => {
        return `Year is: ${props.year}, Make is:  ${props.make}, Model is: ${props.model}, Price is: ${props.price} and Person ID is: ${props.personId}`
    }

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'year':
                setYear(value)
                break
            case 'make':
                setMake(value)
                break
            case 'model':
                setModel(value)
                break
            case 'price':
                setPrice(value)
                break
            case 'personId':
                setPersonId(value)
                break
            default:
                break
        }
    }

    const handleButtonClick = () => setEditMode(!editMode)

    return (
        <List.Item key={props.id}>
            {editMode ? (
                <UpdateBoat
                    id={id}
                    onButtonClick={handleButtonClick}
                    updateStateVariable={updateStateVariable}
                />
            ) : (
                    <Card
                        actions={[
                            <EditOutlined key='edit' onClick={handleButtonClick} />,
                            <RemoveBoat id={id} year={year} make={make} model={model} price={price} personId={personId} />
                        ]}
                        style={styles.card}
                    >
                        {boatInfo()}
                    </Card>
                )}
        </List.Item>
    )
}

export default Boat
