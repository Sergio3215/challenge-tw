import { useEffect, useState } from 'react'
import { initSession } from 'connector-twitch-irc';
import SearchWords from './Components/search-words';
import ListWord from './Components/list-words';
import './App.css'
import Adivinar from './Components/adivinar';

const clientID_ = import.meta.env.VITE_APP_CLIENTID;

function App() {

  const [location, setLocation] = useState({});
  const [connect, setConnect] = useState({});
  const _loadingEffect = false;

  const [isConnect, setIsConnect] = useState(false);

  const [mode, setMode] = useState('palabra'); // adivinar / palabra
  const [arrMessage, setArrMessage] = useState([]);
  const [filter, setFilter] = useState('');
  const [opciones, setOpciones] = useState([]);
  const [question, setQuestion] = useState('');


  useEffect(() => {
    setLocation(window.location);

    try {
      if (!_loadingEffect) {
        initSession(clientID_, setConnect, false);
      }
    } catch (error) {

    }
  }, []);

  useEffect(() => {
  }, [_loadingEffect, isConnect]);

  useEffect(() => {
    sizeCard();
  }, [mode]);

  useEffect(() => {
  }, [arrMessage, filter, opciones]);

  useEffect(() => {
    sizeCard();
  }, []);

  const sizeCard = () => {
    let str = '80%'
    if (mode == 'palabra') {
      str = 'auto';
    }

    document.querySelector('.card').style.width = str;
  }

  const getConnect = async () => {
    if (connect.connect != undefined && connect.connect != null) {

      setIsConnect(true);

      await connect.connect().catch(console.error);

      connect.on('message', (channel, tags, message, self) => {
        const username = tags['username'],
          display_name = tags['display-name'];

        console.log(`${display_name} : ${username} -> ${message}`);
        if (mode == "palabra") {
          setArrMessage((prevArr) => [
            ...prevArr,
            {
              username: username,
              display_name: display_name,
              message: message
            },
          ]);
        }

      });

    }
    else {
      setIsConnect(false);
    }
  }

  useEffect(() => {
    getConnect();
  }, [connect]);

  const handlerChangeInput = (e) => {
    let value = e.target.value;

    setFilter(value);
  }

  const setColorTab = (st1, st2) => {
    try{
      let tabs = document.querySelector('.tabs').children;

      tabs[0].style.backgroundColor = st1;
      tabs[1].style.backgroundColor = st2;
    }
    catch(err){

    }
  }

  const AccionarTab = (value) => {

    let st1 = 'rgb(25, 24, 23)', st2 = 'rgb(20, 19, 18)';

    if (value == 'adivinar') {
      st1 = 'rgb(20, 19, 18)';
      st2 = 'rgb(25, 24, 23)';
    }

    setColorTab(st1, st2);

    setMode(value);
  }

  return (
    <>
      <div className='App'>
        <h1>Detector de Palabras</h1>
        {
          isConnect ?
            <div className='tabs'>
              <div onClick={() => {
                AccionarTab("palabra")
              }}>Decir palabras</div>
              <div onClick={() => {
                AccionarTab("adivinar")
              }}>Adivinar Pregunta</div>
            </div>
            :
            <>
            </>
        }
        <div className="card">
          {
            !isConnect ?

              <button className='login-tw' onClick={(() => {
                location.href = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientID_}&redirect_uri=${location.origin}&scope=chat%3Aread+chat%3Aedit`
              })}>
                Twitch
              </button>
              :
              <>
                {
                  mode == 'palabra' ?
                    <>
                      <SearchWords handlerChangeInput={handlerChangeInput} />
                      <ListWord arrMessage={arrMessage} filter={filter} />
                    </>
                    :
                    <>
                      <Adivinar opciones={opciones} setOpciones={setOpciones} question={question} setQuestion={setQuestion} />
                    </>
                }
              </>
          }
        </div>
      </div>
    </>
  )
}

export default App
