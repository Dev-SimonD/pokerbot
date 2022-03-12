import { Widget, addResponseMessage } from 'react-chat-widget';
import React, {useEffect } from 'react'
import Answers from './components/Answers';
import Utterances from './components/Utterances';
import Alternatives from './components/Alternatives';
import 'react-chat-widget/lib/styles.css';
import botIcon from "./botIcon.png"
import "./App.css"
import BackgroundPage from './components/BackgroundPage';

const jokeURL = "https://api.chucknorris.io/jokes/random";

function App() {

  useEffect(() => {
    addResponseMessage("Hi I'm pokerBot. Can I help you?");
  }, []);

   const handleNewUserMessage = async (newMessage) => {
    let product;
      let text = newMessage.toLowerCase().replace(/[^\w\s\d]/gi, "");
      text = text
        .replace(/ a /g, " ")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .replace(/ the/g, "")
        .replace(/ the /g, "")
        .replace(/the /g, "")
        .replace(/r u/g, "are you");
    
        if(text === "joke" || text === "tell a joke"){
          const response = await fetch(jokeURL);
          const joke = await response.json();
          product = JSON.stringify(joke.value);
          product = product.slice(1, -1);
          addResponseMessage(product);
          return;
      }
      if(text === "weather" || text === "whats the weather"){
        let temp;
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=50.0755&lon=14.4378&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`);
        const weather = await response.json();
        console.log(weather.main.temp)
        temp = JSON.stringify(weather.main.temp);
        product = `The temperature is ${temp}`;
        addResponseMessage(product);
        return;
         }

         if (compare(Utterances, Answers, text)) {

          product = compare(Utterances, Answers, text);
        } 
        else {
            console.log(Alternatives.length)
          product = Alternatives[Math.floor(Math.random() * Alternatives.length)];
        }
        addResponseMessage(product);
     }
   

function compare(utterancesArray, answersArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let replies = answersArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}


    return (
      <div className="App">
        <BackgroundPage/>
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={botIcon}
          title="PokerBOT"
          subtitle="Ask me about the Poker Society"
          showCloseButton={true}
        />
      </div>
    );
}

export default App;