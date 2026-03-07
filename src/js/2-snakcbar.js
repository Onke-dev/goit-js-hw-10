import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const ms = document.querySelector("input[name='delay']");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const delay = Number(ms.value);
    const selectedRadio = document.querySelector("input[name='state']:checked");
    const promise = new Promise((res, rej) => {
        setTimeout(() => {
            if (selectedRadio.value === "fulfilled") {
                res(`✅ Fulfilled promise in ${delay}ms`)
            } else {
                rej(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay)
    });
    promise
        .then(() => {
            iziToast.success({
                title: 'OK',
                message: `✅ Fulfilled promise in ${delay}ms`,
            });;
        })
        .catch(() => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`,
            });;
        })
});



