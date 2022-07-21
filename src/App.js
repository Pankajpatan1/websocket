// import logo from './logo.svg';
// import './App.css';
import React,{useEffect , useState} from 'react';
import Table from './Table';
function App() {
  const [data ,setData] = useState([])
    useEffect(() => {
      fetch('https://api.delta.exchange/v2/products')
        .then((data) => data.json())
        .then((data) => setData(data.result));
    }, []);

    useEffect(() => {
      const ws = new WebSocket(" wss://production-esocket.delta.exchange");
      const apiCall = {
        type: "subscribe",
        payload: {
            channels: [
                {
                    name: "v2/ticker",
                    symbols: data.map(item => item.symbol)

                },
            ]
        }
    }   
      ws.onopen = (event) => {
          ws.send(JSON.stringify(apiCall));
      };
      ws.onmessage = function (event) {
          const json = JSON.parse(event.data);
          if(json.type === "v2/ticker"){
           const newData =  data.map((item)=>{
              if(item.symbol === json.symbol){
                return {...item , mark_price : json.mark_price}
              }
              return item
            })
            setData(newData)
          }
      };
      //clean up function
      return () => ws.close();
  }, [data]);
  return (
    <div >
      <Table data={data}/>
    </div>
  );
}

export default App;
