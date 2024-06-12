class WebSocketClient {
    constructor(url) {
        this.webSocket = new WebSocket(url);

        // Обработчики событий WebSocket
        this.webSocket.onopen = this.onopen;
        this.webSocket.onclose = this.onclose;
        this.webSocket.onerror = this.onerror;
        this.webSocket.onmessage = this.onmessage;
    }

    // Методы для обработки событий WebSocket
    onopen(event) {}
    onclose(event) {}
    onerror(event) {}
    onmessage(event) {}

    // Метод для отправки сообщения через WebSocket
    send(message) {
        this.webSocket.send(message);
    }

    // Метод для закрытия соединения
    close() {
        this.webSocket.close();
    }
}

export default WebSocketClient;
