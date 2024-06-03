import { Button } from 'antd'
import React from 'react'

export default function Home() {
  return (
    <div>
      <h2>Bạn muốn ?</h2>
      <Card title={<Button>Option 1</Button>}>Card content</Card>
      <Card title={<Button>Option 2</Button>}>Card content</Card>
      <Card title={<Button>Option 3</Button>}>Card content</Card>

    </div>
  )
}
