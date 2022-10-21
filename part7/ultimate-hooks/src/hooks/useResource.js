import { useState, useEffect  } from 'react';
import axios from 'axios';

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const config = {
      headers: { 'Content-Type': 'application/json',
                 'Authorization': 'bearer ...' },
    }
  
    useEffect(() => {
      axios
        .get(baseUrl, config)
        .then(response => setResources(response.data))
        .catch((error) => console.log(error))
    }, [baseUrl])
  
    const create = async (resource) => {
        const res = await axios.post(baseUrl, resource, config).catch(error => console.log(error));
        setResources([...resources, res.data]);
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }