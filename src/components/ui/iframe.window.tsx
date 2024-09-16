import { useEffect, useState } from 'react';
import POOL from '@/lib/api-pool'
import PropTypes from 'prop-types';

const IframeWindow = (props) => {

const [state, setState] = useState({
  iframe_key: 0,
  iframe_url: undefined //Your URL here
})

const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  (async () => {
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setState({
      iframe_key: Math.abs(Math.random() * 8888888),
      iframe_url: props.token
    })
  setLoading(false)
  })();
  
}, [props.token])

if(loading) return <div>Loading...</div>

  return (
    <div style={{width: '100%'}}>
      <iframe key={state.iframe_key} height={807} width={'100%'} src={POOL.baseUrl + POOL.paths.template.demo + `?token=${state.iframe_url}`} frameBorder="0"></iframe>
    </div>
  )
}

IframeWindow.propTypes = {
  token: PropTypes.string,
}

export default IframeWindow
