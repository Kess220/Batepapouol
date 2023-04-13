axios.defaults.headers.common["Authorization"] = "YMTZPhf9eYEKGY2ajOke13iv";
const url = "https://mock-api.driven.com.br/api/vm/uol/participants ";
const msg = {
  name: "zzzzzzzzzzzzzzzzzzzzzzzzzzz76589765897659765",
};

axios
  .post(url, msg)
  .then((response) => {
    console.log("requisicao ok");
  })
  .catch((error) => {
    console.log("Deu erro, filho", error);
  });

axios
  .get("https://mock-api.driven.com.br/api/vm/uol/messages")
  .then((response) => {
    console.log("Dados recebidos:", response.data);
  })
  .catch((error) => {
    console.log("Erro ao receber dados:", error);
  });
