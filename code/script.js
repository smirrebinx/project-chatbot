// Variables that point to selected DOM elements
const chat = document.getElementById("chat");
const inputWrapper = document.getElementById("input-wrapper");
const form = document.getElementById("name-form");
const inputValue = document.getElementById("name-input");

// If you need any global variables that you can use across different functions, declare them here:
let currentQuestion = 0;
let userName = "";
let favorite = "";
const setTimeOutTime = 1200;

// Declare your functions after this comment

// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  // the if statement checks if the sender is 'user' and if that's the case it inserts an html senction inside the chat with the posted message
  if (sender === "user") {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user-avatar.png" alt="User" />  
      </section>
    `;
    // the else if statement checks if the sender is a bot and if that's the case it inserts an html senction inside the chat with the posted message
  } else if (sender === "bot") {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/catbot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `;
  }
  // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
  chat.scrollTop = chat.scrollHeight;
};

// Starts here
const greetUser = () => {
  // here we call the function showMessage, that we declared earlier with the argument "Hello there, What's your name?" for message, and the argument "bot" for sender
  showMessage(
    "Welcome to Cat Bot the Chat bot. What's your first name?",
    "bot"
  );
  chat.scrollTop = chat.scrollHeight;
};

const favoritePersonality = () => {
  showMessage(
    `Hello ${userName}! Which cat personality is your favorite?`,
    "bot"
  );
  inputWrapper.innerHTML = `
  <button class="primary-button" id="cuddly" value="cuddly">Cuddly</button>
  <button class="secondary-button" id="antisocial" value="antisocial">Antisocial</button>
`;

  const cuddly = document.getElementById("cuddly");
  cuddly.addEventListener("click", () =>
    handleFavoritePersonality(cuddly.value)
  );

  const antisocial = document.getElementById("antisocial");
  antisocial.addEventListener("click", () =>
    handleFavoritePersonality(antisocial.value)
  );
  chat.scrollTop = chat.scrollHeight;
};

const preferredType = () => {
  showMessage(`Which type of cat do you prefer`, "bot");
  inputWrapper.innerHTML = `
<select id="select">
<option disabled selected value="">Select your favorite type of cat</option>
<option id="domestic-long-haired-cat" value="domestic-long-haired-cat">Domestic Long-Haired Cat/Non-Breed</option>
<option id="domestic-short-haired-cat" value="domestic-short-haired-breed">Domestic Short-Haired Breed</option>
<option id="short-haired-breed" value="short-haired-breed">Short-Haired Breed</option>
<option id="long-haired-breed" value="long-haired-breed">Long-Haired Breed</option>
   </select>
`;
  const select = document.getElementById("select");
  select.addEventListener("change", () => handlePreferredType(select.value));
  chat.scrollTop = chat.scrollHeight;
};

const adopt = () => {
  showMessage(
    `Great! We have found the perfect ${favorite} cat for you. 
    Would you like to adopt a cat?`,
    "bot"
  );
  inputWrapper.innerHTML = `
  <button class="primary-button" id="yes" value="yes">Yes!</button>
  <button class="secondary-button" id="maybe" value="maybe">I'll think about it</button>
  <button class="primary-button" id="no" value="no">No</button>
`;
  const userResponseYes = document.getElementById("yes");
  userResponseYes.addEventListener("click", () =>
    handleAdoptACat(userResponseYes.value)
  );

  const userResponseMaybe = document.getElementById("maybe");
  userResponseMaybe.addEventListener("click", () =>
    handleAdoptACat(userResponseMaybe.value)
  );

  const userResponseNo = document.getElementById("no");
  userResponseNo.addEventListener("click", () =>
    handleAdoptACat(userResponseNo.value)
  );
  chat.scrollTop = chat.scrollHeight;
};

const farewellMessage = (message) => {
  showMessage(message, "bot");
  inputWrapper.innerHTML = ``;
  chat.scrollTop = chat.scrollHeight;
};

const handleInput = (message) => {
  message.preventDefault();
  currentQuestion++;
  if (currentQuestion === 1) {
    handleUserName();
  } else if (currentQuestion === 2) {
    handleFavoritePersonality();
  } else if (currentQuestion === 3) {
    handlePreferredType();
  } else {
    handleAdoptACat();
  }
};

const handleUserName = () => {
  // console.log(`${inputValue.value}`);
  const input = inputValue.value;

  const capitalized = input.charAt(0).toUpperCase() + input.slice(1);
  userName = capitalized;
  showMessage(`${userName}`, "user");
  inputValue.value = "";
  setTimeout(favoritePersonality, setTimeOutTime);
};

const handleFavoritePersonality = (chosenFavorite) => {
  favorite = chosenFavorite;
  showMessage(`My favorite cat personality is ${favorite}`, "user");
  inputValue.value = ``;
  setTimeout(preferredType, setTimeOutTime);
};

const handlePreferredType = (preferredCatType) => {
  console.log(`${inputValue.value}`);
  showMessage(`I prefer the ${preferredCatType}`, "user");
  inputValue.value = ``;
  setTimeout(adopt, setTimeOutTime);
};

const handleAdoptACat = (adopt) => {
  if (adopt === "yes") {
    showMessage("Yes!", "user");
    inputValue.value = ``;
    setTimeout(
      farewellMessage(`Thank you, we will be in touch, cat lover!`),
      setTimeOutTime
    );
  } else if (adopt === "maybe") {
    showMessage("I'll think about it", "user");
    inputValue.value = ``;
    setTimeout(
      farewellMessage(
        `That's ok, you will learn to love cats soon, I promise!`
      ),
      setTimeOutTime
    );
  } else {
    showMessage("No", "user");
    inputValue.value = ``;
    setTimeout(farewellMessage(`Ok, good bye.`), setTimeOutTime);
  }
};

// Set up your eventlisteners here
form.addEventListener("submit", handleInput);

// When website loaded, chatbot asks first question.
// normally we would invoke a function like this:
// greeting()
// But if we want to add a little delay to it, we can wrap it in a setTimeout:
// setTimeout(functionName, timeToWaitInMilliSeconds)
// This means the greeting function will be called one second after the website is loaded.
setTimeout(greetUser, setTimeOutTime);
