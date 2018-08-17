import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import uuidV4 from 'uuid/v4'

// import { buildSubscription } from 'aws-appsync'
// import { graphqlMutation } from 'aws-appsync-react'

const ListPets = gql`
  query {
    listPets {
      items {
        id
        name
        description
      }
    }
  }
`

const CreatePet = gql`
  mutation($name: String!, $description: String) {
    createPet(input: {
      name: $name, description: $description
    }) {
      id
      name
      description
    }
  }
`

const PetSubscription = gql`
  subscription postSubscription {
    onCreatePet {
      id
      name
      description
    }
  } 
`

class App extends Component {
  state = {
    name: '', description: ''
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  componentDidMount() {
    this.props.data.subscribeToMore(
      buildSubscription(PetSubscription, ListPets)
    )
  }
  createPet = () => {
    const pet = this.state
    pet.id = uuidV4()
    this.props.onAdd(pet)
    this.setState({
      name: '', description: ''
    })
  }
  render() {
    return (
      <div className="App">
        <div style={styles.header}>
        <p style={styles.title}>My Favorite Pets</p>
        </div>
        <input
          style={styles.input}
          name='name'
          placeholder='name'
          value={this.state.name}
          onChange={this.onChange}
        />
        <input
          style={styles.input}
          name='description'
          placeholder='description'
          value={this.state.description}
          onChange={this.onChange}
        /><br />
        <button
          style={styles.button}
          onClick={this.createPet}
        >Add Pet</button>
        {
          this.props.pets.map((pet, index) => (
            <div key={index} style={styles.li}>
              <p style={styles.name}>{pet.name}</p>
              <p style={styles.description}>{pet.description}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default compose(
  graphql(ListPets, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => {
      console.log('props:', props)
      return {
        pets: props.data.listPets ? props.data.listPets.items : [],
        data: props.data
      }
    }
  }),
  graphql(CreatePet, {
    options: {
      update: (dataProxy, { data: { createPet } }) => {
        const data = dataProxy.readQuery({ query: ListPets })
        data.listPets.items.push(createPet)
        dataProxy.writeQuery({ query: ListPets, data })
      }
    },
    props: (props) => ({
      onAdd: (pet) => {
        console.log('pet: ', pet)
        props.mutate({
          variables: pet,
          optimisticResponse: () => ({
            createPet: { ...pet, __typename: 'Pet' }
          }),
        })
      }
    }),
  })
)
(App);

const styles = {
  header: {
    height: 100, backgroundColor: '#fc2020', marginBottom: 20,
    alignItems: 'center', justifyContent: 'center', display: 'flex'
  },
  title: {
    fontWeight: 600, fontSize: 32, color: 'white', margin: 0
  },
  name: {
    fontSize: 19
  },
  button: {
    outline: 'none', border: '1px solid #ddd', padding: '15px 100px', margin: 10, cursor: 'pointer'
  },
  input: {
    height: 30, width: 200, padding: 7, outline: 'none', border: 'none', borderBottom: '2px solid #fc2020', margin: 8, fontSize: 18
  },
  description: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, .5)'
  },
  li: {
    padding: '5px 0px', borderBottom: '1.5px solid #ddd'
  }
}
