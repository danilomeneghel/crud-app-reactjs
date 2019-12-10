import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
	const [ user, setUser ] = useState(props.currentUser)

	useEffect( () => {
			setUser(props.currentUser)
		},
		[ props ]
	)

	const handleInputChange = event => {
		const { name, value } = event.target

		setUser({ ...user, [name]: value })
	}

	return (
		<form
		  onSubmit={event => {
			event.preventDefault()
			props.updateUser(user.id, user)
		  }}
		>
			<label>Nome</label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} /><br />
			<label>Usuario</label>
			<input type="text" name="username" value={user.username} onChange={handleInputChange} /><br />
			<label>E-mail</label>
			<input type="text" name="email" value={user.email} onChange={handleInputChange} /><br /><br />
			<button>Salvar</button>
		</form>
	)
}

export default EditUserForm
