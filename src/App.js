import { Widget, addResponseMessage } from 'react-chat-widget';
import React, {useEffect } from 'react'
import Answers from './components/Answers';
import Utterances from './components/Utterances';
import Alternatives from './components/Alternatives';
import 'react-chat-widget/lib/styles.css';
import logo from './logo.svg';

const jokeURL = "https://api.chucknorris.io/jokes/random";
//const weatherURL = `api.openweathermap.org/data/2.5/weather?lat=54&lon=54&appid=${process.env.REACT_APP_WEATHER_API}`;
//let jokefin = "";



function App() {

  //const [theinput, setTheinput] = useState("");


  useEffect(() => {
    addResponseMessage("Hi. Can I help you?");
  }, []);

   const handleNewUserMessage = async (newMessage) => {
    let product;
    console.log(`New message incoming! ${newMessage}`);
    //output(newMessage);
    
      console.log(newMessage);
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
   
  

    
  /* const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  }); */

  
/* async function output(input) {
  let product;
  console.log(input);
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
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
        product = product. slice(1, -1);
      addChatEntry(input, product);
      return;
    }
    if(text === "weather" || text === "whats the weather"){
      let temp;
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=50.0755&lon=14.4378&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`);
      const weather = await response.json();
      console.log(weather.main.temp)
      temp = JSON.stringify(weather.main.temp);
      product = `The temperature is ${temp}`;
    addChatEntry(input, product);
    return;
  }

  if (compare(Utterances, Answers, text)) {

    product = compare(Utterances, Answers, text);
  } 
  else {
      console.log(Alternatives.length)
    product = Alternatives[Math.floor(Math.random() * Alternatives.length)];
  }

  addChatEntry(input, product);
}
 */
/* function handleChange(event)  {
setTheinput(event.target.value)

}   */


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

/* function addChatEntry(input, product) {
  const userStyle = "background: #5ca6fa; color: white; padding: 10px; border-radius: 8px; animation: floatup .5s forwards; display: none;"
  const botStyle = "background: #e0e0e0; border-radius: 8px; padding: 10px; animation: floatup .5s forwards"

  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.style.cssText = userStyle
  userDiv.innerHTML = `<span>${input}</span>`;
  messagesContainer.appendChild(userDiv);


  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botText.style.cssText = botStyle;
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {

    botText.innerText = `${product}`;
  }, 2000);

  return product;
} */

    return (
      <div className="App">
        <Widget
      
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={logo}
         // handleSubmit={output}
          title="PokerBOT"
          subtitle="Ask me about the Poker Society"
        />
      </div>
    );
}

export default App;