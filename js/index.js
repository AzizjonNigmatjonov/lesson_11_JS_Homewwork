let boxElement = $('.message-box');
let messagesListElement = $('.messages');
let formElement = $('.message-form');
let buttonElement = $('.send-button');
let messageElement = $('.message');
let textareaElement = $('.textarea');
let liElement2 = $('.recieved');
let messageList = $('.message-list');

// 
messageList.style.display = 'none'

// box time
let timeElement = document.createElement('time');
timeElement.classList.add('box-time')
timeElement.textContent = moment().format('h:mm a');
boxElement.appendChild(timeElement);

// message range
let messages = []

// send by button 
formElement.addEventListener('submit', e => {
	e.preventDefault()
	
	// message range
	let textArray = textareaElement.value.split('\n');
	let text = "";
	for (let item of textArray) {
		if (item.length == 0) {
			text += '<br>'
		} else {
			text += item
		}
	}
	
	let liElement = document.createElement('li');
	liElement.classList.add('message-item');
	messagesListElement.appendChild(liElement);
	let messageElement = document.createElement('p');
	messageElement.innerHTML = text;
	messageElement.classList.add('message');
	formElement.reset()
	if (itemNumber == 0) {
		liElement.appendChild(messageElement);
		itemNumber = 1;
	} else if (itemNumber == 1){
		let liElement2 = document.createElement('li');
		messagesListElement.appendChild(liElement2);
		liElement2.classList.add('recieved');
		liElement2.appendChild(messageElement);
		itemNumber = 0;
	}
	
	let messageTime = document.createElement('time');
	messageTime.classList.add('message-time');
	messageTime.textContent = moment().format('h:mm');
	messageElement.appendChild(messageTime)
	
	// message range
	messages.push({
		id: messages.length + 1,
		owner: text
	})
	liElement.setAttribute('id', `message#${messages.length + 1}`);
	
	window.location.href = `#message#${messages.length + 1}`;
	
	// set contextmenu event listener
	messageElement.addEventListener('contextmenu', e => {
		e.preventDefault()
		let listElement = document.createElement('ul');
		let messageItemElement = document.createElement('li');
		listElement.classList.add('message-list');
		messageItemElement.classList.add('message-item-delete');
		messageItemElement.textContent = `O'chirish`;
		messageElement.appendChild(listElement);
		listElement.appendChild(messageItemElement);
		listElement.style.display = 'block'
		let contextMenu = listElement;
		listElement.addEventListener('click', e => {
			if (e.target.className == 'message-item-delete'){
				let parentElement = e.target.parentElement.parentElement.parentElement;
				messagesListElement.removeChild(parentElement);
			}
		})
		document.body.addEventListener('click', e => {
			contextMenu.style.display = 'none';
		})
	})
})

//shift enter load
let itemNumber = 0;
useElement()
function useElement (item) {
	textareaElement.addEventListener('keyup', function(e){
		if(e.keyCode == 13 && e.shiftKey) {
			// message range
			let textArray = textareaElement.value.split('\n');
			let text = "";
			for (let item of textArray) {
				if (item.length == 0) {
					text += '<br>'
				} else {
					text += item
				}
			}
			
			let liElement = document.createElement('li');
			liElement.classList.add('message-item');
			messagesListElement.appendChild(liElement);
			let messageElement = document.createElement('p');
			messageElement.innerHTML = text;
			messageElement.classList.add('message');
			textareaElement.value = ' ';
			if (itemNumber == 0) {
				liElement.appendChild(messageElement);
				itemNumber = 1;
			} else if (itemNumber == 1){
				let liElement2 = document.createElement('li');
				messagesListElement.appendChild(liElement2);
				liElement2.classList.add('recieved');
				liElement2.appendChild(messageElement);
				itemNumber = 0;
			}
			
			// message time 
			let messageTime = document.createElement('time');
			messageTime.classList.add('message-time');
			messageTime.textContent = moment().format('h:mm');
			messageElement.appendChild(messageTime)
			
			// message range
			messages.push({
				id: messages.length + 1,
				owner: text
			})
			liElement2.setAttribute('id', `message#${messages.length + 1}`);
			
			window.location.href = `#message#${messages.length + 1}`;
		}
	})
}

// query create
function $(element) {
	return document.querySelector(element)
} 