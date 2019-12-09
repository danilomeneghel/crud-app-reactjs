import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
  const [ user, setUser ] = useState(props.currentUser)

  useEffect(
    () => {
      setUser(props.currentUser)
    },
    [ props ]
  )
  
  const handleInputChange = event => {
	const { name, value } = event.target

	setUser({ ...user, [name]: value })
  }

  const result = Object.keys(user).map(function(key) {
	return user[key];
  });
	
  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateUser(user[0], result)
      }}
    >
      <label>Nome</label>
      <input type="text" name="name" value={user[1]} onChange={handleInputChange} /><br />
      <label>Usuario</label>
      <input type="text" name="username" value={user[2]} onChange={handleInputChange} /><br />
	  <label>E-mail</label>
      <input type="text" name="email" value={user[3]} onChange={handleInputChange} /><br /><br />
      <button>Salvar</button>
    </form>
  )
}

export default EditUserForm
