import { useParams } from 'react-router-dom'

export default function Student() {
  let { id } = useParams<{ id: string }>()

  return (
    <div>
      <h1>Details of student with id: {id}</h1>
    </div>
  )
}
