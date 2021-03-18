import { useState } from 'react';

export default function useTest() {
  const [code, setCode] = useState(500);
  const [data, setData] = useState([]);
  return { data, setData, code, setCode };
}
