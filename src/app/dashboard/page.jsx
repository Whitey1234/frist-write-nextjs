'use client'
import withAuth from '@/Hoc/withAuth';
import React from 'react';
import BookManagement from './manage-books/page'

const Dashboard = () => {
  return (
    <div><BookManagement/></div>
  )
}

export default withAuth(Dashboard);