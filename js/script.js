axios.defaults.headers.common["Authorization"] = "YMTZPhf9eYEKGY2ajOke13iv";
let user = {
  name: null,
};
// Pedir login assim que entrar na sala
async function pedirLogin() {
  user.name = prompt("Digite seu Login");

  try {
    await axios.post(
      "https://mock-api.driven.com.br/api/v6/uol/participants",
      user
    );
    console.log("Cadastro feito com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    user.name = prompt("Login já cadastrado, tente outro login");
  }
}

// atualizar mensagens e colocar no meu container
async function getMsg() {
  try {
    const response = await axios.get(
      "https://mock-api.driven.com.br/api/v6/uol/messages"
    );
    layoutMesg(response);
  } catch (error) {
    console.error(error);
  }
}

function layoutMesg(response) {
  document.querySelector(".container-chat").innerHTML = "";
  for (let i = 0; i < response.data.length; i++) {
    if (response.data[i].type == "message") {
      document.querySelector(".container-chat").innerHTML += `
      <div data-test="message" class="message">
        <p>
          <label class="data">(${response.data[i].time})</label>
          <strong class="username">${response.data[i].from}</strong>
          ${response.data[i].text}
        </p>
      </div>
      `;
    } else if (response.data[i].type === "status") {
      document.querySelector(".container-chat").innerHTML += `
      <div data-test="message" class="messageEntrada">
        <p>
          <label class="data">(${response.data[i].time})</label>
          <strong class="username">${response.data[i].from}</strong>
          ${response.data[i].text}
        </p>
      </div>`;
    } else if (response.data[i].type === "status") {
      document.querySelector(".container-chat").innerHTML += `
      <div data-test="message" class="messagePv">
        <p>
          <label class="data">(${response.data[i].time})</label>
          <strong class="username">${response.data[i].from} reservadamente para</strong>
          <strong class="to">(${response.data[i].to}:</strong>
          ${response.data[i].text}
        </p>
      </div>`;
    }
  }
}

// Enviar mensagem
const postMsg = async () => {
  const texto = document.querySelector(".digitar").value;
  const mensagem = {
    from: user.name,
    to: "todos",
    text: texto,
    type: "message",
  };

  try {
    const response = await axios.post(
      "https://mock-api.driven.com.br/api/v6/uol/messages",
      mensagem
    );
    document.querySelector(".digitar").value = "";
    console.log("Mensagem enviada");
    getMsg();
  } catch (error) {
    console.log("Error", error);
    window.location.reload();
  }
};

//Enviar com ENTER
const keypressEnter = () => {
  const inputfield = document.getElementById("enter");
  inputfield.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      document.getElementById("envia").click();
    }
  });
};

// Verificar se o user ainda está on
const aindaOn = (on) => {
  if (on.status === 200) {
    setInterval(() => {
      loginCorreto();
      console.log("User ainda online");
    }, 5000);
  }
};

// Checar o login do usuario e se der error, falar que saiu da sala
function loginCorreto() {
  let promisse = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/status",
    user
  );
  promisse.then();
}
setInterval(getMsg, 3000);

pedirLogin();
keypressEnter();
