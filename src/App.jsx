import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import './App.css'

function App() {

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  delete configuration.baseOptions.headers['User-Agent'];

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "256x256",
      });
  
      setResult(response?.data?.data[0]?.url)
      // console.log("Response: ", response)
      // console.log("Data: ", response?.data)
      console.log("Recieved URL: ", response?.data?.data[0]?.url)
    }
    catch(error){
      if (error.response) {
        console.log("Avatar error status: ", error.response.status);
        console.log("Avatar error data: ", error.response.data);
      } else {
        console.log("Avatar error message: ", error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="app-main">
      { loading ? (
        <h1>Generating Image...</h1>
      )
      :
      (<>
        <h1>Welcome to PictureScript!🌍</h1>
        <h2>Type a prompt and click the button 👇🏾</h2>
        <input className='app-input' onChange={(e) => setPrompt(e.target.value)}
          placeholder='Type here'/>
        <button onClick={generateImage}>Generate an Image</button>

        {result.length > 0 ? <img src={result} alt={prompt} className='result-image' /> : <></>}
      </>)
      }
      <footer className='footer'>Powered by Bryan Ansong😎</footer>
    </div>
  )
}

export default App;
