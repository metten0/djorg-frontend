import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

const notesClient = axios.create({
    baseURL: 'http://0.0.0.0:8000/api/notes',
    timeout: 1000
});

class App extends Component {
    state = {
        notes: [],
        error: ''
    }

    componentDidMount() {
        notesClient.get('/')
                   .then((res) => {
                       const notes = res.data;
                       this.setState({ notes });
                   }).catch((err) => {
                       console.warn(err);
                       this.setState({ error: err.message });
                   });
    }

    render() {
        return (
            <div>
                <ul>
                    { this.state.notes.map(note =>
                        <li key={note.id}>{note.title}</li>) }
                </ul>
                { this.state.error ? <h2>{ this.state.error }</h2> : ''}
            </div>
        )
    }
}

export default App;
