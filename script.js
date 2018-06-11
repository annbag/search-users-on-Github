class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: []
    };
  }
  //metoda onChangeHandle ma za zadanie zmienić stan searchText na taki, 
  //jaki kryje się pod zdarzeniem zmiany inputa (event.target.value)
  onChangeHandle(event) {
    this.setState({searchText: event.target.value});
  }

  //Funkcja fetch jest interfejsem dzięki któremu możemy pobierać różne zasoby z sieci. 
  onSubmit(event) {
    event.preventDefault();
    const {searchText} = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({users: responseJson.items}));
  }


  render() {
    return (
      <div>
        <form onSubmit={event => this.onSubmit(event)}>
          <label htmlFor="searchText">Search by user name</label>
          <input
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}/>
        </form>
        <UsersList users={this.state.users}/>
      </div>
    );
  }
}
// USerList jako parametr przyjmuje tablicę userów i zajmuje się 
//odpowiednim wyświetleniem każdego jednego użytkownika zwróconego z serwera
class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user}/>);
  }

  render() {
    return (
      <div>
        {this.users}
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
        <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);