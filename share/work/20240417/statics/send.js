const sendBtn = document.querySelector('.send-btn');
const textarea = document.querySelector('textarea');
const chatArea = document.getElementById('chat-area');

// 时间获取
function getCurrentTime() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}   

// 按键发送
textarea.addEventListener('keydown', function(event) {
    if (event.key === 'Alt') {
        textarea.value += '<br>'; // 处理换行
    }
    if (event.key === 'Enter') { // 
        event.preventDefault(); // 阻止换行

        // 发送消息的逻辑
        const message = textarea.value;
        if (message.trim() !== '') {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.innerHTML = `
            <div class="message-box right">
                <span class="time right">${getCurrentTime()}</span>
                <p class="text">
                    ${message}
                </p>
            </div>
            <span class="name right">热巴</span>
            `;
            chatArea.appendChild(messageDiv);
            textarea.value = '';
            console.log('发送消息:', message);
        }
    }
});

// 按钮发送
sendBtn.addEventListener('click', function() {
    const message = textarea.value; // 获取 textarea 里的内容

    if (message.trim() === '') {
        alert('不能发送空白消息');
        return;
    }

    // 在 chat-area 里添加 message div 展示发送内容
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `
        <div class="message-box right">
            <span class="time right">${getCurrentTime()}</span>
            <p class="text">
                ${message}
            </p>
        </div>
        <span class="name right">热巴</span>
    `;
    chatArea.appendChild(messageDiv);

    // 清空 textarea
    textarea.value = '';

    // 在这里发送消息的逻辑
    console.log(getCurrentTime());
    console.log('发送消息:', message);
});