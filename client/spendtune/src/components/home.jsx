import { useState } from 'react';

function Home(props) {

  const [linkedAccounts, setLinkedAccounts] = useState({})

  const user = {}

  if (props.logged) {
    user.firstName = props.logged.firstName
    user.lastName = props.logged.lastName
  }

  async function handleClick(event) {
    console.log('lets sync some shit')
  }

  return (
    <div className="home">
      <h1>Home</h1>
      <p>Hello {
        user.firstName ?
        user.firstName + ' ' + user.lastName :
        'stranger' }
      </p>
      { Object.keys(linkedAccounts).length === 0 &&
      <p>No bank accounts synced</p>
      }
      <button onClick={handleClick}>Sync your bank account</button>
    </div>
  )
}

export default Home;