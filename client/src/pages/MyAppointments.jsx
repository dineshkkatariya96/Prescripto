import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function MyAppointments() {
  const {backendUrl,token,getDoctorsData} = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments,setAppoitments] = useState([]);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    const day = dateArray[0];
    const monthIndex = Number(dateArray[1]); // Month is in 1-based index
    const year = dateArray[2];

    return `${day} ${months[monthIndex]} ${year}`;
  };

  const cancelAppointment = async(appointmentId) => {
    console.log(appointmentId);
    
    try{
      const {data} = await axios.post(backendUrl+'/api/user/cancelAppointment',{appointmentId},{headers:{token}})
      if(data.success){
        console.log(data);
        
        toast.success(data.message)
        listAppointments()
        getDoctorsData()
      }
      else{
        toast.error(data.message);
      }
    }
    catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }

  const listAppointments = async() => {
    try{
      const {data} = await axios.get(backendUrl+'/api/user/listAppointments',{headers:{token}});
      // console.log(data);
      
      if(data.success){
        setAppoitments(data.appointments.reverse())
        // console.log(data.appointments);
      }
      else{
        console.log("couldn't find");
      }
    }
    catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }

  const onCreateOrder = async() => {
    try{
      const {data} = await axios.post(backendUrl+'/api/paypal/create-order');
      // console.log(data);
      
      if(data.success){
        return data.orderId; // Return the order ID to PayPal
      }
      else{
        toast.error(data.message);
        return '';
      }
    }
    catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }

  const onApprove = async(data) => {
    try{
      if(!data.orderID) {
        throw new Error("Order ID is not available");
      }

      const response = await axios.get(`${backendUrl}/api/paypal/capturePayment/${data.orderID}`);
      const result = response.data;

      navigate('/complete-payment');
    }
    catch(err){
      console.log(err); 
      toast.error(err.message); 
    }
  }

  const onError = (error) => {
    log("Error in payment process",error) ;
    navigate('/cancel-payment');
    toast.error("Error in payment process, please try again later.");
  }

  useEffect(() => {
    if(token)
      listAppointments()
  },[token])

  return (
    <div className='mt-16 pb-20'>
      <p className='text-gray-600 font-medium'>My appoitments</p>
      <hr className='bg-gray-300 h-[2px] mt-2'/>

      <div>
        {
          appointments.map((item,index) => (
            <>
              <div key={index} className='flex mt-4 gap-3 w-full flex-col sm:flex-row items-center'>
                <img 
                  className='w-[300px] sm:w-[150px] object-cover h-auto bg-[#C9D8FF]'
                  src={item.docData.image} 
                />

                <div className='w-full flex flex-row justify-between gap-2'>
                  <div>
                    <p className='font-medium'>{item.docData.name}</p>
                    <p className='text-[12px] text-gray-500'>{item.docData.speciality}</p>

                    <p className='mt-4 font-medium text-gray-700 text-[14px] pb-1'>Address:</p>
                    <p className='text-[12px] text-gray-500'>{item.docData.address.line1}</p>
                    <p className='text-[12px] text-gray-500'>{item.docData.address.line2}</p>

                    <div className='flex w-full mt-4 items-center gap-2'>
                      <p className='font-medium text-gray-700 text-[14px]'>Date & Time : </p>
                      <p className='text-[12px] text-gray-500'>{slotFormat(item.slotDate)} | {item.slotTime}</p>
                    </div>
                  </div>

                  <div className='flex flex-col gap-3 justify-end text-[14px] text-gray-600'>
                    {/* {!item.cancelled && !item.payment && !item.isCompleted && <button className='w-48 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>} */}
                    {!item.cancelled && 
                      <PayPalScriptProvider initalOptions={{
                        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,  // Replace with your actual PayPal client ID
                      }}> 
                        <PayPalButtons 
                          className='px-4 py-2 md:px-6 border hover:text-white hover:bg-primary'
                          createOrder = {onCreateOrder}
                          onApprove = {onApprove}
                          onError = {onError}
                          fundingSource = 'paypal'
                        />
                      </PayPalScriptProvider>}
                    {!item.cancelled && <button onClick={() => cancelAppointment(item._id)} className='px-4 py-2 md:px-6 border hover:bg-red-600 hover:text-white'>Cancel appointment</button>}
                    {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rouned text-red-500'>Appointment cancelled</button>}
                  </div>
                </div>
              </div>
            <hr className='bg-gray-300 h-[2px] mt-2'/>
          </>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments