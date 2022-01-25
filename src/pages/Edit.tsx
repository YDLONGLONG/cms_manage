import React from 'react';
import Editor from 'components/Editor';
import { useParams } from 'react-router-dom';

export default function Edit() {
  const {id} = useParams()
  return (
    <div>
    <Editor />
    <h2>id:{id}</h2>
    </div>
  )
}
