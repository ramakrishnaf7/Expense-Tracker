import React, { useState, useEffect } from 'react'
import { Layout } from '../components/Layouts/Layout'
import { DatePicker, Form, Input, Modal, Select, Table, message } from 'antd';
import Spinner from '../components/Layouts/Spinner'
import axios from 'axios';
import moment from 'moment';
import { UnorderedListOutlined, AreaChartOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import Analytics from '../components/Analytics';


const {RangePicker} = DatePicker;

const HomePage = () => {
  const [showModel, setShowModel] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alltransections, setAlltransections] = useState([])
  const [frequency,setFrequency] = useState('7')
  const [selectedDate,setSelectedDate] = useState([])
  const [type,setType] = useState('all');
  const [viewdata,setViewdata] = useState('table')
  const [editable,setEditable] = useState(null);

  //table data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render : (text) => <span>{moment(text).format('YYYY - MM - DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Reference',
      dataIndex: 'reference'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Actions',
      render:(text,record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record)
            setShowModel(true)
          }}/>
          <DeleteOutlined className='mx-2' onClick={ () => {deleteHandler(record)}}/>
        </div>
      )
    },
  ]

  const getAllTransections = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      const res = await axios.post('/transections/get-transection', {
         userid: user._id,
         frequency,
         selectedDate,
         type,
         })
      setLoading(false)
      setAlltransections(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
      message.error('Fetch issuse with Transection')
    }
  };
  useEffect(() => {
    const getAllTransections = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        setLoading(true)
        const res = await axios.post('/transections/get-transection', {
           userid: user._id,
           frequency,
           selectedDate,
           type,
           })
        setLoading(false)
        setAlltransections(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
        message.error('Fetch issuse with Transection')
      }
    };
    getAllTransections();
  }, [frequency,selectedDate,type]);
//delete handler
const deleteHandler = async(record) => {
  try {
    setLoading(true)
    await axios.post('/transections/delete-transection', {transectionId:record._id});
    setLoading(false)
    message.success('Deleted Successfull')
    getAllTransections();
  } catch (error) {
    console.log(error)
    setLoading(false)
    message.error('unable to delete')
  }
}

 // form submit handler
  const handlesubmit = async (value) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if (editable) {
        await axios.post('/transections/edit-transection', {payload:{
          ...value,userId:user._id
        },
        transectionId :editable._id
      })
        message.success('Transection Updated Successfully')
       
      }
      else{
        await axios.post('/transections/add-transection', { ...value, userid: user._id })
        message.success('Transection Added Successfully')
        getAllTransections();
      }
      setLoading(false)
      setShowModel(false)
      setEditable(null); 
      getAllTransections();
    } catch (error) {
      setLoading(false)
      message.error('Failed to add transection');
    }
  }

 // Cancel modal
 const handleCancel = () => {
  setShowModel(false);
  setEditable(null); // Reset editable state
};


  return (
    <Layout>
      {loading && <Spinner />}
      <div className='filters'>
        <div>
          <h6>Select filter</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value = '7'>Last 1 Week</Select.Option>
            <Select.Option value = '30'>Last 1 Month</Select.Option>
            <Select.Option value = '365'>Last 1 Year</Select.Option>
            <Select.Option value = 'custom'>Custom</Select.Option>
          </Select>
          {frequency === 'custom' && (<RangePicker value = {selectedDate} onChange={(values) => setSelectedDate(values)} />)}
        </div>
        <div>
          <h6>Select setType</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value = 'all'>All</Select.Option>
            <Select.Option value = 'income'>Income</Select.Option>
            <Select.Option value = 'expense'>Expense</Select.Option>
          </Select>
          {frequency === 'custom' &&
           ( <RangePicker value = {selectedDate} onChange={(values) => setSelectedDate(values)} />)
            }
        </div>
        <div className='switch-icon'>
              <UnorderedListOutlined className={`mx-2 ${ viewdata === 'table' ? 'active-icon' : 'inactive-icon' }`} onClick={() => setViewdata('table')} />
              <AreaChartOutlined className={`mx-2 ${ viewdata === 'analytics' ? 'active-icon' : 'inactive-icon' }`} onClick={() => setViewdata('analytics')}/>
        </div>
        <div>
          <button className='btn btn-primary' onClick={() => setShowModel(true)}> Add me </button>
        </div>
      </div>
      <div className='content'>
        {viewdata === 'table' ? <Table columns={columns} dataSource={alltransections.map(items => ({...items,key:items._id}) )} /> 
        : <Analytics alltransections = {alltransections}/>
        }
      </div>
      <Modal
        title={editable ? 'Edit transection': 'Add Transection '}
        open={showModel}
        onCancel= {handleCancel}
        footer={false}
      >
        <Form layout='vertical' onFinish={handlesubmit} initialValues={editable}>
          <Form.Item label='Amount' name='amount'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label='type' name='type'>
            <Select >
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='category' name='category'>
            <Select >
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='tip'>Tip</Select.Option>
              <Select.Option value='project'>Project</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='movie'>Movie</Select.Option>
              <Select.Option value='bills'>Bills</Select.Option>
              <Select.Option value='medical'>Medical</Select.Option>
              <Select.Option value='fee'>Fee</Select.Option>
              <Select.Option value='tax'>Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Date' name='date'>
            <Input type='date' />
          </Form.Item>
          <Form.Item label='Reference' name='reference'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input type='text' />
          </Form.Item>
          <div className='d-flex justify-content-end' >
            <button type='submit' className='btn btn-primary'>SAVE</button>
          </div>
        </Form>
      </Modal>
    </Layout>
  )
}

export default HomePage