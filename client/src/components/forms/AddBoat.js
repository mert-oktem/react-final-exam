import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { Form, Input, Button, Select } from 'antd'

const { Option } = Select;

import { v4 as uuidv4 } from 'uuid'

import { ADD_BOAT, GET_PEOPLEBOATS, GET_PEOPLE } from '../../queries'

const AddBoat = () => {
    const [id] = useState(uuidv4())
    const [addBoat] = useMutation(ADD_BOAT);
    const { peopleData } = useQuery(GET_PEOPLE)
    console.log(peopleData)
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({})
    }, [])

    function handleChange(value) {
        console.log('change')
      }

    const onFinish = values => {
        const { year, make, model, price, personId } = values
        console.log(data)
        addBoat({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            },
            optimisticResponse: {
                __typename: 'Mutation',
                addBoat: {
                    __typename: 'Boat',
                    id,
                    year,
                    make,
                    model,
                    price,
                    personId
                }
            },
            update: (proxy, { data: { addBoat } }) => {
                const data = proxy.readQuery({
                    query: GET_PEOPLEBOATS,
                    variables: { personId: personId }
                })
                proxy.writeQuery({
                    query: GET_PEOPLEBOATS,
                    variables: { personId: personId },
                    data: {
                        ...data,
                        boats: [...data.boats, addBoat]
                    }
                })
            }
        })
    }

    return (
        <Form
            form={form}
            name='add-boat-form'
            layout='inline'
            onFinish={onFinish}
            size='large'
            style={{ marginBottom: '40px' }}
        >
            <Form.Item
                name='year'
                rules={[{ required: true, message: 'Please input the year!' }]}
            >
                <Input placeholder='i.e. 2019' />
            </Form.Item>
            <Form.Item
                name='make'
                rules={[{ required: true, message: 'Please input the make!' }]}
            >
                <Input placeholder='i.e. Yamaha' />
            </Form.Item>
            <Form.Item
                name='model'
                rules={[{ required: true, message: 'Please input the model!' }]}
            >
                <Input placeholder='i.e. 212SX' />
            </Form.Item>
            <Form.Item
                name='price'
                rules={[{ required: true, message: 'Please input the price!' }]}
            >
                <Input placeholder='i.e. 40000' />
            </Form.Item>
            <Form.Item
                name='personId'
                rules={[{ required: true, message: 'Please input the person id!' }]}
            >
                {/* <Input placeholder='i.e. personId' /> */}
                <Select defaultValue="Select Name" style={{ width: 120 }} onChange={handleChange}>

                    {peopleData.people.map(({ id, firstName, lastName }) => (
                        <Option key={id} value={id}>{firstName}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Boat
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddBoat
