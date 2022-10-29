import { post } from "jquery"
import checkNumInputs from "./checkNumInputs"

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]')
    
    checkNumInputs('input[name="user_phone"]')

    const message = {
        loading: 'Loading...',
        success: 'Thanks! We call you soon.',
        failure: 'Something go wrong'
    }

    const postData = async (url, data) =>{
        document.querySelector('.status').textContent = message.loading
        let res = await fetch(url, {
            method: 'POST',
            body: data
        })

        return await res.text()
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = ''
        })
    }

    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault()
            
            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            item.appendChild(statusMessage)

            const formData = new FormData(item)
            if(item.getAttribute('data-calc') === 'end'){
                for(let key in state){
                    formData.append(key, state[key])
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res)
                    statusMessage.textContent = message.success
                })
                .catch(() => {
                    statusMessage.textContent = message.failure
                })
                .finally(() => {
                    clearInputs()
                    setTimeout(function(){
                        statusMessage.remove()
                    }, 10000)
                })
        })
    })
}

export default forms