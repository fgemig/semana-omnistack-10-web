import React, { Component } from 'react';
import { debounce } from 'lodash';
import api from './services/api';

import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
import Search from './components/Search';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      devs: []
    }
  }

  async componentDidMount() {

    const devs = await this.loadDevs();

    this.setState({
      devs: devs
    });
  }

  loadDevs = async (search) => {
    console.log('chamou: ' + search);
    const response = await api.get('/devs');

    let data = response.data;

    if (search != null) {
      if (search !== ''){
        data = data.filter((dev) => {
          return dev.github_username.toLowerCase().includes(search?.toLowerCase());
        });
      }
    }

    return data;
  }

  handleAddDev = async (data) => {

    const response = await api.post('/devs', data);

    this.setState({
      devs: [...this.state.devs, response.data.dev]
    });
  }

  handleSearchDev = debounce(async (data) => {
    
    let devs = await this.loadDevs(data);

      this.setState({
        devs: devs
      });
  }, 2000);

  render() {
    return (
      <div id="app">
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={this.handleAddDev} />
        </aside>

        <main>
          <Search searchText={this.handleSearchDev} />
          <ul>
            {this.state.devs.map(dev => (
              <DevItem key={dev._id} dev={dev} />
            ))}
          </ul>
        </main>

      </div >
    );
  }
}

export default App;
