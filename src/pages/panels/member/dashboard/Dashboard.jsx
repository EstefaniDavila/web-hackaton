import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/custom/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Dashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'))

  return (
    <>
      <div className='flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          Dashboard
        </h1>
        <div className='flex items-center space-x-2'>
        </div>
      </div>
      <Tabs
        orientation='vertical'
        defaultValue='overview'
        className='space-y-4'
      >
        <div className='w-full pb-2 overflow-x-auto xs:overflow-x-scroll'>
          <TabsList>
            <TabsTrigger value='overview'>General</TabsTrigger>
            <TabsTrigger value='analytics'>Analíticas</TabsTrigger>
            <TabsTrigger value='reports'>Reportes</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </>
  )
}

export default Dashboard
