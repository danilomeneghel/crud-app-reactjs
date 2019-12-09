import React, { useState } from 'react'

const AddUserForm = props => {
	const initialFormState = []
	const [ user, setUser ] = useState(initialFormState)
	const [ data, setData ] = useState([])
	
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
				if (!user.name || !user.username) return

				props.addUser(result)
				setUser(initialFormState)
			}}
		>
			<label>Nome: </label>
			<input type="text" name="name" value={user.name} onChange={handleInputChange} /><br />
			<label>Usuario: </label>
			<input type="text" name="username" value={user.username} onChange={handleInputChange} /><br />
			<label>E-mail: </label>
			<input type="text" name="email" value={user.email} onChange={handleInputChange} /><br /><br />
			<button>Salvar</button>
			<br /><br />
		</form>
	)
}

export default AddUserForm
