import React, { Component, useState, Fragment, useEffect  } from 'react';
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, IconButton, Modal } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import MUIDataTable from "mui-datatables";

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
    display: 'block',
    color: "#fff"
  },
});

class App extends React.Component {

	constructor (props) {
		super(props);
	  
		this.open = false;
		this.state = { open: false, edit: false };	
		this.array = [];
		this.currentUser = [];
		this.editing = false;
	}

	loadContentFromServer() {
		const url = 'https://jsonplaceholder.typicode.com/users';

		fetch(url)
		.then(response => response.json())
		.then(json => {
		 this.setState({ results: json });
		});
	}
	
	componentDidMount() {
		this.loadContentFromServer();
	}

	render() {
		const classes = styles();
		const array = this.array;
		var data = [];
		var open = false;
		var editing = false;
		var currentUser = [];
		
		const handleOpen = () => {
			this.setState({ open: true });
		};
		
		const handleClose = () => {
			this.setState({ open: false });
		};
		
		open = this.state.open;
		
		if(!!this.state.results) {
			this.array = this.state.results.map(result => [result.id, result.name, result.username, result.email, '']);
		}
		
		if(!!this.state.array) {
			data = this.state.array;
		} else {
			data = this.array;
		}
		
		// CRUD operations
		const addUser = user => {
			user.id = data.length + 1;
			const addUser = [user.id, user.name, user.username, user.email, ''];
			this.setState({ array: data.concat([addUser]) });
			handleClose();
		};
		
		const addButton = () => {
			this.setState({ edit: false });
			handleOpen();
		};
		
		const deleteUser = id => {
			this.setState({ edit: false });
			this.setState({ array: data.filter(user => user.id !== id) });
		};
		
		const updateUser = (id, updatedUser) => {
			this.setState({ edit: false });
			const editUser = [updatedUser.id, updatedUser.name, updatedUser.username, updatedUser.email, ''];
			this.setState({ array: data.map(user => (user[0] === id ? editUser : user)) });
			handleClose();
		};
		
		const editButton = user => {
			this.setState({ edit: true });
			this.setState({ arrayEdit: {id: user[0], name: user[1], username: user[2], email: user[3], acao: ''} });
			handleOpen();
		};
		
		editing = this.state.edit;
		currentUser = this.state.arrayEdit;
		
		const columns = [
		  { name: 'ID', options: {filter: false} },
		  { name: 'Nome', options: {filter: false} },
		  { name: 'Usuário', options: {filter: false} },
		  { name: 'E-mail', options: {filter: false} },
		  { name: "Ações", 
			options: {
			  filter: true,
			  customBodyRender: (value, tableMeta, updateValue) => {
				return (
				  <button onClick={() => {
					editButton(tableMeta.rowData)
				  }}
                  className="button muted-button"
				  >Editar</button>
				);
			  }
			}
		  }
		];
		
		const options = {
		  filter: true,
		  filterType: "dropdown",
		  responsive: ""
		};
		
		return (
			<div className={classes.root}>
				<AppBar position="static">
					  <Toolbar>
						<IconButton edge="start" className="" color="inherit" aria-label="menu">
						  <MenuIcon />
						</IconButton>
						<Typography variant="h6" className="">
						  ReactJS App
						</Typography>
					  </Toolbar>
				</AppBar>
				
				<button type="button" className="button" onClick={() => { addButton() }}>Adicionar</button>
				
				<MUIDataTable
				title={"Lista de Usuários"}
				data={data}
				columns={columns}
				options={options}
				/>
				
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={open}
					onClose={handleClose}
				>
					<div className="modal">
						{editing ? (
							<Fragment>
								<h2 id="simple-modal-title">Editar Usuário</h2>
								<div id="simple-modal-description">
									<EditUserForm
										editing={editing}
										currentUser={currentUser}
										updateUser={updateUser}
									/>
								</div>
							</Fragment>
						) : (
							<Fragment>
								<h2 id="simple-modal-title">Adicionar Usuário</h2>
								<div id="simple-modal-description">
									<AddUserForm addUser={addUser} />
								</div>
							</Fragment>
						)}	
					</div>
				</Modal>
			</div>
		);
	}
}
export default withStyles(styles)(App);
