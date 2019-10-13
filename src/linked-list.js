const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        if(this.isEmpty()) {
            this._head = new Node();
            this._head.data = data;
            this._head.prev = null;
            this._head.next = null;
            this._tail = this._head;
            this.length++;
            return this;
        }
        let newNode = new Node();
        this._tail.next = newNode;
        newNode.prev = this._tail;
        newNode.next = null;
        this._tail = newNode;
        this._tail.data = data;

        this.length++;
        return this;
    }

    head() { 
        if (this.isEmpty()) return null;
        return this._head.data; 
    }

    tail() { 
        if (this.isEmpty()) return null;
        return this._tail.data; 
    }

    at(index) {
        if (index < 0 || index >= this.length) return null;

        let current = this._head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.data;
    }

    insertAt(index, data) {
        if (index < 0 || index >= this.length) return null;
        let current = this._head;
        for (let i = 0; i < index-1; i++) {
            current = current.next;
        }

        let newNode = new Node();
        newNode.data = data;
        newNode.prev = current;
        newNode.next = current.next;

        current.next.prev = newNode;
        newNode.prev.next = newNode;
        this.length++;
        return this;
    }

    isEmpty() {
        return this.length == 0;
    }

    clear() {
        if (!this.isEmpty()) {
            while(this.length) {
                this.deleteAt(0);
            }
        } 
        return this;
    }

    deleteAt(index) {
        if (index < 0 || index >= this.length) return null;
        let current = this._head;

        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        if (this.length == 1) {
            this._head = null;
            this._tail = null;
            this.length--;
            return this
        }

        if (current == this._head) {
            this._head = current.next;
            this._head.prev = null;
            this.length--;
            return this;
        }

        if (current == this._tail) {
            this._tail = current.prev;
            this._tail.next = null;
            this.length--;
            return this;
        }

        current.prev.next = current.next;
        current.next.prev = current.prev;
        this.length--;
        return this;
    }

    reverse() {
        let current = this._tail;
        for (let i = 0; i < this.length; i++) {
            let buf_current = current.next;
            current.next = current.prev;
            current.prev = buf_current;
            current = current.next;
        }

        let buf_current = current;
        buf_current = this._head;
        this._head = this._tail;
        this._tail = buf_current;
        return this;

    }

    indexOf(data) {
        let current = this._head;
        for (let i = 0; i < this.length; i++) {
            if (current.data === data) return i;
            current = current.next;
        }
        return -1;
    }
}

module.exports = LinkedList;
