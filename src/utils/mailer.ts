import axios from "axios";

export async function sendLoginEmail({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) {

  const emailData = {
    personalizations: [
      {
        to: [
          {
            email: email,
          },
        ],
        subject: "Test | Your login information",
      },
    ],
    from: {
      email: "sebastian.quispe.b@utec.edu.pe",
    },
    content: [
      {
        type: "text/html",
        value: `Login by clicking <a href="${url}/login#token=${token}">HERE</a>`,
      },
    ],
  };

  const options = {
    method: "POST",
    url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key || "",
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host || "",
    },
    data: emailData,
  };

  console.log(emailData);

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

}

export async function sendOrderConfirmation({
  email,
}: {
  email: string;
}) {

  const emailData = {
    personalizations: [
      {
        to: [
          {
            email: email,
          },
        ],
        subject: "Farmacias Lucero | Your order has been confirmed",
      },
    ],
    from: {
      email: ""
    }
  }
}